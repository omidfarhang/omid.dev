#!/usr/bin/env python3
"""Scan and fix Hugo post tag slugs in front matter."""

from __future__ import annotations

import argparse
import difflib
import re
import sys
from collections import Counter, defaultdict
from dataclasses import dataclass, field
from pathlib import Path

import yaml

DEFAULT_POSTS_DIR = Path("content/posts")
DEFAULT_CONFIG = Path("scripts/tag-fixes.yaml")
DEFAULT_HUGO_CONFIG = Path("hugo.yaml")
FRONT_MATTER_RE = re.compile(r"\A---\n(.*?)\n---(?:\n|\Z)", re.DOTALL)
CURATED_TAG_KEYS = (
    "homeTechTagsProfessional",
    "homeTechTagsTechnical",
    "homeFeaturedTechTagsProfessional",
    "homeFeaturedTechTagsTechnical",
)


@dataclass
class TagFixConfig:
    replacements: dict[str, str] = field(default_factory=dict)
    canonical_groups: list[dict[str, object]] = field(default_factory=list)
    remove: list[str] = field(default_factory=list)

    @classmethod
    def load(cls, path: Path | None) -> TagFixConfig:
        if path is None or not path.is_file():
            return cls()
        data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
        return cls(
            replacements={str(k): str(v) for k, v in (data.get("replacements") or {}).items()},
            canonical_groups=list(data.get("canonical_groups") or []),
            remove=[str(tag) for tag in (data.get("remove") or [])],
        )

    def variant_to_canonical(self) -> dict[str, str]:
        mapping: dict[str, str] = {}
        for group in self.canonical_groups:
            canonical = str(group.get("canonical", "")).strip()
            if not canonical:
                continue
            variants = group.get("variants") or []
            for variant in variants:
                mapping[str(variant)] = canonical
        return mapping

    def normalized_to_canonical(self) -> dict[str, str]:
        """Map Hugo-normalized slugs to canonical tags (case, camelCase, kebab-case, etc.)."""
        mapping: dict[str, str] = {}
        for group in self.canonical_groups:
            canonical = str(group.get("canonical", "")).strip()
            if not canonical:
                continue
            canonical_norm = normalize_slug(canonical)
            mapping[canonical_norm] = canonical
            for variant in group.get("variants") or []:
                mapping[normalize_slug(str(variant))] = canonical
        return mapping

    def normalized_remove_slugs(self) -> set[str]:
        return {normalize_slug(tag) for tag in self.remove if str(tag).strip()}

    def should_remove(self, tag: str) -> bool:
        if not self.remove:
            return False
        return normalize_slug(tag) in self.normalized_remove_slugs()


@dataclass
class CuratedTags:
    tags: set[str] = field(default_factory=set)
    norm_to_tag: dict[str, str] = field(default_factory=dict)

    def is_curated(self, tag: str) -> bool:
        return tag in self.tags

    def curated_for(self, tag: str) -> str | None:
        return self.norm_to_tag.get(normalize_slug(tag))


@dataclass
class ConfigValidationError:
    message: str


@dataclass
class PostTags:
    path: Path
    tags: list[str]
    front_matter: str
    body: str
    tags_start: int
    tags_end: int


def repo_root() -> Path:
    return Path(__file__).resolve().parent.parent


def normalize_slug(tag: str) -> str:
    """Match Hugo tag normalization: lowercase, strip non-alphanumeric."""
    return re.sub(r"[^a-z0-9]", "", str(tag).casefold())


def load_site_params(hugo_path: Path) -> dict[str, object]:
    data = yaml.safe_load(hugo_path.read_text(encoding="utf-8")) or {}
    params = data.get("params") or {}
    if params:
        return params
    for language in (data.get("languages") or {}).values():
        language_params = language.get("params") or {}
        if language_params:
            return language_params
    return {}


def load_curated_tags(hugo_path: Path) -> CuratedTags:
    params = load_site_params(hugo_path)
    tags: set[str] = set()
    for key in CURATED_TAG_KEYS:
        tags.update(str(tag) for tag in (params.get(key) or []))
    norm_to_tag = {normalize_slug(tag): tag for tag in tags}
    return CuratedTags(tags=tags, norm_to_tag=norm_to_tag)


