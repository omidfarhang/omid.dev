---
title: Update for Windows Update has teething troubles
date: 2012-06-25T16:42:00+00:00
layout: single
author_profile: true
url: 2012/06/25/update-for-windows-update-has-teething-troubles/
tags:
  - Microsoft
  - problems
  - report
  - Updates
  - Windows
lang: en
category: techblog
---
<a href="http://lh4.ggpht.com/-cRcEw1ORtqo/T-iNvyeA5yI/AAAAAAAAGXs/-FHfmZhGafA/s1600-h/Microsoft_Logo%25255B2%25255D.png" target="_blank"><img title="Microsoft_Logo" border="0" alt="Microsoft_Logo" align="right" src="http://lh6.ggpht.com/-R22xxQQp6AY/T-iNxqnvZhI/AAAAAAAAGX0/QG8PLtEpu3o/Microsoft_Logo_thumb.png?imgmax=800" width="200" height="34" /></a>Microsoft has released an unscheduled, non-[patch day](http://www.h-online.com/news/item/Critical-holes-closed-in-Microsoft-s-June-Patch-Tuesday-1616622.html) update for Windows to update the Windows Update function itself. However, according to reports from readers, the Windows Update Agent update [does not always run smoothly](http://social.technet.microsoft.com/Forums/en-US/w7itproinstall/thread/d046bce8-38dd-4be5-8abb-5486200379a6/); The H's associates at heise Security also ran into problems on their test systems. 

A staggered dissemination of the update has been taking place over the past three to four days. Users who run Windows Update are confronted with a message which says that an update for Windows Update needs to be installed before the system can check for other updates. 

<a href="http://lh4.ggpht.com/-N9YD-x7DUpM/T-iNzWp2B0I/AAAAAAAAGX8/K5aKYue8nVw/s1600-h/Windows_Update_Agent_update%25255B3%25255D.png" target="_blank"><img title="Windows_Update_Agent_update" border="0" alt="Windows_Update_Agent_update" align="right" src="http://lh3.ggpht.com/-98kbo27dwbM/T-iN1fdBhfI/AAAAAAAAGYE/GfF2BuvgxRw/Windows_Update_Agent_update_thumb%25255B1%25255D.png?imgmax=800" width="240" height="151" /></a>On some computers, clicking the “Install Updates” button results in a failed installation with error code 80070057 or 8007041B. On heise Security's test Windows 7 computer, repeatedly attempting the update (click on “Check for updates” on the left) did eventually result in the update being successfully applied. Microsoft has provided [a “Fix it” tool](http://go.microsoft.com/?linkid=9767096) for more stubborn cases in [Knowledge Base Article 949104](http://support.microsoft.com/kb/949104). 

The update in question upgrades the Windows Update Agent from version 7.4.7600.226 to 7.6.7600.256; it is not, as some readers have feared, a virus. After upgrading, the Windows Update Agent is automatically restarted; users do not need to reboot Windows. 

[http://h-online.com/-1624979](http://h-online.com/-1624979 "http://h-online.com/-1624979")