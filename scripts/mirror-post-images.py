#!/usr/bin/env python3
"""Mirror external post images into static/images and rewrite markdown URLs."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import Counter, defaultdict
from dataclasses import dataclass
from pathlib import Path

DEFAULT_CONTENT_DIR = Path("content")
DEFAULT_STATIC_DIR = Path("static/images")
LOCAL_PREFIX = "/images"
MANIFEST_NAME = ".mirror-manifest.json"

DATE_RE = re.compile(r"^date:\s*(\d{4})-(\d{2})-\d{2}", re.MULTILINE)
FILENAME_DATE_RE = re.compile(r"(\d{4})-(\d{2})-\d{2}")
FRONT_MATTER_IMAGE_RE = re.compile(
    r"^(?:image|cover\.image|images):\s*(.+)$", re.MULTILINE
)
MARKDOWN_IMAGE_RE = re.compile(
    r"!\[[^\]]*\]\(([^)]+)\)|" r"\[!\[[^\]]*\]\(([^)]+)\)\]\(([^)]+)\)"
)
HTML_IMAGE_RE = re.compile(r"""<img[^>]+src=["']([^"']+)["']""", re.IGNORECASE)
HTML_PAGE_IMG_RE = re.compile(
    r"""<img[^>]+src=["'](https?://[^"']+)["']""",
    re.IGNORECASE,
)
IMAGE_EXT_RE = re.compile(r"\.(jpe?g|png|gif|webp|svg|bmp|tiff?)(\?|#|$)", re.IGNORECASE)
BLOGGER_SIZE_H_RE = re.compile(r"/s(\d+)-h/")
KNOWN_IMAGE_HOSTS = ("ggpht.com", "blogspot.com", "googleusercontent.com", "imgur.com")
USER_AGENT = "omid.dev-image-mirror/1.0 (+https://omid.dev)"


@dataclass(frozen=True)
class ImageRef:
    url: str
    post_path: Path
    year: str
    month: str


def repo_root() -> Path:
    return Path(__file__).resolve().parent.parent


def resolve_path(path: Path, root: Path) -> Path:
    return path if path.is_absolute() else (root / path).resolve()


def parse_post_date(path: Path, content: str) -> tuple[str, str]:
    match = DATE_RE.search(content)
    if match:
        return match.group(1), match.group(2)

    match = FILENAME_DATE_RE.search(path.name)
    if match:
        return match.group(1), match.group(2)

    raise ValueError(f"could not determine year/month for {path}")


def normalize_url(url: str) -> str:
    return url.strip().rstrip(".,;:")


def is_external_url(url: str) -> bool:
    parsed = urllib.parse.urlparse(url)
    return parsed.scheme in ("http", "https") and bool(parsed.netloc)


def is_image_url(url: str) -> bool:
    if not is_external_url(url):
        return False

    parsed = urllib.parse.urlparse(url)
    if IMAGE_EXT_RE.search(parsed.path):
        return True

    host = parsed.netloc.lower()
    return any(marker in host for marker in KNOWN_IMAGE_HOSTS)


def domain_matches(host: str, pattern: str) -> bool:
    host = host.lower()
    pattern = pattern.lower().lstrip(".")
    return host == pattern or host.endswith("." + pattern)


def extract_image_urls(content: str) -> list[str]:
    urls: list[str] = []

    for match in MARKDOWN_IMAGE_RE.finditer(content):
        for group in match.groups():
            if group:
                urls.append(normalize_url(group))

    for match in HTML_IMAGE_RE.finditer(content):
        urls.append(normalize_url(match.group(1)))

    for match in FRONT_MATTER_IMAGE_RE.finditer(content):
        value = match.group(1).strip().strip("\"'")
        if value.startswith("["):
            continue
        if is_external_url(value):
            urls.append(normalize_url(value))

    return [url for url in urls if is_image_url(url)]


def scan_posts(content_dir: Path) -> tuple[Counter[str], list[ImageRef]]:
    domain_counts: Counter[str] = Counter()
    refs: list[ImageRef] = []

    for path in sorted(content_dir.rglob("*.md")):
        if path.name.startswith("_index"):
            continue

        content = path.read_text(encoding="utf-8", errors="replace")
        try:
            year, month = parse_post_date(path, content)
        except ValueError:
            continue

        seen_in_post: set[str] = set()
        for url in extract_image_urls(content):
            if url in seen_in_post:
                continue
            seen_in_post.add(url)

            host = urllib.parse.urlparse(url).netloc.lower()
            if not host:
                continue

            domain_counts[host] += 1
            refs.append(ImageRef(url=url, post_path=path, year=year, month=month))

    return domain_counts, refs


def group_domains(domain_counts: Counter[str]) -> dict[str, Counter[str]]:
    grouped: dict[str, Counter[str]] = defaultdict(Counter)
    for host, count in domain_counts.items():
        parts = host.split(".")
        if len(parts) >= 2:
            base = ".".join(parts[-2:])
        else:
            base = host
        grouped[base][host] = count
    return grouped


def print_domain_report(domain_counts: Counter[str]) -> None:
    if not domain_counts:
        print("No external image URLs found.")
        return

    grouped = group_domains(domain_counts)
    total = sum(domain_counts.values())

    print(f"Found {total} external image URL(s) across {len(domain_counts)} host(s).\n")
    print("Grouped by registrable domain:")
    print(f"{'#':>3}  {'domain':<28} {'hosts':>5}  {'urls':>6}")
    print("-" * 48)

    rows: list[tuple[str, int, int]] = []
    for base, hosts in grouped.items():
        rows.append((base, len(hosts), sum(hosts.values())))
    rows.sort(key=lambda item: (-item[2], item[0]))

    for index, (base, host_count, url_count) in enumerate(rows, start=1):
        print(f"{index:>3}  {base:<28} {host_count:>5}  {url_count:>6}")

    print("\nHosts:")
    print(f"{'host':<32} {'urls':>6}")
    print("-" * 40)
    for host, count in domain_counts.most_common():
        print(f"{host:<32} {count:>6}")


def prompt_domain_selection(domain_counts: Counter[str]) -> list[str]:
    if not domain_counts:
        return []

    grouped = group_domains(domain_counts)
    rows = sorted(
        grouped.items(),
        key=lambda item: (-sum(item[1].values()), item[0]),
    )

    print("\nSelect domain(s) to mirror:")
    for index, (base, hosts) in enumerate(rows, start=1):
        print(f"  [{index}] {base} ({sum(hosts.values())} URL(s), {len(hosts)} host(s))")
    print("  [a] all domains")
    print("  [q] quit")

    while True:
        choice = input("\nEnter number(s), domain name(s), or 'a': ").strip().lower()
        if not choice:
            continue
        if choice in {"q", "quit"}:
            return []

        if choice == "a":
            return list(domain_counts)

        selected: list[str] = []
        tokens = [token.strip() for token in re.split(r"[\s,]+", choice) if token.strip()]
        for token in tokens:
            if token.isdigit():
                idx = int(token)
                if 1 <= idx <= len(rows):
                    selected.append(rows[idx - 1][0])
                else:
                    print(f"Invalid selection: {token}")
                    selected = []
                    break
                continue

            if token in grouped:
                selected.append(token)
                continue

            if token in domain_counts:
                selected.append(token)
                continue

            matched = [host for host in domain_counts if domain_matches(host, token)]
            if matched:
                selected.extend(matched)
                continue

            print(f"Unknown domain: {token}")
            selected = []
            break

        if selected:
            return sorted(set(selected))

        print("No valid domains selected. Try again.")


def sanitize_filename(name: str) -> str:
    stem = Path(name).stem
    suffix = Path(name).suffix.lower()
    stem = urllib.parse.unquote(stem)
    stem = stem.replace("[", "-").replace("]", "")
    stem = re.sub(r"[^\w.\-]+", "-", stem, flags=re.UNICODE)
    stem = re.sub(r"-{2,}", "-", stem).strip("-._")
    if not stem:
        stem = "image"
    if suffix and not suffix.startswith("."):
        suffix = f".{suffix}"
    if not suffix:
        suffix = ".bin"
    return f"{stem}{suffix}"


def local_relative_path(year: str, month: str, filename: str) -> str:
    return f"{LOCAL_PREFIX}/{year}/{month}/{filename}"


def relative_to_static_path(relative: str, static_dir: Path) -> Path:
    prefix = f"{LOCAL_PREFIX}/"
    if not relative.startswith(prefix):
        raise ValueError(f"unexpected local image path: {relative}")
    return static_dir / relative.removeprefix(prefix)


def load_manifest(static_dir: Path) -> dict[str, str]:
    manifest_path = static_dir / MANIFEST_NAME
    if not manifest_path.is_file():
        return {}
    try:
        data = json.loads(manifest_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return {}
    if not isinstance(data, dict):
        return {}
    return {str(url): str(path) for url, path in data.items()}


def save_manifest(static_dir: Path, manifest: dict[str, str]) -> None:
    manifest_path = static_dir / MANIFEST_NAME
    static_dir.mkdir(parents=True, exist_ok=True)
    manifest_path.write_text(
        json.dumps(dict(sorted(manifest.items())), indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )


def url_hash(url: str) -> str:
    return hashlib.sha1(url.encode("utf-8")).hexdigest()[:8]


def choose_local_filename(
    url: str,
    year: str,
    month: str,
    dest_dir: Path,
    used_names: set[str],
    manifest_paths: set[str],
) -> tuple[str, bool]:
    """Return a unique filename in dest_dir. Second value is True when renamed."""
    parsed = urllib.parse.urlparse(url)
    base = sanitize_filename(Path(parsed.path).name or "image")
    stem = Path(base).stem
    suffix = Path(base).suffix
    digest = url_hash(url)

    candidates = [base, f"{stem}-{digest}{suffix}"]
    counter = 2
    while True:
        for candidate in candidates:
            relative_path = local_relative_path(year, month, candidate)
            if candidate in used_names:
                continue
            if (dest_dir / candidate).exists():
                continue
            if relative_path in manifest_paths:
                continue
            used_names.add(candidate)
            return candidate, candidate != base

        candidates.append(f"{stem}-{digest}-{counter}{suffix}")
        counter += 1


def resolve_destination(
    url: str,
    year: str,
    month: str,
    static_dir: Path,
    manifest: dict[str, str],
    used_names: set[str],
) -> tuple[Path, str, bool]:
    """Resolve download destination for a URL, reusing manifest mapping when possible."""
    manifest_paths = set(manifest.values())

    if url in manifest:
        relative = manifest[url]
        dest = relative_to_static_path(relative, static_dir)
        if is_valid_image_file(dest):
            return dest, relative, False

    dest_dir = static_dir / year / month
    filename, renamed = choose_local_filename(
        url,
        year,
        month,
        dest_dir,
        used_names,
        manifest_paths,
    )
    if renamed:
        print(f"renamed: {sanitize_filename(Path(urllib.parse.urlparse(url).path).name)} -> {filename}")

    relative = local_relative_path(year, month, filename)
    dest = static_dir / year / month / filename
    return dest, relative, True


def normalize_image_url(url: str) -> str:
    """Rewrite Blogger/Blogspot paths that return HTML wrappers."""
    parsed = urllib.parse.urlparse(url)
    host = parsed.netloc.lower()
    if "blogspot.com" not in host and "ggpht.com" not in host:
        return url

    path = BLOGGER_SIZE_H_RE.sub(r"/s\1/", parsed.path)
    if path == parsed.path:
        return url
    return urllib.parse.urlunparse(parsed._replace(path=path))


def is_image_bytes(data: bytes) -> bool:
    if data.startswith(b"\xff\xd8\xff"):
        return True
    if data.startswith(b"\x89PNG\r\n\x1a\n"):
        return True
    if data.startswith((b"GIF87a", b"GIF89a")):
        return True
    if len(data) >= 12 and data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        return True
    if data.startswith(b"BM"):
        return True
    return False


def is_html_bytes(data: bytes, content_type: str = "") -> bool:
    if "text/html" in content_type.lower():
        return True
    stripped = data.lstrip()[:32].lower()
    return stripped.startswith((b"<html", b"<!doctype"))


def extract_image_url_from_html(data: bytes) -> str | None:
    text = data.decode("utf-8", errors="replace")
    match = HTML_PAGE_IMG_RE.search(text)
    if match:
        return normalize_url(match.group(1))
    return None


def is_valid_image_file(path: Path) -> bool:
    if not path.is_file():
        return False
    try:
        header = path.read_bytes()[:512]
    except OSError:
        return False
    if is_html_bytes(header):
        return False
    return is_image_bytes(header)


def fetch_image_data(url: str, timeout: float, *, depth: int = 0) -> bytes:
    if depth > 3:
        raise ValueError("too many hops while resolving image URL")

    fetch_url = normalize_image_url(url)
    request = urllib.request.Request(
        fetch_url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept": "image/*,*/*;q=0.8",
        },
    )
    with urllib.request.urlopen(request, timeout=timeout) as response:
        data = response.read()
        content_type = response.headers.get("Content-Type", "")

    if not data:
        raise ValueError("empty response")

    if is_image_bytes(data):
        return data

    if is_html_bytes(data, content_type):
        nested_url = extract_image_url_from_html(data)
        if nested_url:
            if nested_url != fetch_url:
                return fetch_image_data(nested_url, timeout, depth=depth + 1)
            raise ValueError("HTML wrapper points to the same URL")
        raise ValueError("HTML response without embedded image URL")

    raise ValueError(f"response is not an image ({content_type or 'unknown type'})")


def write_image_file(dest: Path, data: bytes) -> None:
    if not is_image_bytes(data):
        raise ValueError("refusing to save non-image data")

    dest.parent.mkdir(parents=True, exist_ok=True)
    temp_dest = dest.with_suffix(dest.suffix + ".part")
    try:
        temp_dest.write_bytes(data)
        os.replace(temp_dest, dest)
    finally:
        if temp_dest.exists():
            temp_dest.unlink(missing_ok=True)


def download_image(url: str, dest: Path, timeout: float) -> None:
    data = fetch_image_data(url, timeout)
    write_image_file(dest, data)


def filter_refs(refs: list[ImageRef], patterns: list[str]) -> list[ImageRef]:
    if not patterns:
        return []

    filtered: list[ImageRef] = []
    for ref in refs:
        host = urllib.parse.urlparse(ref.url).netloc.lower()
        if any(domain_matches(host, pattern) for pattern in patterns):
            filtered.append(ref)
    return filtered


def update_posts_for_url(
    url: str,
    relative: str,
    refs_by_url: dict[str, list[ImageRef]],
    *,
    dry_run: bool,
) -> int:
    updated_count = 0
    seen_posts: set[Path] = set()

    for ref in refs_by_url[url]:
        if ref.post_path in seen_posts:
            continue
        seen_posts.add(ref.post_path)

        content = ref.post_path.read_text(encoding="utf-8")
        if url not in content:
            continue

        if dry_run:
            print(f"would update: {ref.post_path}")
            updated_count += 1
            continue

        ref.post_path.write_text(content.replace(url, relative), encoding="utf-8")
        print(f"updated: {ref.post_path}")
        updated_count += 1

    return updated_count


def mirror_images(
    refs: list[ImageRef],
    static_dir: Path,
    *,
    dry_run: bool,
    skip_existing: bool,
    timeout: float,
    delay: float,
) -> tuple[int, int, int]:
    downloaded = 0
    skipped = 0
    failed = 0

    refs_by_url: dict[str, list[ImageRef]] = defaultdict(list)
    for ref in refs:
        refs_by_url[ref.url].append(ref)

    manifest = load_manifest(static_dir)
    per_dir_names: dict[Path, set[str]] = defaultdict(set)

    for url, url_refs in refs_by_url.items():
        ref = url_refs[0]
        dest, relative, needs_download = resolve_destination(
            url,
            ref.year,
            ref.month,
            static_dir,
            manifest,
            per_dir_names[static_dir / ref.year / ref.month],
        )

        if not needs_download:
            print(f"exists: {dest}")
            update_posts_for_url(url, relative, refs_by_url, dry_run=dry_run)
            skipped += 1
            continue

        if skip_existing and is_valid_image_file(dest):
            if manifest.get(url) != relative:
                manifest[url] = relative
                save_manifest(static_dir, manifest)
            print(f"exists: {dest}")
            update_posts_for_url(url, relative, refs_by_url, dry_run=dry_run)
            skipped += 1
            continue

        if dest.is_file() and not is_valid_image_file(dest):
            print(f"replacing invalid file: {dest}")

        if dry_run:
            print(f"would download: {url}")
            print(f"         -> {dest}")
            update_posts_for_url(url, relative, refs_by_url, dry_run=dry_run)
            downloaded += 1
            continue

        try:
            download_image(url, dest, timeout)
        except (urllib.error.URLError, TimeoutError, ValueError) as error:
            print(f"failed: {url}\n       {error}", file=sys.stderr)
            failed += 1
            if delay:
                time.sleep(delay)
            continue

        manifest[url] = relative
        save_manifest(static_dir, manifest)
        downloaded += 1
        print(f"saved: {dest}")
        update_posts_for_url(url, relative, refs_by_url, dry_run=dry_run)

        if delay:
            time.sleep(delay)

    return downloaded, skipped, failed


def repair_invalid_images(
    static_dir: Path,
    *,
    dry_run: bool,
    timeout: float,
    delay: float,
) -> tuple[int, int]:
    repaired = 0
    failed = 0

    for path in sorted(static_dir.rglob("*")):
        if not path.is_file() or path.name == MANIFEST_NAME:
            continue
        try:
            data = path.read_bytes()
        except OSError as error:
            print(f"failed to read: {path}\n       {error}", file=sys.stderr)
            failed += 1
            continue

        if not is_html_bytes(data):
            continue

        source_url = extract_image_url_from_html(data)
        if not source_url:
            print(
                f"failed: {path}\n       HTML file without embedded image URL",
                file=sys.stderr,
            )
            failed += 1
            continue

        if dry_run:
            print(f"would repair: {path}")
            print(f"        from: {source_url}")
            repaired += 1
            continue

        try:
            image_data = fetch_image_data(source_url, timeout)
            write_image_file(path, image_data)
        except (urllib.error.URLError, TimeoutError, ValueError) as error:
            print(f"failed: {path}\n       {error}", file=sys.stderr)
            failed += 1
            if delay:
                time.sleep(delay)
            continue

        print(f"repaired: {path}")
        repaired += 1

        if delay:
            time.sleep(delay)

    return repaired, failed


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description=(
            "Scan Hugo markdown for external images, mirror selected domains "
            "into static/images/{year}/{month}/, and rewrite post URLs."
        ),
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=(
            "Examples:\n"
            "  mirror-post-images.py scan\n"
            "  mirror-post-images.py mirror --domain ggpht.com\n"
            "  mirror-post-images.py mirror --domain bp.blogspot.com --dry-run\n"
            "  mirror-post-images.py mirror\n"
            "  mirror-post-images.py repair\n"
        ),
    )
    parser.add_argument(
        "--content-dir",
        type=Path,
        default=None,
        help=f"content root to scan (default: <repo>/{DEFAULT_CONTENT_DIR})",
    )
    parser.add_argument(
        "--static-dir",
        type=Path,
        default=None,
        help=f"image output root (default: <repo>/{DEFAULT_STATIC_DIR})",
    )

    subparsers = parser.add_subparsers(dest="command", required=True)

    subparsers.add_parser("scan", help="list external image domains found in posts")

    mirror = subparsers.add_parser("mirror", help="download images and rewrite posts")
    mirror.add_argument(
        "--domain",
        "-d",
        action="append",
        default=[],
        help="domain or base domain to mirror (repeatable). Prompts if omitted.",
    )
    mirror.add_argument(
        "--all",
        action="store_true",
        help="mirror every external image domain without prompting",
    )
    mirror.add_argument(
        "--dry-run",
        "-n",
        action="store_true",
        help="show planned downloads and rewrites without changing files",
    )
    mirror.add_argument(
        "--force",
        "-f",
        action="store_true",
        help="re-download even when the destination file already exists",
    )
    mirror.add_argument(
        "--timeout",
        type=float,
        default=30.0,
        help="HTTP timeout in seconds (default: 30)",
    )
    mirror.add_argument(
        "--delay",
        type=float,
        default=0.25,
        help="delay between downloads in seconds (default: 0.25)",
    )

    repair = subparsers.add_parser(
        "repair",
        help="re-download static image files that were saved as HTML wrappers",
    )
    repair.add_argument(
        "--dry-run",
        "-n",
        action="store_true",
        help="show files that would be repaired without changing them",
    )
    repair.add_argument(
        "--timeout",
        type=float,
        default=30.0,
        help="HTTP timeout in seconds (default: 30)",
    )
    repair.add_argument(
        "--delay",
        type=float,
        default=0.25,
        help="delay between downloads in seconds (default: 0.25)",
    )

    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    root = repo_root()
    content_dir = resolve_path(args.content_dir or (root / DEFAULT_CONTENT_DIR), root)
    static_dir = resolve_path(args.static_dir or (root / DEFAULT_STATIC_DIR), root)

    if args.command == "repair":
        if not static_dir.is_dir():
            print(f"static directory not found: {static_dir}", file=sys.stderr)
            return 1
        repaired, failed = repair_invalid_images(
            static_dir,
            dry_run=args.dry_run,
            timeout=args.timeout,
            delay=args.delay,
        )
        prefix = "would repair" if args.dry_run else "repaired"
        print(f"\n{prefix}: {repaired} file(s), {failed} failed.")
        return 1 if failed else 0

    if not content_dir.is_dir():
        print(f"content directory not found: {content_dir}", file=sys.stderr)
        return 1

    domain_counts, refs = scan_posts(content_dir)

    if args.command == "scan":
        print_domain_report(domain_counts)
        return 0

    patterns: list[str] = []
    if args.all:
        patterns = list(domain_counts)
    elif args.domain:
        patterns = args.domain
    else:
        print_domain_report(domain_counts)
        patterns = prompt_domain_selection(domain_counts)

    if not patterns:
        print("No domains selected.")
        return 0

    selected_refs = filter_refs(refs, patterns)
    if not selected_refs:
        print("No matching image URLs for the selected domain(s).")
        return 0

    print(
        f"\nMirroring {len({ref.url for ref in selected_refs})} unique URL(s) "
        f"from {len(selected_refs)} reference(s) in "
        f"{len({ref.post_path for ref in selected_refs})} post(s)."
    )

    downloaded, skipped, failed = mirror_images(
        selected_refs,
        static_dir,
        dry_run=args.dry_run,
        skip_existing=not args.force,
        timeout=args.timeout,
        delay=args.delay,
    )

    prefix = "would process" if args.dry_run else "processed"
    print(
        f"\n{prefix}: {downloaded} download(s), {skipped} skipped existing, {failed} failed."
    )
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
