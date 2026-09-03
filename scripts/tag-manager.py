#!/usr/bin/env python3
"""Manage post tags: count clusters, list curated names, remove, replace, merge, dedupe.

Language variants (.en / .fa / .de) of the same slug count as one post.
Writes inspect by default; pass --apply to change files.
"""

from __future__ import annotations

import argparse
import re
import sys
from collections import defaultdict
from dataclasses import dataclass
from pathlib import Path

DEFAULT_POSTS_DIR = Path("content/posts")
DEFAULT_HUGO_YAML = Path("hugo.yaml")
CLUSTER_MIN = 3
LANG_STEM_RE = re.compile(r"\.(en|fa|de)$")
FRONT_MATTER_RE = re.compile(r"\A---\n(.*?)\n---(?:\n|\Z)", re.DOTALL)
TAGS_KEY_RE = re.compile(r"^tags:\s*(\[\s*\]\s*)?$")
TAG_ITEM_RE = re.compile(r"^([ \t]*)-[ \t]+(.*)$")
QUOTE_TAG_RE = re.compile(r"""[\n:#{}[\]]|^[-?|@*!%`'" ]| $""")
CURATED_KEYS = (
    "homeTechTagsProfessional",
    "homeTechTagsTechnical",
    "homeFeaturedTechTagsProfessional",
    "homeFeaturedTechTagsTechnical",
)
COMMANDS = ("count", "remove", "replace", "merge", "dedupe", "untagged")


@dataclass(frozen=True)
class TagsBlock:
    tags: list[str]
    start: int
    end: int
    item_indent: str


def repo_root() -> Path:
    return Path(__file__).resolve().parent.parent


def unquote_yaml_scalar(value: str) -> str:
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in {'"', "'"}:
        return value[1:-1]
    return value


def format_tag_value(tag: str) -> str:
    if not tag or QUOTE_TAG_RE.search(tag) or tag.lower() in {
        "true", "false", "null", "yes", "no", "on", "off",
    }:
        if "'" not in tag:
            return f"'{tag}'"
        escaped = tag.replace("\\", "\\\\").replace('"', '\\"')
        return f'"{escaped}"'
    return tag


def unique_post_key(path: Path) -> str:
    return LANG_STEM_RE.sub("", path.stem)


def split_front_matter(content: str) -> tuple[str, str]:
    match = FRONT_MATTER_RE.match(content)
    if not match:
        raise ValueError("missing or invalid YAML front matter (expected leading --- block)")
    return match.group(1), content[match.end() :]


def iter_posts(posts_dir: Path) -> list[Path]:
    if not posts_dir.is_dir():
        raise FileNotFoundError(f"posts directory not found: {posts_dir}")
    return sorted(
        path for path in posts_dir.rglob("*.md") if not path.name.startswith("_")
    )


def parse_tags_block(front_matter: str) -> TagsBlock | None:
    lines = front_matter.splitlines(keepends=True)
    offset = 0
    for index, line in enumerate(lines):
        if TAGS_KEY_RE.match(line.strip()):
            start = offset
            end = offset + len(line)
            tags: list[str] = []
            item_indent = "  "
            if "[]" in line:
                return TagsBlock(tags=[], start=start, end=end, item_indent=item_indent)
            for nxt in lines[index + 1 :]:
                item = TAG_ITEM_RE.match(nxt.rstrip("\n"))
                if not item:
                    break
                item_indent = item.group(1) or "  "
                tag = unquote_yaml_scalar(item.group(2))
                if tag:
                    tags.append(tag)
                end += len(nxt)
            return TagsBlock(tags=tags, start=start, end=end, item_indent=item_indent)
        offset += len(line)
    return None


def format_tags_block(tags: list[str], item_indent: str) -> str:
    if not tags:
        return "tags: []\n"
    lines = ["tags:\n"]
    lines.extend(f"{item_indent}- {format_tag_value(tag)}\n" for tag in tags)
    return "".join(lines)


def replace_tags_block(front_matter: str, block: TagsBlock | None, tags: list[str]) -> str:
    indent = block.item_indent if block else "  "
    formatted = format_tags_block(tags, indent)
    if block is None:
        fm = front_matter if front_matter.endswith("\n") else front_matter + "\n"
        return fm + formatted
    return front_matter[: block.start] + formatted + front_matter[block.end :]


