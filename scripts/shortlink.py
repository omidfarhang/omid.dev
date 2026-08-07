#!/usr/bin/env python3
"""Find blog posts missing a shortlink and create one via YOURLS (g.omid.dev)."""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from pathlib import Path

DEFAULT_POSTS_DIR = Path("content/posts")
DEFAULT_SITE_URL = "https://omid.dev"
DEFAULT_API_URL = "https://g.omid.dev/yourls-api.php"
LANG_SUFFIX_RE = re.compile(r"\.(en|fa|de)\.md$")
FRONT_MATTER_RE = re.compile(r"\A---\n(.*?)\n---(?:\n|\Z)", re.DOTALL)
SHORTLINK_LINE_RE = re.compile(r"^shortlink\s*:.*$", re.MULTILINE)
URL_LINE_RE = re.compile(r"^url\s*:\s*(.+)$", re.MULTILINE)
TITLE_LINE_RE = re.compile(r"^title\s*:\s*(.+)$", re.MULTILINE)
DRAFT_LINE_RE = re.compile(r"^draft\s*:\s*true\s*$", re.MULTILINE | re.IGNORECASE)


@dataclass(frozen=True)
class PostMeta:
    path: Path
    lang: str
    url: str
    title: str
    is_draft: bool

    @property
    def long_url(self) -> str:
        site = os.environ.get("YOURLS_SITE_URL", DEFAULT_SITE_URL).rstrip("/")
        path = self.url.strip("/")
        if self.lang == "en":
            return f"{site}/{path}/"
        return f"{site}/{self.lang}/{path}/"


@dataclass(frozen=True)
class YourlsConfig:
    api_url: str
    signature: str | None = None
    username: str | None = None
    password: str | None = None

    def auth_fields(self) -> dict[str, str]:
        if self.signature:
            return {"signature": self.signature}
        if self.username and self.password:
            return {"username": self.username, "password": self.password}
        raise ValueError(
            "YOURLS credentials missing. Set YOURLS_SIGNATURE, or "
            "YOURLS_USERNAME and YOURLS_PASSWORD."
        )


def repo_root() -> Path:
    return Path(__file__).resolve().parent.parent


def split_front_matter(content: str) -> tuple[str, str]:
    match = FRONT_MATTER_RE.match(content)
    if not match:
        raise ValueError("missing or invalid YAML front matter (expected leading --- block)")
    return match.group(1), content[match.end() :]


def unquote_yaml_scalar(value: str) -> str:
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in {'"', "'"}:
        return value[1:-1]
    return value


def parse_post(path: Path) -> PostMeta:
    match = LANG_SUFFIX_RE.search(path.name)
    if not match:
        raise ValueError("filename must end with .en.md, .fa.md, or .de.md")

    content = path.read_text(encoding="utf-8")
    front_matter, _ = split_front_matter(content)

    url_match = URL_LINE_RE.search(front_matter)
    if not url_match:
        raise ValueError("front matter missing url:")

    title_match = TITLE_LINE_RE.search(front_matter)
    title = unquote_yaml_scalar(title_match.group(1)) if title_match else path.stem

    return PostMeta(
        path=path,
        lang=match.group(1),
        url=unquote_yaml_scalar(url_match.group(1)),
        title=title,
        is_draft=bool(DRAFT_LINE_RE.search(front_matter)),
    )


def has_shortlink(front_matter: str) -> bool:
    return SHORTLINK_LINE_RE.search(front_matter) is not None


def _is_url_key_line(line: str) -> bool:
    return bool(re.match(r"^url\s*:", line))


def _is_shortlink_key_line(line: str) -> bool:
    return bool(re.match(r"^shortlink\s*:", line))


def place_shortlink_after_url(front_matter: str, shortlink: str) -> str:
    """Ensure `shortlink:` sits on the line immediately after `url:`."""
    lines = [line for line in front_matter.split("\n") if not _is_shortlink_key_line(line)]
    shortlink_line = f"shortlink: {shortlink}"

    for index, line in enumerate(lines):
        if _is_url_key_line(line):
            lines.insert(index + 1, shortlink_line)
            return "\n".join(lines).rstrip("\n") + "\n"

    lines.append(shortlink_line)
    return "\n".join(lines).rstrip("\n") + "\n"


