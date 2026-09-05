#!/usr/bin/env python3
"""Render resume-print pages to A4 PDFs via headless Chromium (Chrome print path)."""

from __future__ import annotations

import argparse
import http.server
import shutil
import socket
import subprocess
import sys
import threading
import time
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STATIC_RESUME = ROOT / "static" / "resume"
PUBLIC_DIR = ROOT / "public"

BROWSER_CANDIDATES = (
    "chromium",
    "chromium-browser",
    "google-chrome-stable",
    "google-chrome",
    "google-chrome-beta",
    "chrome",
)


@dataclass(frozen=True)
class ResumeTarget:
    lang: str
    path: str
    filename: str


TARGETS = (
    ResumeTarget("en", "/resume/print/", "OmidFarhang-Resume.pdf"),
    ResumeTarget("de", "/de/resume/print/", "OmidFarhang-Resume-De.pdf"),
    ResumeTarget("fa", "/fa/resume/print/", "OmidFarhang-Resume-Fa.pdf"),
)


def repo_root() -> Path:
    return ROOT


def find_browser(explicit: str | None) -> str:
    if explicit:
        path = shutil.which(explicit)
        if not path:
            raise SystemExit(f"browser not found: {explicit}")
        return path
    for name in BROWSER_CANDIDATES:
        path = shutil.which(name)
        if path:
            return path
    raise SystemExit(
        "no Chromium/Chrome found; install chromium or pass --browser PATH"
    )


def free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind(("127.0.0.1", 0))
        return sock.getsockname()[1]


def run_hugo(*, minify: bool) -> None:
    cmd = ["hugo"]
    if minify:
        cmd.append("--minify")
    print(f"+ {' '.join(cmd)}", flush=True)
    subprocess.run(cmd, cwd=ROOT, check=True)


def make_handler(directory: Path) -> type[http.server.SimpleHTTPRequestHandler]:
    root = str(directory)

    class Handler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs) -> None:
            super().__init__(*args, directory=root, **kwargs)

        def log_message(self, format: str, *args) -> None:  # noqa: A003
            return

    return Handler


def serve_public(directory: Path, port: int) -> http.server.ThreadingHTTPServer:
    server = http.server.ThreadingHTTPServer(
        ("127.0.0.1", port), make_handler(directory)
    )
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    return server


def wait_for_server(port: int, timeout: float = 5.0) -> None:
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            with socket.create_connection(("127.0.0.1", port), timeout=0.2):
                return
        except OSError:
            time.sleep(0.05)
    raise SystemExit(f"local server on port {port} did not become ready")


def print_to_pdf(
    *,
    browser: str,
    url: str,
    output: Path,
    virtual_time_ms: int,
) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    # Write to a temp path first so a failed run does not clobber an existing PDF.
    tmp = output.with_suffix(output.suffix + ".tmp")
    if tmp.exists():
        tmp.unlink()

    cmd = [
        browser,
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--virtual-time-budget={virtual_time_ms}",
        f"--print-to-pdf={tmp}",
        url,
    ]
    print(f"+ print {url} -> {output.name}", flush=True)
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0 or not tmp.is_file() or tmp.stat().st_size == 0:
        detail = (result.stderr or result.stdout or "").strip()
        if tmp.exists():
            tmp.unlink()
        raise SystemExit(
            f"failed to print {url} (exit {result.returncode})"
            + (f": {detail}" if detail else "")
        )
    tmp.replace(output)


def select_targets(langs: list[str] | None) -> list[ResumeTarget]:
    if not langs:
        return list(TARGETS)
    wanted = {lang.lower() for lang in langs}
    unknown = wanted - {t.lang for t in TARGETS}
    if unknown:
        raise SystemExit(f"unknown language(s): {', '.join(sorted(unknown))}")
    return [t for t in TARGETS if t.lang in wanted]


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Build the site (optional) and print /resume/print pages to A4 PDFs "
            "in static/resume/ using headless Chromium — same path as Chrome "
            "Print → Save as PDF."
        )
    )
    parser.add_argument(
        "--lang",
        action="append",
        choices=["en", "de", "fa"],
        metavar="LANG",
        help="language to export (repeatable; default: all)",
    )
    parser.add_argument(
        "--no-build",
        action="store_true",
        help="skip hugo build; use existing public/ (or --base-url)",
    )
    parser.add_argument(
        "--minify",
        action=argparse.BooleanOptionalAction,
        default=True,
        help="pass --minify to hugo (default: true)",
    )
    parser.add_argument(
        "--base-url",
        help=(
            "serve from this origin instead of a local public/ server "
            "(e.g. http://127.0.0.1:1313 from hugo server)"
        ),
    )
    parser.add_argument(
        "--browser",
        help="Chromium/Chrome binary (default: first found on PATH)",
    )
    parser.add_argument(
        "--out-dir",
        type=Path,
        default=STATIC_RESUME,
        help=f"output directory (default: {STATIC_RESUME})",
    )
    parser.add_argument(
        "--virtual-time-ms",
        type=int,
        default=10000,
        help="Chromium virtual-time budget for fonts/layout (default: 10000)",
    )
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    targets = select_targets(args.lang)
    browser = find_browser(args.browser)
    out_dir = args.out_dir if args.out_dir.is_absolute() else ROOT / args.out_dir

    server: http.server.ThreadingHTTPServer | None = None
    try:
        if args.base_url:
            base = args.base_url.rstrip("/")
        else:
            if not args.no_build:
                run_hugo(minify=args.minify)
            if not PUBLIC_DIR.is_dir():
                raise SystemExit(
                    f"missing {PUBLIC_DIR}; run without --no-build or pass --base-url"
                )
            for target in targets:
                page = PUBLIC_DIR / target.path.strip("/") / "index.html"
                if not page.is_file():
                    raise SystemExit(f"missing built page: {page}")
            port = free_port()
            server = serve_public(PUBLIC_DIR, port)
            wait_for_server(port)
            base = f"http://127.0.0.1:{port}"

        for target in targets:
            print_to_pdf(
                browser=browser,
                url=f"{base}{target.path}",
                output=out_dir / target.filename,
                virtual_time_ms=args.virtual_time_ms,
            )
            size = (out_dir / target.filename).stat().st_size
            print(f"  wrote {out_dir / target.filename} ({size:,} bytes)")
    finally:
        if server is not None:
            server.shutdown()

    print("done")
    return 0


if __name__ == "__main__":
    sys.exit(main())
