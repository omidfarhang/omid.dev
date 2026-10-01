#!/usr/bin/env python3
"""Mirror example-projects/playground/manifest.json into data/playground.yaml."""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_MANIFEST = (
    Path(os.environ.get("EXAMPLE_PROJECTS_ROOT", ROOT.parent / "example-projects"))
    / "playground"
    / "manifest.json"
)
OUT = ROOT / "data" / "playground.yaml"


def slim_example(entry: dict) -> dict:
    out = {
        "slug": entry["slug"],
        "title": entry["title"],
        "description": entry["description"],
        "type": entry.get("type"),
        "sourcePath": entry.get("sourcePath") or entry.get("projectDir"),
    }
    if entry.get("articleTitle"):
        out["articleTitle"] = entry["articleTitle"]
    if entry.get("articleUrl"):
        out["articleUrl"] = entry["articleUrl"]
    if entry.get("articles"):
        out["articles"] = [
            {
                "label": a.get("label"),
                "title": a.get("title"),
                "url": a["url"],
            }
            for a in entry["articles"]
        ]
    return out


def slim_lab(entry: dict) -> dict:
    out = {
        "slug": entry["slug"],
        "title": entry["title"],
        "description": entry["description"],
        "type": entry.get("type"),
        "kind": entry.get("kind", "lab"),
        "sourcePath": entry.get("sourcePath") or entry.get("projectDir"),
    }
    if entry.get("articleTitle"):
        out["articleTitle"] = entry["articleTitle"]
    if entry.get("techBlogUrl"):
        out["techBlogUrl"] = entry["techBlogUrl"]
    if entry.get("articleUrl"):
        out["articleUrl"] = entry["articleUrl"]
    return out


def slim_source(entry: dict) -> dict:
    out = {
        "slug": entry["slug"],
        "title": entry["title"],
        "description": entry["description"],
        "sourcePath": entry["sourcePath"],
        "reason": entry.get("reason"),
    }
    if entry.get("articleTitle"):
        out["articleTitle"] = entry["articleTitle"]
    if entry.get("articleUrl"):
        out["articleUrl"] = entry["articleUrl"]
    return out


def dump_scalar(value) -> str:
    if value is None:
        return "null"
    text = str(value)
    if any(c in text for c in ":#{}[]&*!|>'\"%@`") or text != text.strip() or "\n" in text:
        return json.dumps(text, ensure_ascii=False)
    return text


def dump_obj(obj: dict, indent: int = 0) -> str:
    lines: list[str] = []
    pad = "  " * indent
    for key, value in obj.items():
        if isinstance(value, list):
            lines.append(f"{pad}{key}:")
            for item in value:
                if isinstance(item, dict):
                    first = True
                    for ik, iv in item.items():
                        if first:
                            if isinstance(iv, list):
                                lines.append(f"{pad}- {ik}:")
                                for sub in iv:
                                    if isinstance(sub, dict):
                                        sf = True
                                        for sk, sv in sub.items():
                                            if sf:
                                                lines.append(f"{pad}  - {sk}: {dump_scalar(sv)}")
                                                sf = False
                                            else:
                                                lines.append(f"{pad}    {sk}: {dump_scalar(sv)}")
                                    else:
                                        lines.append(f"{pad}  - {dump_scalar(sub)}")
                            else:
                                lines.append(f"{pad}- {ik}: {dump_scalar(iv)}")
                            first = False
                        else:
                            if isinstance(iv, list):
                                lines.append(f"{pad}  {ik}:")
                                for sub in iv:
                                    if isinstance(sub, dict):
                                        sf = True
                                        for sk, sv in sub.items():
                                            if sf:
                                                lines.append(f"{pad}  - {sk}: {dump_scalar(sv)}")
                                                sf = False
                                            else:
                                                lines.append(f"{pad}    {sk}: {dump_scalar(sv)}")
                                    else:
                                        lines.append(f"{pad}  - {dump_scalar(sub)}")
                            else:
                                lines.append(f"{pad}  {ik}: {dump_scalar(iv)}")
                else:
                    lines.append(f"{pad}- {dump_scalar(item)}")
        else:
            lines.append(f"{pad}{key}: {dump_scalar(value)}")
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--manifest",
        type=Path,
        default=DEFAULT_MANIFEST,
        help="Path to example-projects playground/manifest.json",
    )
    parser.add_argument(
        "--out",
        type=Path,
        default=OUT,
        help="Output YAML path (default: data/playground.yaml)",
    )
    args = parser.parse_args()

    if not args.manifest.is_file():
        print(f"manifest not found: {args.manifest}", file=sys.stderr)
        print(
            "Set EXAMPLE_PROJECTS_ROOT or pass --manifest to the sibling repo.",
            file=sys.stderr,
        )
        return 1

    manifest = json.loads(args.manifest.read_text(encoding="utf-8"))
    data = {
        "labs": [slim_lab(x) for x in manifest.get("categories", {}).get("labs", [])],
        "examples": [
            slim_example(x) for x in manifest.get("categories", {}).get("examples", [])
        ],
        "sourceOnly": [slim_source(x) for x in manifest.get("sourceOnly", [])],
    }

    header = (
        "# Mirrored from example-projects/playground/manifest.json — "
        "refresh with scripts/sync-playground-data.py\n"
    )
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(header + dump_obj(data) + "\n", encoding="utf-8")
    print(
        f"Wrote {args.out.relative_to(ROOT)} "
        f"(labs={len(data['labs'])} examples={len(data['examples'])} "
        f"sourceOnly={len(data['sourceOnly'])})"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
