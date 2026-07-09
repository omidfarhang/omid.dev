---
title: "Why I Started Adding Full Source Code to My Blog Posts"
date: 2026-06-01T01:41:00+03:30
description: "A short note about the companion example-projects repository for omid.dev, where suitable technical posts now include runnable examples or complete focused snippets."
layout: single
author_profile: true
shortlink: https://g.omid.dev/uqqWXYO
x_link: https://x.com/omidfarhang/status/2061213089941614971
mastodon_link: https://mastodon.social/@omidfarhang/116671546084060260
bluesky_link: https://bsky.app/profile/omid.dev/post/3mn6mfzlv3c23
linkedin_link: https://www.linkedin.com/posts/omidfarhang_why-i-started-adding-full-source-code-to-share-7466979043054379008-y7jw/
url: 2026/06/01/why-i-started-adding-full-source-code-to-my-blog-posts/
tags:
  - Tech Blogging
  - Source Code
  - Web Development
  - Frontend
  - Open Source
categories:
  - TechBlog
---
One thing I have always found frustrating in technical writing is the gap between a nice explanation and code you can actually explore.

A post can explain an idea clearly, but if the code is only a few isolated snippets, the reader still has to imagine the project around it. Where does this file live? What package versions were used? How do the pieces connect? Can I run it, or is it only illustrative?

That is why I started collecting companion source code for suitable posts in a separate repository:

{{< companion
  repo="omidfarhang/example-projects"
  path="."
  title="Companion Source Code"
  description="Browse runnable examples and focused snippets that support posts on omid.dev. Browser-only projects are also published as live demos on playground.omid.dev."
  display="github.com/omidfarhang/example-projects"
  demoUrl="https://playground.omid.dev/"
  demoLabel="Open live demos"
  label="Open the repository"
>}}

## Why a Separate Repository?

Blog posts are good at explaining the path through an idea. Repositories are better at showing the full shape of an implementation.

Keeping the examples in `example-projects` gives each article room to breathe. The post can stay readable, while the repository can include the parts that would be too noisy inside an article: project structure, package files, setup instructions, build scripts, API servers, WebAssembly steps, Firebase notes, or whatever the example needs.

It also makes the examples easier to revisit. If a post links to a real project, I can update the code when dependencies move, add missing instructions, or fix mistakes without turning the article into a wall of setup details.

## Not Every Post Needs a Full App

This is not an attempt to turn every blog post into a production-grade sample application.

Some topics deserve a runnable project because the value is in seeing multiple pieces work together. A micro frontend article, for example, is much easier to understand when you can inspect the shell app, the Angular piece, the React piece, and the build flow.

Other topics are better served by complete focused snippets. If the subject is a TypeScript type pattern, an Angular dependency injection technique, or a small browser API example, a full application may add more noise than clarity.

So the repository is intentionally mixed:

- some examples are runnable projects;
- some examples are small but complete code samples;
- some examples are multi-app demos;
- some examples need extra setup, such as Firebase, Rust, Python, or a local API server.

The common goal is not size. The common goal is usefulness.

## Live Demos For Browser-Only Examples

For companions that can run entirely in the browser, I also publish live demos at [playground.omid.dev](https://playground.omid.dev/). That gives readers a faster path than cloning first: open the demo, interact with it, then read the article for the reasoning behind the implementation.

Demos that need Firebase, a local API server, native Linux tooling, or other non-browser setup stay source-only in the repository for now.

## What I Want Readers to Be Able to Do

When a post has companion source code, I want readers to be able to move beyond passive reading:

1. Open the live demo when one exists.
2. Clone the example.
3. Run it locally when it is meant to be runnable.
4. Inspect the project structure.
5. Change something and see what happens.
6. Reuse the idea in their own project with fewer missing pieces.

That last point matters most to me. Technical writing should help someone build a better mental model, but code often does that faster than another paragraph can.

## The Tradeoff

There is a maintenance cost.

Dependencies age. Framework APIs change. Local setup steps break. A working example from last year can become confusing if it is not cared for.

But I still think the tradeoff is worth it. A broken example can be fixed. A vague example is harder to rescue because it never gave the reader enough structure in the first place.

This does not mean every article will have companion code. It means that when source code would genuinely make the post more useful, I want it to be available as something real enough to inspect, run, and adapt.

## A Small Invitation

If you are reading a post on this site and it links to `example-projects`, treat the code as part of the article.

Open it. Break it. Change it. Compare it with the explanation. And if something no longer works or no longer matches the post, issues and pull requests are welcome.

That is the direction I want this blog to move in: fewer isolated fragments when a full example would teach better, and more practical source code where it actually helps.
