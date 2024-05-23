---
title: Issues with the recent update for Outlook 2007
date: 2010-12-21T19:32:00+00:00
layout: single
author_profile: true
url: 2010/12/21/issues-with-the-recent-update-for-outlook-2007/
tags:
  - issues
  - Microsoft
  - Outlook
  - solution
  - Updates
lang: en
categories: 
  - techblog
---
**[<img title="outlook_2007_logo" border="0" alt="outlook_2007_logo" align="right" src="http://lh4.ggpht.com/_vaUVXcmC3OI/TRD5vpx9KpI/AAAAAAAADhk/Pfzico5aGoA/outlook_2007_logo_thumb%5B2%5D.jpg?imgmax=800" width="150" height="147" />](http://lh3.ggpht.com/_vaUVXcmC3OI/TRD5tfldSTI/AAAAAAAADhg/GaObiBdtcTo/s1600-h/outlook_2007_logo%5B4%5D.jpg)MSDN Blog:** On Tuesday, December 14, we released an update (KB2412171) for Microsoft Outlook 2007. We have discovered several issues with the update and want to inform you about problems you might encounter and what corrective steps we recommend. As of December 16, this Outlook 2007 update has been removed from Microsoft Update.

This Outlook 2007 update was distributed via Microsoft Update. Many of you receive updates automatically and if you installed the update between Tuesday, December 14, and Thursday, December 16, it is likely that you are affected.

The three issues identified in the December 2010 update for Outlook 2007 are as follows:

  1. Outlook fails to connect if Secure Password Authentication (SPA) is configured for an account and the mail server does not support SPA. This is important for Google Gmail users because Gmail does not support SPA. Outlook customers using Gmail who have the SPA option turned on cannot connect to Gmail. 
  2. Noticeable performance issues are experienced when switching between folders if you do not have a Microsoft Exchange Server account configured in Outlook. Switching folders might take several seconds depending on the performance of your computer. This issue only applies when you use an IMAP, POP3, or Outlook Live Connector account, such as Windows Live Hotmail, and do not have an Exchange Server account configured in the same Outlook profile. To determine if you are using an Exchange Server account, see the help article [What is an Exchange account?](http://office.com/redir/HA001230171) 
  3. AutoArchive cannot be configured for IMAP, POP3, or Outlook Live Connector accounts if there is no Exchange Server account configured in the same Outlook profile. If you previously configured AutoArchive, no additional items are archived.

**If you are experiencing any of the listed issues with Outlook 2007, we recommend that you uninstall the December 2010 update by doing the following:**

Uninstalling KB2412171 on Windows 7 or Windows Vista

  1. Click **Start**, and then click **Control Panel**. 
  2. Click **Programs**, and then under **Programs and Features**, click **View installed updates**. 
  3. Click the entry for **KB2412171**, and then click **Uninstall**.

Uninstalling KB2412171 on Windows XP

  1. Click **Start**, and then click **Control Panel**. 
  2. Click **Add or Remove Programs**, and then make sure that the **Show Updates** check box is selected. 
  3. Click the entry for **KB2412171**, and then click **Remove**.

**Note for Office 365 Beta customers:** You do not need to uninstall this update. The listed folder switching and AutoArchive issues do not apply because Office 365 accounts are Exchange Server accounts. However, the issue with SPA when connecting to non-Exchange Server accounts that don’t support SPA does apply. In this case, turn off the SPA option by doing the following:

  1. In Outlook, on **Tools** menu, click **Account Settings**. 
  2. Select your account, and then click **Change**. 
  3. Clear the **Require logon using Secure Password Authentication (SPA)** check box.

We apologize to our customers for not discovering these issues before releasing the update and for any inconvenience we have caused. We know that you rely on Outlook and for that reason, we thoroughly quality test every update. We failed to meet our own and our customers’ expectation for quality with this update release. We are working to fix these issues and will post a release date for those fixes, and link to download them, as soon as that information is available.

We value the trust that you place in our software, and we are actively working to resolve these issues.

Sincerely,

The Outlook Team