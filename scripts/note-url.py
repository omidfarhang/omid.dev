#!/usr/bin/env python3
"""Generate and assign stable numeric note URLs for Hugo front matter."""

from __future__ import annotations

import argparse
import random
import re
import sys
import time
from pathlib import Path

URL_PREFIX = "notes/"
DEFAULT_NOTES_DIR = Path("content/notes")
FRONT_MATTER_RE = re.compile(r"\A---\n(.*?)\n---(?:\n|\Z)", re.DOTALL)
URL_LINE_RE = re.compile(r"^url\s*:.*$", re.MULTILINE)


def repo_root() -> Path:
    return Path(__file__).resolve().parent.parent


def generate_note_id() -> str:
    """18-digit Mastodon-style ID: unix ms (13) + random suffix (5)."""
    ms = int(time.time() * 1000)
    suffix = random.randint(0, 99_999)
    return f"{ms}{suffix:05d}"


def format_url(note_id: str) -> str:
    return f"{URL_PREFIX}{note_id}/"


def split_front_matter(content: str) -> tuple[str, str]:
    match = FRONT_MATTER_RE.match(content)
    if not match:
        raise ValueError("missing or invalid YAML front matter (expected leading --- block)")
    return match.group(1), content[match.end() :]


def has_url(front_matter: str) -> bool:
    return URL_LINE_RE.search(front_matter) is not None


def insert_url_line(front_matter: str, url: str) -> str:
    lines = front_matter.split("\n")
    for index, line in enumerate(lines):
        if line.startswith("date:"):
            lines.insert(index + 1, f"url: {url}")
            return "\n".join(lines).rstrip("\n") + "\n"

    if lines == [""]:
        lines = [f"url: {url}"]
    else:
        lines.append(f"url: {url}")
    return "\n".join(lines).rstrip("\n") + "\n"


def apply_url(front_matter: str, url: str, *, force: bool) -> tuple[str, str]:
    if has_url(front_matter):
        if not force:
            return front_matter, "skip"
        updated = URL_LINE_RE.sub(f"url: {url}", front_matter, count=1)
        return updated, "replace"

    return insert_url_line(front_matter, url), "add"


def set_url_in_file(path: Path, *, force: bool, dry_run: bool) -> str:
    content = path.read_text(encoding="utf-8")
    front_matter, body = split_front_matter(content)
    url = format_url(generate_note_id())
    updated_front_matter, action = apply_url(front_matter, url, force=force)

    if action == "skip":
        return "skip"

    updated = f"---\n{updated_front_matter}---\n{body}"
    if not dry_run:
        path.write_text(updated, encoding="utf-8")

    return action


def is_note_file(path: Path) -> bool:
    return path.suffix == ".md" and not path.name.startswith("_index")


def find_notes_without_url(notes_dir: Path) -> list[Path]:
    if not notes_dir.is_dir():
        raise FileNotFoundError(f"notes directory not found: {notes_dir}")

    missing: list[Path] = []
    for path in sorted(notes_dir.rglob("*.md")):
        if not is_note_file(path):
            continue
        content = path.read_text(encoding="utf-8")
        try:
            front_matter, _ = split_front_matter(content)
        except ValueError:
            continue
        if not has_url(front_matter):
            missing.append(path)
    return missing


def resolve_path(path: Path, root: Path) -> Path:
    return path if path.is_absolute() else (root / path).resolve()


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Generate stable /notes/<id>/ URLs for Hugo note front matter.",
        epilog=(
            "Examples:\n"
            "  note-url.py\n"
            "  note-url.py content/notes/2026-06-20.en.md\n"
            "  note-url.py --missing\n"
        ),
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "files",
        nargs="*",
        help="note markdown file(s) to update",
    )
    parser.add_argument(
        "--missing",
        "-m",
        action="store_true",
        help="set url for every note in the notes dir that lacks one",
    )
    parser.add_argument(
        "--notes-dir",
        type=Path,
        default=None,
        help=f"notes directory for --missing (default: <repo>/{DEFAULT_NOTES_DIR})",
    )
    parser.add_argument(
        "--force",
        "-f",
        action="store_true",
        help="replace an existing url instead of skipping",
    )
    parser.add_argument(
        "--dry-run",
        "-n",
        action="store_true",
        help="print actions without writing files",
    )
    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    root = repo_root()
    notes_dir = args.notes_dir or (root / DEFAULT_NOTES_DIR)

    if not args.files and not args.missing:
        print(format_url(generate_note_id()))
        return 0

    targets: list[Path] = []
    if args.missing:
        try:
            targets.extend(find_notes_without_url(notes_dir))
        except FileNotFoundError as error:
            print(error, file=sys.stderr)
            return 1

    for file_arg in args.files:
        targets.append(resolve_path(Path(file_arg), root))

    if not targets:
        print("No notes to update.", file=sys.stderr)
        return 0

    exit_code = 0
    seen: set[Path] = set()
    for path in targets:
        if path in seen:
            continue
        seen.add(path)

        if not path.is_file():
            print(f"skip: file not found: {path}", file=sys.stderr)
            exit_code = 1
            continue

        try:
            action = set_url_in_file(path, force=args.force, dry_run=args.dry_run)
        except ValueError as error:
            print(f"skip: {path}: {error}", file=sys.stderr)
            exit_code = 1
            continue

        if action == "skip":
            print(f"skip: {path} (url already set; use --force to replace)")
            continue

        prefix = "would set" if args.dry_run else "set"
        print(f"{prefix}: {path}")

    return exit_code


if __name__ == "__main__":
    sys.exit(main())