def load_curated_tags(hugo_yaml: Path) -> dict[str, list[str]]:
    if not hugo_yaml.is_file():
        raise FileNotFoundError(f"hugo.yaml not found: {hugo_yaml}")

    wanted = set(CURATED_KEYS)
    lists: dict[str, list[str]] = {key: [] for key in CURATED_KEYS}
    current: str | None = None

    for raw in hugo_yaml.read_text(encoding="utf-8").splitlines():
        stripped = raw.strip()
        if current and stripped.startswith("- "):
            lists[current].append(unquote_yaml_scalar(stripped[2:]))
            continue
        if stripped.endswith(":") and stripped[:-1] in wanted:
            current = stripped[:-1]
            continue
        if stripped.endswith(":") or (stripped and not stripped.startswith("-")):
            current = None

    return lists


def curated_set(lists: dict[str, list[str]]) -> set[str]:
    names: set[str] = set()
    for key in ("homeTechTagsProfessional", "homeTechTagsTechnical"):
        names.update(lists[key])
    return names


def collect_tag_posts(posts_dir: Path) -> dict[str, set[str]]:
    posts: dict[str, set[str]] = defaultdict(set)
    for path in iter_posts(posts_dir):
        try:
            front_matter, _ = split_front_matter(path.read_text(encoding="utf-8"))
        except ValueError:
            continue
        block = parse_tags_block(front_matter)
        if not block:
            continue
        key = unique_post_key(path)
        for tag in block.tags:
            posts[tag].add(key)
    return posts


def print_counts(
    posts: dict[str, set[str]],
    *,
    names: list[str] | None,
    minimum: int,
    curated: set[str],
) -> None:
    if names:
        rows = [(name, len(posts.get(name, set()))) for name in names]
    else:
        rows = sorted(
            ((tag, len(slugs)) for tag, slugs in posts.items() if len(slugs) >= minimum),
            key=lambda item: (-item[1], item[0].lower()),
        )

    for tag, count in rows:
        marker = "  curated" if tag in curated else ""
        print(f"{count:4d}  {tag}{marker}")


def print_curated(lists: dict[str, list[str]]) -> None:
    for key in CURATED_KEYS:
        print(f"{key}:")
        for name in lists[key]:
            print(f"  - {name}")
        print()


def relpath(path: Path, root: Path) -> Path:
    return path.relative_to(root) if path.is_relative_to(root) else path


def format_tag_list(tags: list[str]) -> str:
    return ", ".join(tags) if tags else "(none)"


def dedupe_tags(tags: list[str]) -> list[str]:
    seen: set[str] = set()
    result: list[str] = []
    for tag in tags:
        if tag in seen:
            continue
        seen.add(tag)
        result.append(tag)
    return result


def remove_tags(tags: list[str], drop: set[str]) -> list[str]:
    return [tag for tag in tags if tag not in drop]


def merge_tags(tags: list[str], sources: set[str], target: str) -> list[str]:
    if not any(tag in sources for tag in tags):
        return tags
    keep_target_spot = target in tags
    result: list[str] = []
    inserted = False
    for tag in tags:
        if tag in sources:
            if not inserted and not keep_target_spot:
                result.append(target)
                inserted = True
            continue
        if tag == target:
            if not inserted:
                result.append(target)
                inserted = True
            continue
        if tag not in result:
            result.append(tag)
    if not inserted:
        result.append(target)
    return result


def write_front_matter(path: Path, front_matter: str, body: str) -> None:
    if not front_matter.endswith("\n"):
        front_matter += "\n"
    path.write_text(f"---\n{front_matter}---\n{body}", encoding="utf-8")


