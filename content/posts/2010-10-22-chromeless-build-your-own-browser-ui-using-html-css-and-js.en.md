---
title: "Chromeless: Build your own Browser UI using HTML, CSS and JS"
date: 2010-10-22T00:22:00+00:00
layout: single
author_profile: true
url: 2010/10/22/chromeless-build-your-own-browser-ui-using-html-css-and-js/
tags:
  - Announcement
  - Mozilla
lang: en
category: techblog
---
### Mozilla Labs:

**The “Chromeless” project experiments with the idea of removing the current browser user interface and replacing it with a flexible platform which allows for the creation of new browser UI using standard Web technologies such as HTML, CSS and JavaScript.**

#### Introduction

Have you ever had an idea to improve the user interface of your browser? Have you ever actually gone and tried to make that idea a reality? If you have, you would have probably used technologies like [XUL](https://developer.mozilla.org/En/XUL) and [XPCOM](https://developer.mozilla.org/en/XPCOM). Much of the user interface (browser chrome) of Firefox is implemented in XUL, which uses a lot of Web-based technologies such as the DOM and JavaScript. Firefox is put together in a way that seasoned developers are able implement features with amazing efficiency, but at the same time, the browser interface in XUL represents a barrier for potential contributors. What if the parts of the browser that are most interesting to contributors were implemented in standard Web technologies such as HTML, CSS and JavaScript? What kinds of wild-eyed experimentation would we see if a new conception of browser UI could be prototyped in about the same time it takes to write a web page?

It’s questions like these that have motivated us to start a new Mozilla Labs experiment, codenamed “chromeless”. We intend to create an experimental toolkit which will allow developers to build their own Web browser using standard Web technologies: HTML, CSS, and JavaScript. The following screenshot is an example of a very simple browser application with page thumbnails used for tab handlers:

[<img title="chromeless" border="0" alt="chromeless" src="http://lh3.ggpht.com/_vaUVXcmC3OI/TMDSHS91wSI/AAAAAAAAC2Q/VTGiJXHw3OI/chromeless_thumb%5B1%5D.jpg?imgmax=800" width="304" height="238" />](http://lh5.ggpht.com/_vaUVXcmC3OI/TMDSEMZwiDI/AAAAAAAAC2M/0oaHSoS1x_4/s1600-h/chromeless%5B3%5D.jpg)

#### Overview

This is a functional application written in HTML running on a pre-alpha version of the chromeless platform: the inner browser elements are iframes instead of XUL browser elements. It serves to illustrate the general idea of the project and does not yet provide proper sandboxing (among other things) — and plenty of details on the state of implementation are available in the form of annotations in the source code.

The [current implementation](http://github.com/mozilla/chromeless) is a remix of [Atul Varma’s Cuddlefish Lab](http://hg.mozilla.org/users/avarma_mozilla.com/atul-packages/file/793c25db8523/packages/cuddlefish-lab) and the [Jetpack SDK](http://hg.mozilla.org/labs/jetpack-sdk/), combined with[XULRunner](https://developer.mozilla.org/en/xulrunner). Leveraging these existing Mozilla technologies made it possible for us to quickly get to a point where we could launch a XULRunner based application that is a blank canvas — _chromeless_.

Instead of loading XUL, the application’s main execution point is an HTML file. This page is granted extra privileges (i.e., it can access CommonJS modules made available by the Jetpack platform). Our goal is to expose the basic functionality required to write a browser to this HTML entry point, via CommonJS modules and as lightweight conventions on top of the DOM. For example, the HTML author might interact with an “application” interface module in order to set the labels and handlers for OS-specific window menus, or to invoke an OS-specific notification mechanism. The title of the HTML document might be the name of the running process. The height and width of the document may be linked to the size of the main application’s window. The following diagram shows a high level visualization of this “chromeless toolkit”

[<img title="chromeless1" border="0" alt="chromeless1" src="http://lh5.ggpht.com/_vaUVXcmC3OI/TMDSTe3f67I/AAAAAAAAC2Y/ZYhv6JFS4nY/chromeless1_thumb%5B1%5D.jpg?imgmax=800" width="304" height="252" />](http://lh6.ggpht.com/_vaUVXcmC3OI/TMDSLPzBNXI/AAAAAAAAC2U/E4_97pKdFZs/s1600-h/chromeless1%5B3%5D.jpg)

#### Where are We Now?

Currently we have a functional pre-alpha prototype that is capable of loading an HTML page and rendering browser UI. In the coming months we will add specific APIs to allow for more meaningful browser construction. We’ll investigate how we can integrate security features to keep Web content in a minimally privileged sandbox. Finally, we aim to wrap this exploration up into an accessible SDK to make it easy to get started with remixing the browser.

#### Get Involved

If you want to experiment with this project, please note that its current state is experimental and that things are often changing. You can get the source code and instructions at <http://github.com/mozilla/chromeless>. Your input is much appreciated – please leave your feedback here, join the [Mozilla Labs Group](http://groups.google.com/group/mozilla-labs) or get in touch with us at #labs on [irc.mozilla.org](http://irc.mozilla.org/). And stay tuned – we will share more as the project unfolds.