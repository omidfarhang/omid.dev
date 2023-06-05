---
title: Installing an Application Using Internet Explorer 9
date: 2011-03-20T15:33:00+00:00
layout: single
author_profile: true
url: 2011/03/20/installing-an-application-using-internet-explorer-9/
tags:
  - compare
  - Google
  - Google Chrome
  - Internet Explorer
  - internet explorer 9
  - Microsoft
  - review
lang: en
category: 
  - techblog
---
**Google Operation System Blog:** [<img title="internetexplorer9logo" border="0" alt="internetexplorer9logo" align="right" src="http://lh5.ggpht.com/_vaUVXcmC3OI/TYYXCXRVEJI/AAAAAAAADwI/xdgHWWEuq0Q/internetexplorer9logo_thumb%5B3%5D.png?imgmax=800" width="150" height="150" />](http://lh5.ggpht.com/_vaUVXcmC3OI/TYYXAcip9FI/AAAAAAAADwE/mURv95KDv3I/s1600-h/internetexplorer9logo%5B5%5D.png)I tried to download the latest Chromium build using Internet Explorer 9 and it was one of the most painful downloading experiences. Microsoft tries to protect users from downloading malware and uses a feature called [SmartScreen Filter](http://www.microsoft.com/security/online-privacy/smartscreen.aspx) that “checks software downloads against a dynamically updated list of reported malicious software sites”. This feature was available in IE8, but the latest version of IE [tried to improve it](http://blogs.msdn.com/b/ie/archive/2010/10/13/stranger-danger-introducing-smartscreen-application-reputation.aspx) by analyzing application reputation.

“In analyzing software downloads actively in use on the internet today, we found that most have an established download footprint and no history of malware. This was the genesis of SmartScreen application reputation. By removing unnecessary warnings, the remaining warnings become relevant. With SmartScreen Application Reputation, IE9 warns you before you run or save a higher risk program that may be an attempt to infect your computer with socially engineered malware. IE9 also stays out of the way for downloads with an established reputation. Based on real-world data we estimate that this new warning will be seen only 2-3 times a year for most consumers compared to today where there is a warning for every software download.”

Here's how difficult is to run mini_installer.exe, Chromium's installer:

**Step 1:** “Do you want to run or save this program”? Click “run”.

[<img title="ie9-download-1" border="0" alt="ie9-download-1" src="http://lh6.ggpht.com/_vaUVXcmC3OI/TYYXFXeqeAI/AAAAAAAADwQ/4cCKyFxzSUc/ie9-download-1_thumb%5B1%5D.png?imgmax=800" width="504" height="379" />](http://lh5.ggpht.com/_vaUVXcmC3OI/TYYXD83LhBI/AAAAAAAADwM/4jga2vpPTTQ/s1600-h/ie9-download-1%5B3%5D.png)

**Step 2:** “This file is not commonly downloaded and could harm your computer.” You have two options: “delete” and “actions”. It's quite uncommon to label a button using a noun, but the only reasonable option is the generic “actions”.

A help page explains that “when you download a program from the Internet, SmartScreen Filter will check the program against a list of programs that are downloaded by a significant number of other Internet Explorer users and a list of programs that are known to be unsafe. If the program you're downloading isn't on either list, SmartScreen Filter will display a warning that the file isn't &#8216;commonly downloaded.' It doesn't necessarily mean the website is fraudulent or that the program is malware, but you probably shouldn't download or install the program unless you trust the website and the publisher.”

[<img title="ie9-download-2" border="0" alt="ie9-download-2" src="http://lh4.ggpht.com/_vaUVXcmC3OI/TYYXJ1T6BeI/AAAAAAAADwY/kPrS3PLq1ds/ie9-download-2_thumb%5B1%5D.png?imgmax=800" width="504" height="379" />](http://lh6.ggpht.com/_vaUVXcmC3OI/TYYXGx_I3HI/AAAAAAAADwU/sr1QwBCKPxU/s1600-h/ie9-download-2%5B3%5D.png)

**Step 3:** IE9 shows a modal dialog which informs you that “this program might harm your computer”. Even though “SmartScreen Filter has little or no information” about the program, Microsoft's engineers thought it's a good idea to show two main options “don't run this program” and “delete program”, followed by a cryptic “more options” drop-down. I clicked “more options” because I really wanted to install the program. (Update: this step was skipped the second time I tried to install the same file.)

[<img title="ie9-download-3" border="0" alt="ie9-download-3" src="http://lh4.ggpht.com/_vaUVXcmC3OI/TYYXPG-JCHI/AAAAAAAADwg/00BDedZ09nw/ie9-download-3_thumb%5B1%5D.png?imgmax=800" width="456" height="354" />](http://lh5.ggpht.com/_vaUVXcmC3OI/TYYXMqnANcI/AAAAAAAADwc/c5-pdamNboc/s1600-h/ie9-download-3%5B3%5D.png)

**Step 4:** Microsoft finally shows the obvious option: “run anyway”, but still recommends not to run the program.

[<img title="ie9-download-4" border="0" alt="ie9-download-4" src="http://lh6.ggpht.com/_vaUVXcmC3OI/TYYXSYaW0ZI/AAAAAAAADwo/DMUySA3skn0/ie9-download-4_thumb%5B1%5D.png?imgmax=800" width="450" height="360" />](http://lh5.ggpht.com/_vaUVXcmC3OI/TYYXQ4IjgBI/AAAAAAAADwk/4aPBkDjBUhQ/s1600-h/ie9-download-4%5B3%5D.png)

There's a fine line between protecting users and annoying them, but IE9 managed to cross it.