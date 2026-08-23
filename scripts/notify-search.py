#!/usr/bin/env python3
"""Notify search engines after a publish: IndexNow, WebSub, and Ping-o-Matic.

Inspects by default. Pass --apply to send requests.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request
import xmlrpc.client
from dataclasses import dataclass
from pathlib import Path

DEFAULT_SITE_URL = "https://omid.dev"
DEFAULT_SITE_NAME = "Omid Farhang"
WEBSUB_HUB = "https://pubsubhubbub.appspot.com/"
INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"
PINGOMATIC_ENDPOINT = "https://rpc.pingomatic.com/"
LANG_SUFFIX_RE = re.compile(r"\.(en|fa|de)\.md$")
FRONT_MATTER_RE = re.compile(r"\A---\n(.*?)\n---(?:\n|\Z)", re.DOTALL)
URL_LINE_RE = re.compile(r"^url\s*:\s*(.+)$", re.MULTILINE)
DRAFT_LINE_RE = re.compile(r"^draft\s*:\s*true\s*$", re.MULTILINE | re.IGNORECASE)
HTTP_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
    ),
    "Accept": "application/json, text/plain, */*",
}


@dataclass(frozen=True)
class PageMeta:
    path: Path
    lang: str
    url: str
    is_draft: bool

    def permalink(self, site: str) -> str:
        site = site.rstrip("/")
        slug = self.url.strip("/")
        if self.lang == "en":
            return f"{site}/{slug}/"
        return f"{site}/{self.lang}/{slug}/"


def repo_root() -> Path:
    return Path(__file__).resolve().parent.parent


def unquote_yaml_scalar(value: str) -> str:
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in {'"', "'"}:
        return value[1:-1]
    return value


def parse_page(path: Path) -> PageMeta:
    match = LANG_SUFFIX_RE.search(path.name)
    if not match:
        raise ValueError("filename must end with .en.md, .fa.md, or .de.md")

    content = path.read_text(encoding="utf-8")
    fm_match = FRONT_MATTER_RE.match(content)
    if not fm_match:
        raise ValueError("missing YAML front matter")
    front_matter = fm_match.group(1)

    url_match = URL_LINE_RE.search(front_matter)
    if not url_match:
        raise ValueError("front matter missing url:")

    return PageMeta(
        path=path,
        lang=match.group(1),
        url=unquote_yaml_scalar(url_match.group(1)),
        is_draft=bool(DRAFT_LINE_RE.search(front_matter)),
    )


def load_indexnow_key(hugo_yaml: Path) -> str | None:
    if not hugo_yaml.is_file():
        return None
    in_block = False
    for line in hugo_yaml.read_text(encoding="utf-8").splitlines():
        if re.match(r"^  indexNow:\s*$", line):
            in_block = True
            continue
        if in_block:
            if re.match(r"^    key:\s*", line):
                return unquote_yaml_scalar(line.split(":", 1)[1])
            if line and not line.startswith("    "):
                break
    return None


def homepage_urls(site: str) -> list[str]:
    site = site.rstrip("/")
    return [f"{site}/", f"{site}/fa/", f"{site}/de/"]


def feed_urls(site: str) -> list[str]:
    site = site.rstrip("/")
    urls = [
        f"{site}/index.xml",
        f"{site}/posts/index.xml",
        f"{site}/notes/index.xml",
    ]
    for lang in ("fa", "de"):
        urls.extend(
            [
                f"{site}/{lang}/index.xml",
                f"{site}/{lang}/posts/index.xml",
                f"{site}/{lang}/notes/index.xml",
            ]
        )
    return urls


def git_changed_paths(root: Path, since: str) -> list[Path]:
    result = subprocess.run(
        [
            "git",
            "-C",
            str(root),
            "diff",
            "--name-only",
            "--diff-filter=ACMR",
            since,
            "--",
            "content/posts",
            "content/notes",
        ],
        check=False,
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        message = (result.stderr or result.stdout).strip() or "git diff failed"
        raise RuntimeError(message)
    return [root / line.strip() for line in result.stdout.splitlines() if line.strip()]


def urls_from_paths(paths: list[Path], site: str, *, include_drafts: bool) -> list[str]:
    urls: list[str] = []
    seen: set[str] = set()
    for path in paths:
        if path.suffix != ".md" or path.name.startswith("_index"):
            continue
        if not LANG_SUFFIX_RE.search(path.name):
            continue
        try:
            meta = parse_page(path)
        except ValueError as error:
            print(f"skip {path}: {error}", file=sys.stderr)
            continue
        if meta.is_draft and not include_drafts:
            print(f"skip draft {path}", file=sys.stderr)
            continue
        url = meta.permalink(site)
        if url not in seen:
            seen.add(url)
            urls.append(url)
    return urls


def http_request(
    url: str,
    *,
    data: bytes | None = None,
    headers: dict[str, str] | None = None,
    method: str = "POST",
) -> tuple[int, str]:
    request = urllib.request.Request(url, data=data, method=method, headers=headers or {})
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            body = response.read().decode("utf-8", errors="replace")
            return int(response.status), body
    except urllib.error.HTTPError as error:
        body = error.read().decode("utf-8", errors="replace")
        return int(error.code), body


def notify_indexnow(urls: list[str], *, host: str, key: str, key_location: str) -> None:
    payload = {
        "host": host,
        "key": key,
        "keyLocation": key_location,
        "urlList": urls,
    }
    body = json.dumps(payload).encode("utf-8")
    headers = {
        **HTTP_HEADERS,
        "Content-Type": "application/json; charset=utf-8",
    }
    status, text = http_request(INDEXNOW_ENDPOINT, data=body, headers=headers)
    if status not in {200, 202}:
        raise RuntimeError(f"IndexNow HTTP {status}: {text[:300]}")
    print(f"IndexNow: HTTP {status} ({len(urls)} URLs)")


def notify_websub(feeds: list[str]) -> list[str]:
    failures: list[str] = []
    form_headers = {
        **HTTP_HEADERS,
        "Content-Type": "application/x-www-form-urlencoded",
    }
    for feed in feeds:
        data = urllib.parse.urlencode({"hub.mode": "publish", "hub.url": feed}).encode("utf-8")
        status, text = http_request(WEBSUB_HUB, data=data, headers=form_headers)
        if status not in {204, 202, 200}:
            failures.append(f"{feed} HTTP {status}: {text[:200]}")
            print(f"WebSub fail {feed}: HTTP {status}", file=sys.stderr)
        else:
            print(f"WebSub: {feed} HTTP {status}")
    return failures


def notify_pingomatic(*, name: str, site: str, feed: str) -> None:
    proxy = xmlrpc.client.ServerProxy(PINGOMATIC_ENDPOINT, allow_none=False)
    try:
        result = proxy.weblogUpdates.extendedPing(name, site, feed)
    except Exception as error:
        raise RuntimeError(f"Ping-o-Matic request failed: {error}") from error
    print(f"Ping-o-Matic: {result}")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description=(
            "Notify IndexNow, WebSub, and Ping-o-Matic about published URLs. "
            "Dry-run unless --apply is set."
        )
    )
    parser.add_argument(
        "--apply",
        action="store_true",
        help="send notifications (default is dry-run)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="print URLs and feeds without sending (default)",
    )
    parser.add_argument(
        "--since",
        default="HEAD~1",
        help="git revision to diff against for content URLs (default: HEAD~1)",
    )
    parser.add_argument(
        "--urls",
        nargs="*",
        default=None,
        help="explicit URLs to submit (skips git diff when provided)",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=0,
        help="cap IndexNow URL count (0 = no cap)",
    )
    parser.add_argument(
        "--include-drafts",
        action="store_true",
        help="include draft content files from git diff",
    )
    parser.add_argument(
        "--site-url",
        default=None,
        help=f"site origin (default: {DEFAULT_SITE_URL})",
    )
    return parser


def main() -> int:
    args = build_parser().parse_args()
    root = repo_root()
    site = (args.site_url or os.environ.get("SITE_URL") or DEFAULT_SITE_URL).rstrip("/")
    host = urllib.parse.urlparse(site).netloc
    key = os.environ.get("INDEXNOW_KEY") or load_indexnow_key(root / "hugo.yaml")
    if not key:
        print("IndexNow key missing: set params.indexNow.key or INDEXNOW_KEY", file=sys.stderr)
        return 1

    key_location = f"{site}/{key}.txt"

    if args.urls:
        page_urls = list(dict.fromkeys(args.urls))
    else:
        try:
            changed = git_changed_paths(root, args.since)
        except RuntimeError as error:
            print(f"git: {error}", file=sys.stderr)
            return 1
        page_urls = urls_from_paths(changed, site, include_drafts=args.include_drafts)

    for home in homepage_urls(site):
        if home not in page_urls:
            page_urls.append(home)

    if args.limit and args.limit > 0:
        page_urls = page_urls[: args.limit]

    feeds = feed_urls(site)
    apply = args.apply and not args.dry_run

    print(f"URLs ({len(page_urls)}):")
    for url in page_urls:
        print(f"  {url}")
    print(f"Feeds ({len(feeds)}):")
    for feed in feeds:
        print(f"  {feed}")

    if not apply:
        print("dry-run: pass --apply to notify IndexNow, WebSub, and Ping-o-Matic")
        return 0

    failures = 0
    try:
        notify_indexnow(page_urls, host=host, key=key, key_location=key_location)
    except RuntimeError as error:
        print(f"IndexNow: {error}", file=sys.stderr)
        failures += 1

    failures += len(notify_websub(feeds))

    try:
        notify_pingomatic(name=DEFAULT_SITE_NAME, site=f"{site}/", feed=f"{site}/index.xml")
    except RuntimeError as error:
        print(f"Ping-o-Matic: {error}", file=sys.stderr)
        failures += 1

    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
