---
title: How to Install LNK Update (KB2286198) on Windows XP SP2
date: 2010-08-14T20:42:00+00:00
layout: single
author_profile: true
url: 2010/08/14/how-to-install-lnk-update-kb2286198-on-windows-xp-sp2/
tags:
  - hack
  - Microsoft
  - Updates
  - Vulnerability
  - Windows XP
lang: en
category: 
  - techblog
---
Microsoft discontinued support for Windows XP Service Pack 2 on July 13th, and that means there is no SP2 update for the recent LNK shortcut vulnerability (KB2286198). If you review the comments from this [SANS Diary post](http://isc.sans.edu/diary.html?storyid=9313), you'll see that there was some initial confusion regarding SP2 support, due to a typo in Microsoft's [Security Bulletin](http://www.microsoft.com/technet/security/bulletin/MS10-046.mspx) (MS10-046). The bulletin is now corrected. 

However, even today, [the download for Windows XP](http://www.microsoft.com/downloads/details.aspx?familyid=12361875-B453-45E8-852B-90F2727894FD&displaylang=en) still includes SP2 in the file properties. 

[<img title="KB2286198_Properties" border="0" alt="KB2286198_Properties" src="http://lh5.ggpht.com/_vaUVXcmC3OI/TGb4iCN6cuI/AAAAAAAACXE/EDQGCjHTNA8/KB2286198_Properties_thumb%5B3%5D.png?imgmax=800" width="413" height="506" />](http://lh3.ggpht.com/_vaUVXcmC3OI/TGb4f55xiPI/AAAAAAAACXA/AGT82SSUM4o/s1600-h/KB2286198_Properties%5B5%5D.png) 

But if you try to install the update on an SP2 system, you'll get this error message: 

[<img title="KB2286198_Setup_Error" border="0" alt="KB2286198_Setup_Error" src="http://lh4.ggpht.com/_vaUVXcmC3OI/TGb4mUoEzKI/AAAAAAAACXM/p4WRvu3Z_UI/KB2286198_Setup_Error_thumb%5B3%5D.png?imgmax=800" width="445" height="143" />](http://lh3.ggpht.com/_vaUVXcmC3OI/TGb4j609W2I/AAAAAAAACXI/h5WdK0AZM70/s1600-h/KB2286198_Setup_Error%5B5%5D.png) 

“Setup has detected that the version of the Service Pack installed on your system is lower than what is necessary to apply this hotfix. At minimum, you must have Service Pack 2 installed.” 

This minimum requirement reminded us of some other software that required SP3… Grand Theft Auto IV. 

[<img title="GTA_IV" border="0" alt="GTA_IV" src="http://lh6.ggpht.com/_vaUVXcmC3OI/TGb4rL1zYhI/AAAAAAAACXU/IWr6hQoCjd8/GTA_IV_thumb%5B3%5D.jpg?imgmax=800" width="355" height="348" />](http://lh5.ggpht.com/_vaUVXcmC3OI/TGb4o9NzZYI/AAAAAAAACXQ/LXNMvhbcd84/s1600-h/GTA_IV%5B5%5D.jpg) 

GTA IV wouldn't install on SP2 systems when it was released in December of 2008. 

And so some determined gamers came up with a registry hack. 

[<img title="KB2286198_Reg_Hack" border="0" alt="KB2286198_Reg_Hack" src="http://lh4.ggpht.com/_vaUVXcmC3OI/TGb4uiEj_0I/AAAAAAAACXc/s1Chlpq4b44/KB2286198_Reg_Hack_thumb%5B3%5D.png?imgmax=800" width="444" height="224" />](http://lh5.ggpht.com/_vaUVXcmC3OI/TGb4s1wzgbI/AAAAAAAACXY/V-zVsBQQQCs/s1600-h/KB2286198_Reg_Hack%5B5%5D.png) 

It turns out that an SP2 system will think its SP3 if you edit this key: HKLM\System\CurrentControlSet\Control\Windows, and edit the DWORD value CSDVersion from 200 to 300 (and reboot).

It worked for GTA IV, so we decided to test it with KB2286198. And our test worked, WindowsXP-KB2286198-x86-ENU.exe installed on our SP2 test system once we tweaked the registry. We also tested an LNK exploit, and it did not infect the system after the patch.  
Cool.

But remember, this update is NOT officially tested or supported by Microsoft for SP2. And we do NOT recommend that anybody use this tweak in a production network of any kind. Hacking the registry and applying updates is likely a very quick way to destabilize your system. You really should update to Service Pack 3 if at all possible.

If you want to experiment, do so at your own risk.

**Updated to add**: A reader shared [this link](http://blog.securityactive.co.uk/2010/08/10/patching-windows-xp-sp2-for-the-shortcut-lnk-vulnerability-ms10-046/) to Security Active Blog.

The Security Update for Windows XP Embedded also installs on Windows Service Pack 2 systems and no registry tweak is needed. The file is called [WindowsXP-KB2286198-x86-custom-ENU.exe](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=c2a66b80-af7e-4950-95e6-f6476086e7ca).