def transform_posts(
    posts_dir: Path,
    root: Path,
    transform,
    *,
    apply: bool,
    limit: int | None,
    skip_empty: bool,
) -> int:
    changed = 0
    considered = 0
    for path in iter_posts(posts_dir):
        try:
            content = path.read_text(encoding="utf-8")
            front_matter, body = split_front_matter(content)
        except ValueError as error:
            print(f"skip: {relpath(path, root)}: {error}", file=sys.stderr)
            continue

        block = parse_tags_block(front_matter)
        old = block.tags if block else []
        if skip_empty and not old:
            continue

        new = transform(old)
        if new == old:
            continue

        considered += 1
        if limit is not None and changed >= limit:
            continue

        prefix = "update" if apply else "would update"
        print(f"{prefix}: {relpath(path, root)}")
        print(f"  - {format_tag_list(old)}")
        print(f"  + {format_tag_list(new)}")
        changed += 1

        if apply:
            write_front_matter(
                path,
                replace_tags_block(front_matter, block, new),
                body,
            )

    if limit is not None and considered > changed:
        print(f"\n{considered - changed} more file(s) match; raise --limit or omit it.")

    if changed == 0:
        print("No posts to update.")
        return 0

    if apply:
        print(f"\nDone. Wrote {changed} file(s).")
    else:
        print(f"\n{changed} file(s) would change. Re-run with --apply to write.")
    return 0


def cmd_count(args: argparse.Namespace, posts_dir: Path, hugo_yaml: Path) -> int:
    if args.curated:
        print_curated(load_curated_tags(hugo_yaml))
        return 0

    minimum = 1 if args.all else args.min
    posts = collect_tag_posts(posts_dir)
    curated = curated_set(load_curated_tags(hugo_yaml)) if hugo_yaml.is_file() else set()
    print_counts(posts, names=args.tags or None, minimum=minimum, curated=curated)
    return 0


def cmd_untagged(args: argparse.Namespace, posts_dir: Path, root: Path) -> int:
    paths: list[Path] = []
    for path in iter_posts(posts_dir):
        try:
            front_matter, _ = split_front_matter(path.read_text(encoding="utf-8"))
        except ValueError:
            paths.append(path)
            continue
        block = parse_tags_block(front_matter)
        if block is None or not block.tags:
            paths.append(path)

    shown = paths if args.limit is None else paths[: max(0, args.limit)]
    for path in shown:
        print(relpath(path, root))

    if args.limit is not None and len(paths) > len(shown):
        print(f"\n{len(shown)} shown of {len(paths)} post(s) without tags.")
    else:
        print(f"\n{len(paths)} post(s) without tags.")
    return 0


VALUE_FLAGS = {"--posts-dir", "--hugo-yaml", "--min", "--limit", "--into"}


def add_shared_paths(parser: argparse.ArgumentParser) -> None:
    parser.add_argument(
        "--posts-dir",
        type=Path,
        default=None,
        help=f"posts directory (default: <repo>/{DEFAULT_POSTS_DIR})",
    )
    parser.add_argument(
        "--hugo-yaml",
        type=Path,
        default=None,
        help=f"Hugo config (default: <repo>/{DEFAULT_HUGO_YAML})",
    )


def add_write_flags(parser: argparse.ArgumentParser) -> None:
    parser.add_argument(
        "--apply",
        "-a",
        action="store_true",
        help="write front-matter changes (default: print only)",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=None,
        metavar="N",
        help="change at most N files",
    )