def apply_shortlink(front_matter: str, shortlink: str, *, force: bool) -> tuple[str, str]:
    if has_shortlink(front_matter):
        if not force:
            return front_matter, "skip"
        return place_shortlink_after_url(front_matter, shortlink), "replace"
    return place_shortlink_after_url(front_matter, shortlink), "add"


def is_post_file(path: Path) -> bool:
    if path.suffix != ".md" or path.name.startswith("_index"):
        return False
    if "paths" in path.parts:
        return False
    return LANG_SUFFIX_RE.search(path.name) is not None


def find_posts_missing_shortlink(posts_dir: Path, *, include_drafts: bool) -> list[PostMeta]:
    if not posts_dir.is_dir():
        raise FileNotFoundError(f"posts directory not found: {posts_dir}")

    missing: list[PostMeta] = []
    for path in sorted(posts_dir.rglob("*.md")):
        if not is_post_file(path):
            continue
        try:
            meta = parse_post(path)
            content = path.read_text(encoding="utf-8")
            front_matter, _ = split_front_matter(content)
        except ValueError:
            continue
        if meta.is_draft and not include_drafts:
            continue
        if not has_shortlink(front_matter):
            missing.append(meta)
    return missing


def load_yourls_config(api_url: str) -> YourlsConfig:
    return YourlsConfig(
        api_url=api_url,
        signature=os.environ.get("YOURLS_SIGNATURE") or None,
        username=os.environ.get("YOURLS_USERNAME") or None,
        password=os.environ.get("YOURLS_PASSWORD") or None,
    )


def create_shorturl(config: YourlsConfig, long_url: str, title: str) -> str:
    payload = {
        "action": "shorturl",
        "format": "json",
        "url": long_url,
        "title": title,
        **config.auth_fields(),
    }
    data = urllib.parse.urlencode(payload).encode("utf-8")
    request = urllib.request.Request(
        config.api_url,
        data=data,
        method="POST",
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )

    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            body = response.read().decode("utf-8")
    except urllib.error.HTTPError as error:
        detail = error.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"YOURLS HTTP {error.code}: {detail or error.reason}") from error
    except urllib.error.URLError as error:
        raise RuntimeError(f"YOURLS request failed: {error.reason}") from error

    try:
        parsed = json.loads(body)
    except json.JSONDecodeError as error:
        raise RuntimeError(f"YOURLS returned non-JSON: {body[:200]}") from error

    shorturl = parsed.get("shorturl")
    status = parsed.get("status")
    code = parsed.get("code")
    message = parsed.get("message") or parsed.get("errorCode") or body

    # New short URL, or existing URL already in YOURLS (still returns shorturl).
    if shorturl and (status == "success" or code in {"error:url", "error:keyword"}):
        return str(shorturl).rstrip("/")

    raise RuntimeError(f"YOURLS create failed ({code or status}): {message}")


def write_shortlink(path: Path, shortlink: str, *, force: bool, dry_run: bool) -> str:
    content = path.read_text(encoding="utf-8")
    front_matter, body = split_front_matter(content)
    updated_front_matter, action = apply_shortlink(front_matter, shortlink, force=force)
    if action == "skip":
        return "skip"

    if not dry_run:
        path.write_text(f"---\n{updated_front_matter}---\n{body}", encoding="utf-8")
    return action


