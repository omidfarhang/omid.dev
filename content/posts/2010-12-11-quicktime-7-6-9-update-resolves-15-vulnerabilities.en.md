---
title: QuickTime 7.6.9 update resolves 15 vulnerabilities
date: 2010-12-11T00:19:00+00:00
layout: single
author_profile: true
url: 2010/12/11/quicktime-7-6-9-update-resolves-15-vulnerabilities/
tags:
  - Apple
  - QuickTime
  - security
  - software
  - Updates
  - Vulnerability
lang: en
category: 
  - techblog
---
[<img title="quicktime-logo" border="0" alt="quicktime-logo" align="right" src="http://lh6.ggpht.com/_vaUVXcmC3OI/TQK7vKoPlCI/AAAAAAAADfc/Yc6_b0RHhEw/quicktime-logo_thumb%5B2%5D.gif?imgmax=800" width="150" height="150" />](http://lh5.ggpht.com/_vaUVXcmC3OI/TQK7tGC6H9I/AAAAAAAADfY/DLguus5VXOw/s1600-h/quicktime-logo%5B4%5D.gif)This week Apple announced the availability of QuickTime 7.6.9 for OS X 10.5 and Windows platforms. This release fixes 13 vulnerabilities in QuickTime for OS X Leopard and 15 vulnerabilities on the Windows platform. Keep in mind that if you use iTunes it requires that you install QuickTime as well, so be sure to check for updates.

Apple has provided a direct download link for IT folks at <http://www.apple.com/quicktime/download/>. All 13 vulnerabilities for OS X can cause unexpected application termination (what you and I call a crash, but you can't say crash on a Mac) or arbitrary code execution (make QuickTime run programs… BAD).

Strangely if you go to Apple's download page, as you can see in the image above, the iTunes bundle will still install an outdated version of QuickTime. The best method for updating QuickTime for OS X Leopard (10.5) computers is to click the fruit logo in the upper-left corner and choose Software Update. Windows users can choose Apple Software Update from the Start menu, or launch QuickTime and check for updates under the Help menu.

[<img title="qtapplesoftupdate450" border="0" alt="qtapplesoftupdate450" src="http://lh4.ggpht.com/_vaUVXcmC3OI/TQK8ciiznAI/AAAAAAAADfk/n8UaCXb0oMk/qtapplesoftupdate450_thumb%5B2%5D.png?imgmax=800" width="450" height="239" />](http://lh5.ggpht.com/_vaUVXcmC3OI/TQK7y5L_dwI/AAAAAAAADfg/5O8VAx8WFZg/s1600-h/qtapplesoftupdate450%5B4%5D.png)

So if you run Windows or Leopard and install the updates you are now protected against these new flaws… What about Snow Leopard? Mum's the word so far, as QuickTime is integrated into OS X Snow Leopard and is not a separate component. I checked the last OS update from Apple and these CVEs are not patched, which leads me to believe Snow Leopard users are at risk from these flaws for now. Theoretically these CVEs could impact iPhone/iPad/iPod Touch users too, as QuickTime is a central piece of Apple's multimedia strategy.

If you are a Snow Leopard user, be cautious of AVIs, JPGs, MPG/MPEGs, MOVs and other content types of dubious origin. Unfortunately, this further demonstrates Apple's scattered security strategy: unannounced random updates for random platforms that leave windows of opportunity for those intent on compromising their devices. Everyone else should patch as soon as possible.