def build_parser() -> argparse.ArgumentParser:
    shared = argparse.ArgumentParser(add_help=False)
    add_shared_paths(shared)

    parser = argparse.ArgumentParser(
        description=(
            "Count and edit post tags. Default command is count. "
            "Mutations print a plan unless you pass --apply."
        ),
        epilog=(
            "examples:\n"
            "  tag-manager.py\n"
            "  tag-manager.py count --curated\n"
            "  tag-manager.py count --min 1\n"
            "  tag-manager.py count 'Exact Tag'\n"
            "  tag-manager.py untagged\n"
            "  tag-manager.py dedupe\n"
            "  tag-manager.py remove 'Exact Tag'\n"
            "  tag-manager.py replace 'Old Tag' 'New Tag'\n"
            "  tag-manager.py merge 'Tag A' 'Tag B' --into 'Tag C'\n"
            "  tag-manager.py merge 'Tag A' --into 'Tag C' --apply\n"
        ),
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )

    sub = parser.add_subparsers(dest="command")

    count_p = sub.add_parser(
        "count",
        parents=[shared],
        help="list tag counts and curated homepage tags",
    )
    count_p.add_argument(
        "tags",
        nargs="*",
        help="exact front-matter tag names to count (default: every tag at --min)",
    )
    count_p.add_argument(
        "--min",
        type=int,
        default=CLUSTER_MIN,
        metavar="N",
        help=f"minimum unique posts when listing all tags (default: {CLUSTER_MIN})",
    )
    count_p.add_argument(
        "--all",
        action="store_true",
        help="list every tag (same as --min 1)",
    )
    count_p.add_argument(
        "--curated",
        action="store_true",
        help="print homepage curated tag lists from hugo.yaml and exit",
    )

    remove_p = sub.add_parser(
        "remove",
        parents=[shared],
        help="remove tags from every post that has them",
    )
    remove_p.add_argument("tags", nargs="+", help="exact tag names to delete")
    add_write_flags(remove_p)

    replace_p = sub.add_parser(
        "replace",
        parents=[shared],
        help="rename one tag across all posts",
    )
    replace_p.add_argument("old", help="existing tag")
    replace_p.add_argument("new", help="replacement tag")
    add_write_flags(replace_p)

    merge_p = sub.add_parser(
        "merge",
        parents=[shared],
        help="fold one or more tags into a single tag",
    )
    merge_p.add_argument("sources", nargs="+", help="tags to absorb")
    merge_p.add_argument("--into", required=True, help="surviving tag")
    add_write_flags(merge_p)

    dedupe_p = sub.add_parser(
        "dedupe",
        parents=[shared],
        help="drop duplicate tags within a post",
    )
    add_write_flags(dedupe_p)

    untagged_p = sub.add_parser(
        "untagged",
        parents=[shared],
        help="list posts with no tags",
    )
    untagged_p.add_argument(
        "--limit",
        type=int,
        default=None,
        metavar="N",
        help="print at most N paths",
    )

    return parser


def normalize_argv(argv: list[str]) -> list[str]:
    if argv and argv[0] in ("-h", "--help"):
        return argv
    if not argv:
        return ["count"]

    skip_next = False
    command_at: int | None = None
    for index, arg in enumerate(argv):
        if skip_next:
            skip_next = False
            continue
        if arg in VALUE_FLAGS or any(arg.startswith(f"{flag}=") for flag in VALUE_FLAGS):
            skip_next = arg in VALUE_FLAGS
            continue
        if arg.startswith("-"):
            continue
        command_at = index
        break

    if command_at is None:
        return ["count", *argv]
    if argv[command_at] in COMMANDS:
        command = argv[command_at]
        rest = argv[:command_at] + argv[command_at + 1 :]
        return [command, *rest]
    return ["count", *argv]


def main(argv: list[str] | None = None) -> int:
    raw = list(sys.argv[1:] if argv is None else argv)
    parser = build_parser()
    args = parser.parse_args(normalize_argv(raw))

    root = repo_root()
    posts_dir = args.posts_dir or (root / DEFAULT_POSTS_DIR)
    hugo_yaml = args.hugo_yaml or (root / DEFAULT_HUGO_YAML)
    command = args.command or "count"

    try:
        if command == "count":
            return cmd_count(args, posts_dir, hugo_yaml)
        if command == "untagged":
            return cmd_untagged(args, posts_dir, root)
        if command == "remove":
            drop = set(args.tags)
            return transform_posts(
                posts_dir,
                root,
                lambda tags: remove_tags(tags, drop),
                apply=args.apply,
                limit=args.limit,
                skip_empty=True,
            )
        if command == "replace":
            if args.old == args.new:
                print("old and new tags are the same; nothing to do.")
                return 0
            sources = {args.old}
            return transform_posts(
                posts_dir,
                root,
                lambda tags: merge_tags(tags, sources, args.new),
                apply=args.apply,
                limit=args.limit,
                skip_empty=True,
            )
        if command == "merge":
            sources = set(args.sources)
            sources.discard(args.into)
            if not sources:
                print("no source tags left after dropping --into; nothing to do.")
                return 0
            return transform_posts(
                posts_dir,
                root,
                lambda tags: merge_tags(tags, sources, args.into),
                apply=args.apply,
                limit=args.limit,
                skip_empty=True,
            )
        if command == "dedupe":
            return transform_posts(
                posts_dir,
                root,
                dedupe_tags,
                apply=args.apply,
                limit=args.limit,
                skip_empty=True,
            )
    except FileNotFoundError as error:
        print(error, file=sys.stderr)
        return 1

    parser.print_help()
    return 1


if __name__ == "__main__":
    sys.exit(main())