def resolve_path(path: Path, root: Path) -> Path:
    return path if path.is_absolute() else (root / path).resolve()


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description=(
            "List blog posts missing a shortlink, or create one via YOURLS "
            "and write it into front matter."
        ),
        epilog=(
            "Auth (env):\n"
            "  YOURLS_SIGNATURE              passwordless API token (preferred)\n"
            "  YOURLS_USERNAME / YOURLS_PASSWORD\n"
            "  YOURLS_API_URL                override API endpoint\n"
            "  YOURLS_SITE_URL               override long-URL site (default https://omid.dev)\n"
            "\n"
            "Examples:\n"
            "  shortlink.py\n"
            "  shortlink.py --missing\n"
            "  shortlink.py --apply --missing --limit 10\n"
            "  shortlink.py --apply content/posts/techblog/2010/2010-12-15-….en.md\n"
            "  shortlink.py --apply --missing --dry-run\n"
        ),
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "files",
        nargs="*",
        help="post markdown file(s) to process",
    )
    parser.add_argument(
        "--missing",
        "-m",
        action="store_true",
        help="select every post under --posts-dir that lacks shortlink",
    )
    parser.add_argument(
        "--apply",
        "-a",
        action="store_true",
        help="create shortlinks via YOURLS and write them into front matter",
    )
    parser.add_argument(
        "--posts-dir",
        type=Path,
        default=None,
        help=f"posts directory for --missing (default: <repo>/{DEFAULT_POSTS_DIR})",
    )
    parser.add_argument(
        "--api-url",
        default=os.environ.get("YOURLS_API_URL", DEFAULT_API_URL),
        help=f"YOURLS API endpoint (default: {DEFAULT_API_URL})",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=None,
        help="process at most N posts",
    )
    parser.add_argument(
        "--include-drafts",
        action="store_true",
        help="include posts with draft: true",
    )
    parser.add_argument(
        "--force",
        "-f",
        action="store_true",
        help="replace an existing shortlink instead of skipping",
    )
    parser.add_argument(
        "--dry-run",
        "-n",
        action="store_true",
        help="print actions without calling YOURLS or writing files",
    )
    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    root = repo_root()
    posts_dir = args.posts_dir or (root / DEFAULT_POSTS_DIR)

    targets: list[PostMeta] = []

    scan_missing = args.missing or not args.files
    if scan_missing:
        try:
            targets.extend(
                find_posts_missing_shortlink(
                    posts_dir,
                    include_drafts=args.include_drafts,
                )
            )
        except FileNotFoundError as error:
            print(error, file=sys.stderr)
            return 1

    for file_arg in args.files:
        path = resolve_path(Path(file_arg), root)
        try:
            meta = parse_post(path)
        except ValueError as error:
            print(f"skip: {path}: {error}", file=sys.stderr)
            return 1
        if meta.is_draft and not args.include_drafts:
            print(f"skip: {path} (draft; pass --include-drafts)")
            continue
        content = path.read_text(encoding="utf-8")
        front_matter, _ = split_front_matter(content)
        if has_shortlink(front_matter) and not args.force:
            if args.apply:
                print(f"skip: {path} (shortlink already set; use --force to replace)")
            continue
        targets.append(meta)

    if args.limit is not None:
        targets = targets[: max(0, args.limit)]

    if not targets:
        print("No posts missing a shortlink.")
        return 0

    if not args.apply:
        for meta in targets:
            rel = meta.path.relative_to(root) if meta.path.is_relative_to(root) else meta.path
            print(f"{rel}\t{meta.long_url}")
        print(
            f"\n{len(targets)} post(s) missing shortlink. "
            "Re-run with --apply to create them."
        )
        return 0

    if args.dry_run:
        for meta in targets:
            rel = meta.path.relative_to(root) if meta.path.is_relative_to(root) else meta.path
            print(f"would create: {rel} -> {meta.long_url}")
        print(f"\n{len(targets)} post(s); dry-run (no YOURLS calls, no writes).")
        return 0

    try:
        config = load_yourls_config(args.api_url)
        config.auth_fields()
    except ValueError as error:
        print(error, file=sys.stderr)
        return 1

    exit_code = 0
    seen: set[Path] = set()
    created = 0

    for meta in targets:
        if meta.path in seen:
            continue
        seen.add(meta.path)

        if not meta.path.is_file():
            print(f"skip: file not found: {meta.path}", file=sys.stderr)
            exit_code = 1
            continue

        try:
            shortlink = create_shorturl(config, meta.long_url, meta.title)
            action = write_shortlink(
                meta.path,
                shortlink,
                force=args.force,
                dry_run=False,
            )
        except (ValueError, RuntimeError) as error:
            print(f"error: {meta.path}: {error}", file=sys.stderr)
            exit_code = 1
            continue

        if action == "skip":
            print(f"skip: {meta.path} (shortlink already set; use --force to replace)")
            continue

        created += 1
        rel = meta.path.relative_to(root) if meta.path.is_relative_to(root) else meta.path
        print(f"{action}: {rel} -> {shortlink}")

    print(f"\nDone. Wrote {created} shortlink(s).")
    return exit_code


if __name__ == "__main__":
    sys.exit(main())
