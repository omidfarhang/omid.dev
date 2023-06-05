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
categories: 
  - techblog
---
[![](http://1.bp.blogspot.com/_vaUVXcmC3OI/S3cFmkLNMsI/AAAAAAAAA8Y/EeWgQfQ8vd0/s640/chromelogo.png)](http://1.bp.blogspot.com/_vaUVXcmC3OI/S3cFmkLNMsI/AAAAAAAAA8Y/EeWgQfQ8vd0/s1600-h/chromelogo.png)

The Google Chrome dev channel has been updated to 5.0.322.2 for Windows, Mac and Linux platforms

**All**

  * \[[r38242](http://src.chromium.org/viewvc/chrome?view=rev&revision=38242)\] Don't crash when a theme specifies a nonexistent image. (Issue: [31719](http://code.google.com/p/chromium/issues/detail?id=31719))

**Mac**

  * \[[r38319](http://src.chromium.org/viewvc/chrome?view=rev&revision=38319)\] Honor modifiers for clicks on home button – cmd-clicking the home button now opens your home page in a new tab. (Issue: [34900](http://code.google.com/p/chromium/issues/detail?id=34900))
  * \[[r38204](http://src.chromium.org/viewvc/chrome?view=rev&revision=38204 "r38204")\] Implemented writing direction context menu in text input fields.
  * \[[r38504](http://src.chromium.org/viewvc/chrome?view=rev&revision=38504)\] Add local storage nodes to the cookie manager (Issue: [33068](http://code.google.com/p/chromium/issues/detail?id=33068))

**Linux**

  * \[[r38320](http://src.chromium.org/viewvc/chrome?view=rev&revision=38320)\] Use of Freetype's emboldening for fonts that don't provide bold. Fixes the sometimes blurry bold fonts. (Issue: [22360](http://code.google.com/p/chromium/issues/detail?id=22360))
  * \[[r38372](http://src.chromium.org/viewvc/chrome?view=rev&revision=38372)\] Can now drag and drop bookmarks from Firefox. (Issue: [34141](http://code.google.com/p/chromium/issues/detail?id=34141))
  * \[[r38246](http://src.chromium.org/viewvc/chrome?view=rev&revision=38246)\] Implement content blocking address bar icons and bubbles (Issue: [33314](http://code.google.com/p/chromium/issues/detail?id=33314))

**Native Client**

* Chrome for Linux and Mac OS 10.6 can now run [Native Client](http://code.google.com/p/nativeclient/) modules directly, no plugin required. To enable this features, run Chrome with the following command line flags _–internal-nacl –enable-gpu-plugin –no-sandbox_.
* [Platform-independent NPAPI](https://wiki.mozilla.org/Plugins:PlatformIndependentNPAPI) extensions for 2D, 3D, and mouse/keyboard events are now available.
* We'd like to hear from you. Please send feedback to [native-client-discuss@googlegroups.com](mailto:native-client-discuss@googlegroups.com),

**Extensions**

* \[[r38239](http://src.chromium.org/viewvc/chrome?view=rev&revision=38239)\] Don't crash when extensions use cookie. (Issue: [34649](http://code.google.com/p/chromium/issues/detail?id=34649)) 
* \[[r38407](http://src.chromium.org/viewvc/chrome?view=rev&revision=38407)\] Preserve order of browser actions across extension autoupdate. (Issue: [33401](http://code.google.com/p/chromium/issues/detail?id=33401)) 
* Implemented overflow and reordering of browser actions (this was actually in the last update, but missed the release notes)

**Known Issues**

* Linux: Crash when editing a bookmark in the bookmark manager (Issue: [35438](http://code.google.com/p/chromium/issues/detail?id=35438 "35438"))
* All: Chrome doesn't show popup blocker bubble (Issue: [35594](http://code.google.com/p/chromium/issues/detail?id=35594))
* Mac/Linux: Can't save cookie settings (Issue: [35307](http://code.google.com/p/chromium/issues/detail?id=35307))


More details about additional changes are available in the svn [log of all revisions.](http://build.chromium.org/buildbot/perf/dashboard/ui/changelog.html?url=/trunk/src&range=38504:38070&mode=html "log of all revision")

You can find out about getting on the Dev channel here: [http://dev.chromium.org/getting-involved/dev-channel](http://dev.chromium.org/getting-involved/dev-channel).

If you find new issues, please let them know by filing a bug at [http://code.google.com/p/chromium/issues/entry](http://code.google.com/p/chromium/issues/entry)