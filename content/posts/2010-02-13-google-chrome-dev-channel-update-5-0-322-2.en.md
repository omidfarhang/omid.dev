---
title: "Google Chrome Dev Channel Update [5.0.322.2]"
date: 2010-02-13T20:32:00+00:00
layout: single
author_profile: true
url: 2010/02/13/google-chrome-dev-channel-update-5-0-322-2/
tags:
  - Firefox
  - Google
  - Google Chrome
  - Updates
lang: en
category: techblog
---
<div>
  <a href="http://1.bp.blogspot.com/_vaUVXcmC3OI/S3cFmkLNMsI/AAAAAAAAA8Y/EeWgQfQ8vd0/s1600-h/chromelogo.png" imageanchor="1"><img border="0" src="http://1.bp.blogspot.com/_vaUVXcmC3OI/S3cFmkLNMsI/AAAAAAAAA8Y/EeWgQfQ8vd0/s640/chromelogo.png" /></a>
</div>

The Google Chrome dev channel has been updated to 5.0.322.2 for Windows, Mac and Linux platforms

**All**

  * [<a href="http://src.chromium.org/viewvc/chrome?view=rev&#038;revision=38242" rel="nofollow" target="_blank">r38242</a>] Don't crash when a theme specifies a nonexistent image. (Issue: <a href="http://code.google.com/p/chromium/issues/detail?id=31719" rel="nofollow" target="_blank">31719</a>)

<div>
</div>

<div>
  <b>Mac</b>
</div>

  * [<a href="http://src.chromium.org/viewvc/chrome?view=rev&#038;revision=38319" rel="nofollow" target="_blank">r38319</a>] Honor modifiers for clicks on home button – cmd-clicking the home button now opens your home page in a new tab. (Issue: <a href="http://code.google.com/p/chromium/issues/detail?id=34900" rel="nofollow" target="_blank">34900</a>)
  * [<a href="http://src.chromium.org/viewvc/chrome?view=rev&#038;revision=38204" rel="nofollow" target="_blank" title="r38204">r38204</a>] Implemented writing direction context menu in text input fields.
  * [<a href="http://src.chromium.org/viewvc/chrome?view=rev&#038;revision=38504" rel="nofollow" target="_blank">r38504</a>] Add local storage nodes to the cookie manager (Issue: <a href="http://code.google.com/p/chromium/issues/detail?id=33068" rel="nofollow" target="_blank">33068</a>)

<div>
  <b>Linux</b>
</div>

  * [<a href="http://src.chromium.org/viewvc/chrome?view=rev&#038;revision=38320" rel="nofollow" target="_blank">r38320</a>] Use of Freetype's emboldening for fonts that don't provide bold. Fixes the sometimes blurry bold fonts. (Issue: <a href="http://code.google.com/p/chromium/issues/detail?id=22360" rel="nofollow" target="_blank">22360</a>)
  * [<a href="http://src.chromium.org/viewvc/chrome?view=rev&#038;revision=38372" rel="nofollow" target="_blank">r38372</a>] Can now drag and drop bookmarks from Firefox. (Issue: <a href="http://code.google.com/p/chromium/issues/detail?id=34141" rel="nofollow" target="_blank">34141</a>)
  * [<a href="http://src.chromium.org/viewvc/chrome?view=rev&#038;revision=38246" rel="nofollow" target="_blank">r38246</a>] Implement content blocking address bar icons and bubbles (Issue: <a href="http://code.google.com/p/chromium/issues/detail?id=33314" rel="nofollow" target="_blank">33314</a>)

<div>
  <b>Native Client</b>
</div>

<div>
</div>

  * Chrome for Linux and Mac OS 10.6 can now run <a href="http://code.google.com/p/nativeclient/" target="_blank">Native Client</a> modules directly, no plugin required. To enable this features, run Chrome with the following command line flags _&#8211;internal-nacl &#8211;enable-gpu-plugin &#8211;no-sandbox_.
  *      <a href="https://wiki.mozilla.org/Plugins:PlatformIndependentNPAPI" target="_blank">Platform-independent NPAPI</a> extensions for 2D, 3D, and mouse/keyboard events are now available.
  * We'd like to hear from you. Please send feedback to <a href="mailto:native-client-discuss@googlegroups.com" target="_blank">native-client-discuss@googlegroups.com</a>,

<div>
  <b>Extensions</b>
</div>

  * [<a href="http://src.chromium.org/viewvc/chrome?view=rev&#038;revision=38239" rel="nofollow" target="_blank">r38239</a>] Don't crash when extensions use cookie. (Issue: <a href="http://code.google.com/p/chromium/issues/detail?id=34649" rel="nofollow" target="_blank">34649</a>)
  * [<a href="http://src.chromium.org/viewvc/chrome?view=rev&#038;revision=38407" rel="nofollow" target="_blank">r38407</a>] Preserve order of browser actions across extension autoupdate. (Issue: <a href="http://code.google.com/p/chromium/issues/detail?id=33401" rel="nofollow" target="_blank">33401</a>)
  * Implemented overflow and reordering of browser actions (this was actually in the last update, but missed the release notes)

<div>
  <b>Known Issues</b>
</div>

  * Linux: Crash when editing a bookmark in the bookmark manager** **(Issue: <a href="http://code.google.com/p/chromium/issues/detail?id=35438" target="_blank" title="35438">35438</a>)
  * All: Chrome doesn't show popup blocker bubble (Issue: <a href="http://code.google.com/p/chromium/issues/detail?id=35594" target="_blank">35594</a>)
  * Mac/Linux: Can't save cookie settings (Issue: <a href="http://code.google.com/p/chromium/issues/detail?id=35307" target="_blank">35307</a>)

<div>
</div>

<div>
  More details about additional changes are available in the svn <a href="http://build.chromium.org/buildbot/perf/dashboard/ui/changelog.html?url=/trunk/src&#038;range=38504:38070&#038;mode=html" target="_blank" title="log of all revision">log of all revisions.</a></p> 
  
  <p>
    You can find out about getting on the Dev channel here: <a href="http://dev.chromium.org/getting-involved/dev-channel" target="_blank">http://dev.chromium.org/getting-involved/dev-channel</a>.
  </p>
  
  <p>
    If you find new issues, please let them know by filing a bug at <a href="http://code.google.com/p/chromium/issues/entry" target="_blank">http://code.google.com/p/chromium/issues/entry</a> </div>