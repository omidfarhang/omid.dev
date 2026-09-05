#!/usr/bin/env python3
"""Build the resume stack-icons woff2 + CSS from SVG sources.

Requires: fonttools, brotli (system packages).

  python3 scripts/build-stack-icons.py
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

from fontTools.fontBuilder import FontBuilder
from fontTools.misc.transform import Transform
from fontTools.pens.t2CharStringPen import T2CharStringPen
from fontTools.svgLib import SVGPath

ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = ROOT / "scripts" / "stack-icons"
FONT_OUT = ROOT / "themes/omid-dev/static/fonts/stack-icons.woff2"
CSS_OUT = ROOT / "themes/omid-dev/assets/css/vendor/stack-icons.css"
UPM = 1000
PUA_START = 0xE001

# Stable order — never reorder; append new glyphs at the end.
GLYPHS = [
    "angular",
    "angularjs",
    "azuredevops",
    "css",
    "docker",
    "ffmpeg",
    "gradle",
    "grpc",
    "java",
    "laravel",
    "linux",
    "mariadb",
    "mysql",
    "nginx",
    "nx",
    "php",
    "playwright",
    "rxjs",
    "springboot",
    "storybook",
    "typescript",
    "ubuntu",
    "vitest",
    "windows",
    "wordpress",
    "gitlab",
]

VIEWBOX_RE = re.compile(r'viewBox=["\']([^"\']+)["\']', re.I)


def viewbox(svg: str) -> tuple[float, float, float, float]:
    match = VIEWBOX_RE.search(svg)
    if not match:
        return (0.0, 0.0, 24.0, 24.0)
    x, y, w, h = (float(n) for n in match.group(1).replace(",", " ").split())
    return x, y, w, h


def svg_to_charstring(svg: str):
    x, y, w, h = viewbox(svg)
    size = max(w, h) or 24.0
    scale = UPM / size
    transform = Transform(scale, 0, 0, -scale, -x * scale, UPM + y * scale)
    path = SVGPath.fromstring(svg, transform=transform)
    pen = T2CharStringPen(UPM, None)
    path.draw(pen)
    return pen.getCharString()


def empty_charstring():
    pen = T2CharStringPen(UPM, None)
    return pen.getCharString()


def build() -> None:
    if not SRC_DIR.is_dir():
        sys.exit(f"Missing SVG sources: {SRC_DIR}")

    glyph_order = [".notdef", *GLYPHS]
    charstrings = {".notdef": empty_charstring()}
    cmap = {}

    for i, name in enumerate(GLYPHS):
        svg_path = SRC_DIR / f"{name}.svg"
        if not svg_path.is_file():
            sys.exit(f"Missing {svg_path}")
        charstrings[name] = svg_to_charstring(svg_path.read_text())
        cmap[PUA_START + i] = name

    metrics = {name: (UPM, 0) for name in glyph_order}

    fb = FontBuilder(UPM, isTTF=False)
    fb.setupGlyphOrder(glyph_order)
    fb.setupCharacterMap(cmap)
    fb.setupCFF("StackIcons", {"FullName": "Stack Icons"}, charstrings, {})
    fb.setupHorizontalMetrics(metrics)
    fb.setupHorizontalHeader(ascent=UPM, descent=0, lineGap=0)
    fb.setupNameTable(
        {
            "familyName": "StackIcons",
            "styleName": "Regular",
            "uniqueFontIdentifier": "StackIcons Regular",
            "fullName": "StackIcons",
            "psName": "StackIcons",
            "version": "Version 1.000",
        }
    )
    fb.setupOS2(
        sTypoAscender=UPM,
        sTypoDescender=0,
        sTypoLineGap=0,
        usWinAscent=UPM,
        usWinDescent=0,
        fsType=0,
    )
    fb.setupPost()
    fb.font.flavor = "woff2"
    FONT_OUT.parent.mkdir(parents=True, exist_ok=True)
    fb.save(str(FONT_OUT))

    rules = []
    for i, name in enumerate(GLYPHS):
        code = PUA_START + i
        rules.append(f".stack-icon--{name}::before {{ content: \"\\{code:x}\"; }}")

    CSS_OUT.write_text(
        "/* Resume tech-stack icon font. Rebuild: python3 scripts/build-stack-icons.py */\n\n"
        "@font-face {\n"
        "    font-family: StackIcons;\n"
        "    font-style: normal;\n"
        "    font-weight: 400;\n"
        "    font-display: block;\n"
        '    src: url("/fonts/stack-icons.woff2") format("woff2");\n'
        "    unicode-range: U+E001-E0FF;\n"
        "}\n\n"
        ".stack-icon {\n"
        "    font-family: StackIcons;\n"
        "    font-style: normal;\n"
        "    font-weight: 400;\n"
        "    font-variant: normal;\n"
        "    display: inline-block;\n"
        "    line-height: 1;\n"
        "    speak: never;\n"
        "    text-transform: none;\n"
        "    text-rendering: auto;\n"
        "    -webkit-font-smoothing: antialiased;\n"
        "    -moz-osx-font-smoothing: grayscale;\n"
        "}\n\n"
        + "\n".join(rules)
        + "\n"
    )
    print(f"Wrote {FONT_OUT.relative_to(ROOT)} ({FONT_OUT.stat().st_size} bytes)")
    print(f"Wrote {CSS_OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    build()
