---
title: Pwn2Own Interview with Charlie Miller
date: 2010-03-05T01:33:00+00:00
layout: single
author_profile: true
url: 2010/03/05/pwn2own-interview-with-charlie-miller/
tags:
  - Interview
lang: en
categories: 
  - techblog
---
Charlie Miller, the Pwn2Own contest winner for two years in a row, gives his take on Internet security. Guess what — your Mac OS is no less vulnerable than its Microsoft Windows counterpart.

> **Windows 7 or Snow Leopard**, which of these two commercial OS will be harder to hack and why?

> _Windows 7 is slightly more difficult because it has full ASLR (address space layout randomization) and a smaller attack surface (for example, no Java or Flash by default). Windows used to be much harder because it had full ASLR and DEP (data execution prevention). But recently, a talk at Black Hat DC showed how to get around these protections in a browser in Windows._

No operating system and browser is immune to an attack. And, Flash is the bane of security (well, one of it anyway).

> In your opinion, which is the **safer combination OS+browser** to use?

> _That's a good question. Chrome or IE8 on Windows 7 with no Flash installed. There probably isn't enough difference between the browsers to get worked up about. The main thing is not to install Flash!_

The interview was conducted by Matteo Campofiorito at OneITSecurity. You can read the full version [here](http://www.oneitsecurity.it/01/03/2010/interview-with-charlie-miller-pwn2own/).