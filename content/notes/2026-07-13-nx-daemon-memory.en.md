---
date: 2026-07-13T00:58:30+03:30
url: notes/178389171074684451/
source: https://nx.dev/blog/nx-23-release
---
[Nx 23 is out](https://nx.dev/blog/nx-23-release), and buried in the performance section is the line that made me nod hardest: the daemon's memory footprint on their own repo dropped from around 1.5GB to roughly 200MB — about a 7× reduction.

I felt that old number. Swap thrashing, fans spinning up for no good reason, just because Nx was sitting there. That pain has quietly gone away over the recent 22.x releases, and I only noticed how bad it was once it stopped.

Good. Keep going.