def validate_config(config: TagFixConfig, curated: CuratedTags) -> list[ConfigValidationError]:
    errors: list[ConfigValidationError] = []

    for old, new in config.replacements.items():
        if curated.is_curated(old) and new != old:
            errors.append(
                ConfigValidationError(
                    f"replacement renames curated tag {old!r} to {new!r}"
                )
            )

    norm_owners: dict[str, str] = {}
    for group in config.canonical_groups:
        canonical = str(group.get("canonical", "")).strip()
        variants = [str(variant) for variant in (group.get("variants") or [])]
        if not canonical:
            continue

        for tag in [canonical, *variants]:
            norm = normalize_slug(tag)
            owner = norm_owners.get(norm)
            if owner and owner != canonical:
                errors.append(
                    ConfigValidationError(
                        f"normalized slug {norm!r} maps to both {owner!r} and {canonical!r}"
                    )
                )
            else:
                norm_owners[norm] = canonical

        curated_variants = [variant for variant in variants if curated.is_curated(variant)]
        if curated.is_curated(canonical):
            curated_variants.append(canonical)

        curated_variants = list(dict.fromkeys(curated_variants))
        if not curated_variants:
            continue

        canonical_norm = normalize_slug(canonical)
        expected = curated.curated_for(canonical) or curated.norm_to_tag.get(canonical_norm)
        if expected and canonical != expected:
            errors.append(
                ConfigValidationError(
                    f"canonical group must use curated spelling {expected!r}, not {canonical!r}"
                )
            )

        for variant in curated_variants:
            if normalize_slug(variant) != canonical_norm:
                errors.append(
                    ConfigValidationError(
                        f"canonical group mixes curated tag {variant!r} with unrelated canonical {canonical!r}"
                    )
                )

    for tag in config.remove:
        tag = str(tag).strip()
        if not tag:
            continue
        if curated.is_curated(tag):
            errors.append(
                ConfigValidationError(f"remove list includes curated tag {tag!r}")
            )
            continue
        curated_match = curated.curated_for(tag)
        if curated_match:
            errors.append(
                ConfigValidationError(
                    f"remove list includes tag {tag!r} matching curated tag {curated_match!r}"
                )
            )

    return errors


def pick_group_canonical(
    variants: set[str],
    counts: Counter[str],
    curated: CuratedTags,
    normalized: str,
) -> str:
    if normalized in curated.norm_to_tag:
        return curated.norm_to_tag[normalized]
    ordered = sorted(variants, key=lambda tag: (-counts[tag], tag.casefold()))
    return ordered[0]


def split_front_matter(content: str) -> tuple[str, str]:
    match = FRONT_MATTER_RE.match(content)
    if not match:
        raise ValueError("missing or invalid YAML front matter (expected leading --- block)")
    return match.group(1), content[match.end() :]


def locate_tags_block(front_matter: str) -> tuple[int, int] | None:
    lines = front_matter.split("\n")
    for index, line in enumerate(lines):
        if not line.startswith("tags:"):
            continue
        start = index
        end = index + 1
        while end < len(lines) and lines[end].startswith("  - "):
            end += 1
        return start, end
    return None


def parse_tags_from_front_matter(front_matter: str) -> list[str]:
    data = yaml.safe_load(front_matter) or {}
    tags = data.get("tags")
    if tags is None:
        return []
    if isinstance(tags, str):
        return [tags]
    if isinstance(tags, list):
        return [str(tag) for tag in tags]
    raise ValueError(f"unsupported tags type: {type(tags).__name__}")


def format_tags_block(tags: list[str]) -> str:
    if not tags:
        return "tags: []"
    lines = ["tags:"]
    lines.extend(f"  - {tag}" for tag in tags)
    return "\n".join(lines)


def read_post(path: Path) -> PostTags | None:
    content = path.read_text(encoding="utf-8")
    try:
        front_matter, body = split_front_matter(content)
    except ValueError:
        return None

    span = locate_tags_block(front_matter)
    if span is None:
        return None

    tags = parse_tags_from_front_matter(front_matter)
    return PostTags(
        path=path,
        tags=tags,
        front_matter=front_matter,
        body=body,
        tags_start=span[0],
        tags_end=span[1],
    )


def canonicalize_tag(tag: str, config: TagFixConfig) -> str:
    new_tag = config.replacements.get(tag, tag)
    variant_map = config.variant_to_canonical()
    if new_tag in variant_map:
        return variant_map[new_tag]
    norm_map = config.normalized_to_canonical()
    canonical = norm_map.get(normalize_slug(new_tag))
    if canonical is not None:
        return canonical
    return new_tag


