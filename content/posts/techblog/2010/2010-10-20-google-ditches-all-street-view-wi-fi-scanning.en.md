---
title: Google ditches all Street View Wi-Fi scanning
date: 2010-10-20T12:49:00+00:00
layout: single
author_profile: true
url: 2010/10/20/google-ditches-all-street-view-wi-fi-scanning/
tags:
  - Google
  - Google privacy
  - news
  - privacy
  - StreetView
  - WiFi
lang: en
categories: 
  - TechBlog
---
[<img title="GoogleWiFi" border="0" alt="GoogleWiFi" align="right" src="http://lh3.ggpht.com/_vaUVXcmC3OI/TL7eS-1pEzI/AAAAAAAACyI/PT4zfOk_N4w/GoogleWiFi_thumb%5B1%5D.jpg?imgmax=800" width="188" height="142" />](http://lh5.ggpht.com/_vaUVXcmC3OI/TL7eRHeWY-I/AAAAAAAACyE/TrjozHFk5js/s1600-h/GoogleWiFi%5B3%5D.jpg)Google has no plans to resume using its Street View cars to collect information about the location of Wi-Fi networks, a practice that led to a flurry of privacy probes after the company said it unintentionally captured fragments of unencrypted data.

The disclosure appeared in a [report](http://www.priv.gc.ca/media/nr-c/2010/let_101019_e.cfm) on Street View released today by Canadian privacy commissioner Jennifer Stoddart, who said that “collection is discontinued and Google has no plans to resume it.” Assembling an extensive list of the location of Wi-Fi access points can aid in geolocation, especially in areas where connections to cell towers are unreliable.

Instead, Stoddart said that, based on her conversations with headquarters in Mountain View, Ca., “Google intends to obtain the information needed to populate its location-based services database” from “users' handsets.”

That, at least, should come as no surprise. Mobile phone and laptop users who run certain Google applications already share their location information with the company, which then uses this crowdsourced data to refine its mapping capabilities.

When Google Maps Navigation users requests a location fix with the “use wireless networks” option checked in their settings, their device sends over a list of all nearby addresses associated with wireless hot spots, which can in turn be checked against Google's existing database of those addresses gathered through the Street View project. Google has said it doesn't collect information about laptops or other mobile devices–both for privacy reasons and because the locations are typically transitory.

Google's PC software takes a similar approach. A note in the [source code](http://src.chromium.org/svn/trunk/src/chrome/browser/geolocation/wifi_data_provider_mac.cc) of Google's open-source Chromium browser, which shares code with Google Chrome, says “currently we get only MAC address, signal strength, channel signal-to-noise and SSID” for each Wi-Fi network surveyed. (The MAC address is unique for each wireless access point, and the SSID is the user-given name for the wireless network.)

Google discloses this behavior to its customers. Its [privacy policy](http://www.google.com/mobile/privacy.html) for mobile devices says: “If you use location-enabled products and services, such as Google Maps for mobile, you may be sending us location information.” On the other hand, if you opt out of data-sharing, don't count on being able to use Wi-Fi hot spots for triangulation.

“With Android, location-sharing is opt-in,” Google spokeswoman Christine Chen said today. “Whether we're talking about location provider services or individual apps that use location, Android provides users with notice and control over collection of location, sharing of location and use of location to help provide a better mobile experience…We don't share individual location collected from user devices with any applications or services.”

Google had said in a [blog post](http://google-latlong.blogspot.com/2010/07/street-view-driving-update.html) in July that it had halted Wi-Fi data collection through its Street View cars, but had not said whether it would be resumed or not.

Here are [instructions](http://www.google.com/support/mobile/bin/answer.py?hl=en&answer=81875) for mobile users on how to disable this feature.

_Taken From Cnet_