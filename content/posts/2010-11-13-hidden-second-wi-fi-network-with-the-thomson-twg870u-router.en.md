---
title: Hidden second Wi-Fi network with the Thomson TWG870U router
date: 2010-11-13T10:01:00+00:00
layout: single
author_profile: true
url: 2010/11/13/hidden-second-wi-fi-network-with-the-thomson-twg870u-router/
image: /images/sites/3/2010/11/Thomson-TWG870U-router.jpg
tags:
  - Hardware
  - report
  - review
  - security
  - WiFi
lang: en
category: 
  - techblog
---
Righard Zwienenberg from Norman Security Center Blog posted something interesting, Thanks to Mr. Fagerlid for Sharing:

[<img class="size-medium wp-image-6523 alignright" alt="Thomson TWG870U router" src="/images/2010/11/Thomson-TWG870U-router-300x169.jpg" width="300" height="169" srcset="/images/sites/3/2010/11/Thomson-TWG870U-router-300x169.jpg 300w, /images/sites/3/2010/11/Thomson-TWG870U-router.jpg 386w" sizes="(max-width: 300px) 100vw, 300px" />](/images/2010/11/Thomson-TWG870U-router.jpg)There is some commotion in The Netherlands. Telecom/ISP provider UPC is providing its customers with the Thomson TWG870U router, a Docsis 3.0 router. On the [tweakers.net](http://gathering.tweakers.net/forum/list_message/34995564#34995564) forum (Dutch language), a user discovered that the router, which is also providing Wireless Access, has a second **hidden** wireless network. Problem here is that:

  * It is enabled by default when Wireless Access is enabled
  * You can not turn it off, unless you switch off all Wireless Access
  * The SSID, although not transmitted, is “UPC_Multimedia” and is present in all routers of this type.
  * This SSID can not be changed
  * The WPA encryption key can easily be obtained and is the same within all routers
  * The WPA encryption key can not be altered
  * Although you can not get to the modem control pages or to other computers in the network, you can reach internet.

The purpose of this hidden network is, according to UPC, to offer “new possibilities” in the future, without going into these “new possibilities”. The hidden network has been activated by accident when new firmware was rolled out. UPC is working on a “quick” fix which will be released tomorrow or in the weekend. This “quick” fix will deactivate the hidden network. Hopefully this fix will not raise other problems, which usually happens with “quick” fixes.

Needless to say is that with this information, you are open to the world. Not only can everyone use your router as a public access point, everyone can use your account to perform all kinds of cybercrime related actions.

Norman advises all users of the Thomson TWG870U router to disable the Wireless Access completely until the firmware that fixed this obvious security hole (or “new possibilities” feature) has been released.

Hmmm… I wonder if “Multiple SSID: yes” on page 4 of the [technical specifications](http://medialibrary.thomson.net/CommunsImagesEnLigne/Download/2904315_333_1_277_0-57B8C733CC60F533C9754CE109312DAC-2/DS_Technicolor_TWG870_2329561.pdf.PDF) of this router would have given it away…