def apply_fixes(tags: list[str], config: TagFixConfig) -> tuple[list[str], list[tuple[str, str]]]:
    changes: list[tuple[str, str]] = []
    mapped_tags: list[str] = []

    for tag in tags:
        new_tag = canonicalize_tag(tag, config)
        if new_tag != tag:
            changes.append((tag, new_tag))
        mapped_tags.append(new_tag)

    deduped: list[str] = []
    seen: set[str] = set()
    for original, mapped_tag in zip(tags, mapped_tags, strict=True):
        if mapped_tag in seen:
            if original == mapped_tag:
                changes.append((original, "(duplicate removed)"))
            continue
        seen.add(mapped_tag)
        deduped.append(mapped_tag)

    filtered: list[str] = []
    for tag in deduped:
        if config.should_remove(tag):
            changes.append((tag, "(removed)"))
            continue
        filtered.append(tag)

    return filtered, changes


def write_post(post: PostTags, tags: list[str], *, dry_run: bool) -> None:
    lines = post.front_matter.split("\n")
    new_block = format_tags_block(tags).split("\n")
    updated_front_matter = "\n".join(
        lines[: post.tags_start] + new_block + lines[post.tags_end :]
    ).rstrip("\n") + "\n"
    updated = f"---\n{updated_front_matter}---\n{post.body}"
    if not dry_run:
        post.path.write_text(updated, encoding="utf-8")


def iter_posts(posts_dir: Path) -> list[Path]:
    if not posts_dir.is_dir():
        raise FileNotFoundError(f"posts directory not found: {posts_dir}")
    return sorted(
        path
        for path in posts_dir.rglob("*.md")
        if not path.name.startswith("_index")
    )


def collect_tag_stats(posts_dir: Path) -> tuple[Counter[str], dict[str, set[str]]]:
    counts: Counter[str] = Counter()
    normalized: dict[str, set[str]] = defaultdict(set)

    for path in iter_posts(posts_dir):
        post = read_post(path)
        if post is None:
            continue
        for tag in post.tags:
            counts[tag] += 1
            normalized[normalize_slug(tag)].add(tag)

    return counts, normalized


def suggest_normalized_groups(
    counts: Counter[str],
    normalized: dict[str, set[str]],
    curated: CuratedTags,
    *,
    min_total: int = 2,
) -> list[dict[str, object]]:
    suggestions: list[dict[str, object]] = []
    for slug, variants in sorted(normalized.items(), key=lambda item: -sum(counts[t] for t in item[1])):
        if len(variants) < 2:
            continue
        total = sum(counts[tag] for tag in variants)
        if total < min_total:
            continue
        canonical = pick_group_canonical(variants, counts, curated, slug)
        ordered = sorted(variants, key=lambda tag: (-counts[tag], tag.casefold()))
        suggestions.append(
            {
                "canonical": canonical,
                "variants": ordered,
                "normalized": slug,
                "total_uses": total,
                "curated": slug in curated.norm_to_tag,
            }
        )
    return suggestions


def suggest_typos(
    counts: Counter[str],
    curated: CuratedTags,
    *,
    min_similarity: float,
    max_rare_count: int,
    min_common_count: int,
) -> list[dict[str, object]]:
    tags = list(counts)
    suggestions: list[dict[str, object]] = []

    for rare in tags:
        if counts[rare] > max_rare_count or curated.is_curated(rare):
            continue
        best_match = None
        best_ratio = 0.0
        for common in tags:
            if rare == common or counts[common] < min_common_count:
                continue
            if normalize_slug(rare) == normalize_slug(common):
                continue
            ratio = difflib.SequenceMatcher(None, rare.casefold(), common.casefold()).ratio()
            if ratio > best_ratio:
                best_ratio = ratio
                best_match = common
        if best_match and best_ratio >= min_similarity:
            target = best_match
            curated_target = curated.curated_for(best_match)
            if curated_target:
                target = curated_target
            suggestions.append(
                {
                    "from": rare,
                    "to": target,
                    "similarity": round(best_ratio, 3),
                    "from_count": counts[rare],
                    "to_count": counts[best_match],
                    "curated": curated_target is not None,
                }
            )

    suggestions.sort(key=lambda item: (-item["similarity"], item["from"]))
    return suggestions


