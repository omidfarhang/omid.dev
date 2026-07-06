---
title: From FrontPage to Hand-Written HTML
date: 2004-11-02T14:45:00+00:00
description: Microsoft FrontPage and CoffeeCup make early web publishing easy, but learning clean HTML still pays off.
layout: single
author_profile: true
url: 2004/11/02/from-frontpage-to-hand-written-html/
tags:
  - Web Development
  - HTML
  - FrontPage
  - CoffeeCup

categories:
  - TechBlog
---
My first websites did not start in a text editor. They started with **Microsoft FrontPage 2003**, **CoffeeCup HTML Editor**, and a lot of trial and error in Internet Explorer 6. That was normal in the early 2000s: visual editors lowered the barrier, and the web was still small enough that a personal page or a company brochure site could ship in a weekend.

Here in late 2004, the tools are better — but the habits matter more than the brand on the box.

## What Visual Editors Get Right

FrontPage and similar tools are great for:

- Learning how pages are structured without memorizing every tag
- Prototyping layouts quickly for a client meeting
- Managing simple sites without a build pipeline
- Publishing through FTP without touching the command line

If you just need a contact page, a photo gallery, and a download link, a WYSIWYG editor is honest work. Nobody should feel guilty for using one to get online.

## Where They Hurt You

The same tools often produce:

- Bloated HTML full of nested tables and spacer GIFs
- Inline font tags instead of reusable CSS
- FrontPage-specific markup that other browsers render differently
- Hard-to-maintain sites after the first redesign

If you only edit visually, every redesign feels like archaeology. You click around until something looks right, publish, and hope you never have to change the header on all twelve pages again.

## The Browser Picture in Late 2004

**Internet Explorer 6** still dominates. Most office desktops run it, and many intranet apps assume it. But alternative browsers are no longer a curiosity. **Mozilla Firefox** is close to a 1.0 release — the preview builds have already passed eight million downloads — and that alone is a reason to stop treating IE quirks as architecture.

Practical testing today means:

- Validate HTML occasionally with the W3C validator
- Avoid IE-only JavaScript unless you have no choice
- Keep navigation and forms working without scripts
- Compress images instead of relying on transparent spacer GIFs for layout

## Learning HTML on Purpose

You do not need to abandon FrontPage. You need to read what it generates:

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
  "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
  <title>Company Services</title>
  <link rel="stylesheet" type="text/css" href="main.css">
</head>
<body>
  <h1>Services</h1>
  <p>Clear structure now means easier redesign later.
</body>
</html>
```

Even a small move toward semantic markup and external CSS makes sites easier to update. A single `main.css` file beats hunting through forty pages for inline `font color` attributes.

## FrontPage Server Extensions and Hosting Lock-In

Many cheap hosts still push **FrontPage Server Extensions**. They enable shared borders, web components, and publish-from-the-editor workflows. They also tie you to specific hosting configurations and older server software.

If you can avoid them:

- Use plain FTP or SFTP where available
- Keep templates as separate include files or copy-paste regions you control
- Back up the entire site locally before every publish

Publishing directly to production without a local copy is how one wrong click turns into a long night.

## A Practical Workflow

1. Sketch the page on paper — yes, paper still works
2. Build structure in HTML first, even if you paste it into FrontPage afterward
3. Style with CSS second; resist the font dialog for every paragraph
4. Use the visual editor for speed on content blocks, not for page architecture
5. View source often — that is where you actually learn

## Cleaning Up an Existing Site

If your site is already table-heavy, do not rewrite everything at once:

1. Move global styles out of inline attributes into one CSS file
2. Convert the header and footer first — they repeat on every page
3. Keep old pages working while you clean new sections
4. Test each changed page in IE6 and at least one other browser

Incremental cleanup is slower to start and much faster to finish.

## Where I Land

FrontPage and CoffeeCup are bridges, not destinations. They help you publish early. Hand-written HTML and CSS help you publish well.

If you are building your first site now, use the tools — but read the code they generate. That habit pays off the first time a client asks for a redesign and you do not have to rebuild from scratch.
