---
date: 2026-06-04T18:23:52+03:30
url: notes/178198821289246380/
---
Spent way too long debugging a “broken CLI tool” in Cursor…
Turned out it wasn’t broken — it was Snap.
Wrapper-based installs (like Snap) can quietly change how CLI tools behave inside IDE agents and scripts.
Switched to a native package. Problem disappeared instantly.