def print_curated_report(
    counts: Counter[str],
    normalized: dict[str, set[str]],
    curated: CuratedTags,
    config: TagFixConfig,
) -> None:
    print(f"Curated homepage tags loaded: {len(curated.tags)} from hugo.yaml")

    errors = validate_config(config, curated)
    if errors:
        print("Config conflicts with curated tags:")
        for error in errors:
            print(f"  ERROR: {error.message}")
    else:
        print("Config check: OK (no curated tag conflicts)")

    near_misses: list[tuple[str, str, int]] = []
    for slug, variants in sorted(normalized.items()):
        if slug not in curated.norm_to_tag:
            continue
        expected = curated.norm_to_tag[slug]
        for variant in sorted(variants):
            if variant != expected:
                near_misses.append((variant, expected, counts[variant]))

    if near_misses:
        print("Curated tag spelling mismatches in posts:")
        for variant, expected, count in near_misses:
            print(f"  {variant!r} -> {expected!r}  ({count} post(s))")
    else:
        print("Curated tag spellings: all post tags match hugo.yaml exactly")
    print()


def print_scan_report(
    posts_dir: Path,
    config: TagFixConfig,
    curated: CuratedTags,
    *,
    min_similarity: float,
    max_rare_count: int,
    min_common_count: int,
    min_group_total: int,
) -> int:
    counts, normalized = collect_tag_stats(posts_dir)
    print(f"Scanned {sum(counts.values())} tag uses across {len(counts)} unique tags.\n")

    print_curated_report(counts, normalized, curated, config)

    configured_changes = preview_config_changes(posts_dir, config)
    if configured_changes:
        print("Configured fixes (from tag-fixes.yaml):")
        for path, changes in configured_changes:
            rel = path.relative_to(repo_root())
            print(f"  {rel}")
            for old, new in changes:
                print(f"    {old!r} -> {new!r}")
        print()
    elif config.replacements or config.canonical_groups or config.remove:
        print("Configured fixes: none would change any post.\n")
    else:
        print("No tag-fixes.yaml loaded (or file is empty).\n")

    groups = suggest_normalized_groups(
        counts, normalized, curated, min_total=min_group_total
    )
    if groups:
        print("Suggested canonical_groups (same slug after Hugo normalization):")
        for group in groups[:40]:
            canonical = group["canonical"]
            variants = group["variants"]
            total = group["total_uses"]
            curated_note = " [curated]" if group["curated"] else ""
            variant_parts = ", ".join(f"{tag!r} ({counts[tag]})" for tag in variants)
            print(f"  canonical: {canonical!r}{curated_note}  # total {total}: {variant_parts}")
        if len(groups) > 40:
            print(f"  ... and {len(groups) - 40} more groups")
        print()

    typos = suggest_typos(
        counts,
        curated,
        min_similarity=min_similarity,
        max_rare_count=max_rare_count,
        min_common_count=min_common_count,
    )
    if typos:
        print("Suggested replacements (likely typos / near-duplicates):")
        for item in typos[:40]:
            curated_note = " [curated target]" if item["curated"] else ""
            print(
                f"  {item['from']!r} -> {item['to']!r}{curated_note}  "
                f"(similarity {item['similarity']}, counts {item['from_count']} vs {item['to_count']})"
            )
        if len(typos) > 40:
            print(f"  ... and {len(typos) - 40} more suggestions")
        print()

    print("Copy suggestions into scripts/tag-fixes.yaml, then run:")
    print("  python3 scripts/fix-post-tags.py apply --dry-run")
    print("  python3 scripts/fix-post-tags.py apply")
    return 0


def preview_config_changes(
    posts_dir: Path,
    config: TagFixConfig,
) -> list[tuple[Path, list[tuple[str, str]]]]:
    changes_by_post: list[tuple[Path, list[tuple[str, str]]]] = []
    for path in iter_posts(posts_dir):
        post = read_post(path)
        if post is None:
            continue
        new_tags, changes = apply_fixes(post.tags, config)
        if new_tags != post.tags:
            changes_by_post.append((path, changes))
    return changes_by_post


