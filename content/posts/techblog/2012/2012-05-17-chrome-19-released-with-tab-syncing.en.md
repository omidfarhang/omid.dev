---
title: Chrome 19 released with tab syncing
date: 2012-05-17T15:17:00+00:00
layout: single
author_profile: true
url: 2012/05/17/chrome-19-released-with-tab-syncing/
tags:
  - Browser
  - Google
  - Google Chrome
  - software
  - Updates
lang: en
categories: 
  - TechBlog
---
[<img title="new-chrome-logo" border="0" alt="new-chrome-logo" align="right" src="http://lh4.ggpht.com/-DYC2GnWOiLA/T7UPhTnZ6ZI/AAAAAAAAGAQ/fODRobza5MQ/new-chrome-logo_thumb.png?imgmax=800" width="128" height="125" />](http://lh5.ggpht.com/-P3oogfN-m3Q/T7UPfHlj5HI/AAAAAAAAGAI/0-nd-5EAC5E/s1600-h/new-chrome-logo%25255B2%25255D.png)The H-Online: Google has [announced](http://chrome.blogspot.co.uk/2012/05/keeping-tabs-on-your-tabs.html) that Chrome 19 is the new stable version of its open source based web browser. As usual, the browser sees a number of [security fixes](http://googlechromereleases.blogspot.co.uk/2012/05/stable-channel-update.html): this time there are seven high-severity fixes specifically for Chrome including various use-after-free and out-of-bounds errors. Two fixes with a wider impact than Chrome are also mentioned – a workaround for a Linux NVIDIA driver bug and an “off-by-one out-of-bounds” write in libxml. In all, $7500 was paid out in rewards to security researchers, and Google notes it has also paid out $9000 to researchers to stamp out bugs before they reached its stable channel. 

There is only one major new feature in Chrome 19: support for synchronizing tabs between Chrome running on different systems signed in as the same Google user. To access the synchronized tabs, open a new tab and at the bottom of the new tab display is a menu item for “Other Devices” – selecting this displays the various devices and the tabs they have open. This tab synchronization also works with the current [Chrome Android Beta,](http://www.google.com/intl/en/chrome/android/) offering an alternative to the [Chrome2Phone](https://chrome.google.com/webstore/detail/oadboiipflhobonjjffjbfekfjcgkhco) extension as a way to exchange URLs between desktop and mobile Chrome. Although the functionality for tab synchronization is already in the stable version, Google will only be gradually rolling out the supporting service over the next few weeks. 

Google has also included an experimental version of Web Intents in the new stable version of Chrome. [Web Intents](http://webintents.org/) are designed as a mechanism to allow web applications to work together without having explicit knowledge of the other web applications. Google has been working with Mozilla and at the W3C to develop a specification for the process. Services can register Intents to handle particular tasks. When a web application wishes to perform one of these tasks, with Web Intents it can query the browser to find an appropriate service and then call on that. 

The [announcement](http://blog.chromium.org/2012/05/connect-with-web-intents.html) explains that “it's impossible to build a complex API – especially one that requires an ecosystem of apps – without feedback from web developers using it in the wild”. The developers expect there will be significant, possibly backwards-incompatible, changes in the API as they get feedback. The API is currently prefixed to stop it being confused with whatever the final version of the API is, and intents must be registered at the Chrome App Store. Web application developers interested in Web Intents can consult “_[Web Intents in Chrome](http://www.chromium.org/developers/web-intents-in-chrome)_“. 

Chrome 19 can be [downloaded](https://www.google.com/chrome) from Google's page for stable Chrome. Existing users of the Chrome stable channel should be automatically updated to the new version. Chrome is based on Google's open source browser [Chromium](http://www.chromium.org/).