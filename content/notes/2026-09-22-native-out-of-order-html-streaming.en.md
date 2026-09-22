---
date: 2026-09-22T18:10:00+03:30
url: notes/179008801845929901/
source: https://www.infoq.com/news/2026/09/native-deferred-html-streaming/
---
[InfoQ](https://www.infoq.com/news/2026/09/native-deferred-html-streaming/) covers what Chrome/Edge 150 are shipping: declarative out-of-order HTML streaming — placeholders first, later chunks patch them in, without a framework-owned DOM move script. Safari and Firefox have signaled interest; the JS streaming DOM APIs are still catching up.

The interesting part is not a new spinner API. BigPipe, React Suspense streaming, and Next-style shells all solved the same problem in different dialects: do not let a slow island block the whole document. When that patching lives in the HTML parser, frameworks can converge on a browser primitive instead of inventing another wire protocol.

I am not rewriting delivery for this yet — limited availability, and Angular SSR still has its own hydration story. Worth watching as platform gravity, same class of move as View Transitions: patterns leave the framework and land in the engine.