def apply_config(
    posts_dir: Path,
    config: TagFixConfig,
    *,
    dry_run: bool,
) -> int:
    updated_count = 0
    exit_code = 0

    for path in iter_posts(posts_dir):
        post = read_post(path)
        if post is None:
            continue

        new_tags, changes = apply_fixes(post.tags, config)
        if new_tags == post.tags:
            continue

        updated_count += 1
        rel = path.relative_to(repo_root())
        prefix = "would update" if dry_run else "updated"
        print(f"{prefix}: {rel}")
        for old, new in changes:
            print(f"  {old!r} -> {new!r}")

        try:
            write_post(post, new_tags, dry_run=dry_run)
        except OSError as error:
            print(f"error: {path}: {error}", file=sys.stderr)
            exit_code = 1

    if updated_count == 0:
        print("No posts needed tag changes.")
    else:
        action = "Would update" if dry_run else "Updated"
        print(f"\n{action} {updated_count} post(s).")
    return exit_code


def resolve_path(path: Path, root: Path) -> Path:
    return path if path.is_absolute() else (root / path).resolve()


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Scan and fix tag slugs in Hugo post front matter.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=(
            "Examples:\n"
            "  fix-post-tags.py scan\n"
            "  fix-post-tags.py scan --config scripts/tag-fixes.yaml\n"
            "  fix-post-tags.py apply --dry-run\n"
            "  fix-post-tags.py apply --config scripts/tag-fixes.yaml\n"
        ),
    )
    parser.add_argument(
        "command",
        choices=("scan", "apply"),
        help="scan for suggestions, or apply fixes from config",
    )
    parser.add_argument(
        "--config",
        "-c",
        type=Path,
        default=None,
        help=f"YAML config with replacements, canonical_groups, and remove (default: {DEFAULT_CONFIG})",
    )
    parser.add_argument(
        "--hugo-config",
        type=Path,
        default=None,
        help=f"Hugo config for curated homepage tags (default: <repo>/{DEFAULT_HUGO_CONFIG})",
    )
    parser.add_argument(
        "--posts-dir",
        type=Path,
        default=None,
        help=f"posts directory to process (default: <repo>/{DEFAULT_POSTS_DIR})",
    )
    parser.add_argument(
        "--dry-run",
        "-n",
        action="store_true",
        help="for apply: show changes without writing files",
    )
    parser.add_argument(
        "--min-similarity",
        type=float,
        default=0.88,
        help="scan: minimum string similarity for typo suggestions (default: 0.88)",
    )
    parser.add_argument(
        "--max-rare-count",
        type=int,
        default=5,
        help="scan: only suggest fixes for tags used at most this many times (default: 5)",
    )
    parser.add_argument(
        "--min-common-count",
        type=int,
        default=10,
        help="scan: typo suggestions must match a tag used at least this many times (default: 10)",
    )
    parser.add_argument(
        "--min-group-total",
        type=int,
        default=2,
        help="scan: minimum combined uses for normalized duplicate groups (default: 2)",
    )
    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    root = repo_root()
    posts_dir = resolve_path(args.posts_dir or DEFAULT_POSTS_DIR, root)
    config_path = resolve_path(args.config, root) if args.config else resolve_path(DEFAULT_CONFIG, root)
    hugo_path = resolve_path(args.hugo_config or DEFAULT_HUGO_CONFIG, root)
    config = TagFixConfig.load(config_path if config_path.is_file() else None)
    curated = load_curated_tags(hugo_path) if hugo_path.is_file() else CuratedTags()

    if args.command == "apply" and not config.replacements and not config.canonical_groups and not config.remove:
        print(
            f"No fixes configured. Create {DEFAULT_CONFIG} (see tag-fixes.example.yaml) "
            "or pass --config.",
            file=sys.stderr,
        )
        return 1

    config_errors = validate_config(config, curated)
    if config_errors and args.command == "apply":
        print("Refusing to apply: config conflicts with curated homepage tags.", file=sys.stderr)
        for error in config_errors:
            print(f"  {error.message}", file=sys.stderr)
        return 1

    try:
        if args.command == "scan":
            return print_scan_report(
                posts_dir,
                config,
                curated,
                min_similarity=args.min_similarity,
                max_rare_count=args.max_rare_count,
                min_common_count=args.min_common_count,
                min_group_total=args.min_group_total,
            )
        return apply_config(posts_dir, config, dry_run=args.dry_run)
    except FileNotFoundError as error:
        print(error, file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
