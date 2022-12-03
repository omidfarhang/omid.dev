---
title: Vulnerabilities in Microsoft Office and OpenOffice compared
date: 2011-04-20T17:26:00+00:00
layout: single
author_profile: true
url: 2011/04/20/vulnerabilities-in-microsoft-office-and-openoffice-compared/
tags:
  - Microsoft
  - Microsoft Office
  - OpenOffice
  - review
  - security
  - Vulnerability
lang: en
category: techblog
---
<div dir="ltr" trbidi="on">
  <table cellpadding="0" cellspacing="0">
    <tr>
      <td>
        <a href="http://4.bp.blogspot.com/-8bphAQzYH2c/Ta8PjkGhZ7I/AAAAAAAAD2k/Q3REh1T0Egk/s1600/offvstar-347a355b3a38df50.png" imageanchor="1"><img border="0" height="235" src="http://4.bp.blogspot.com/-8bphAQzYH2c/Ta8PjkGhZ7I/AAAAAAAAD2k/Q3REh1T0Egk/s320/offvstar-347a355b3a38df50.png" width="320" /></a>
      </td>
    </tr>
    
    <tr>
      <td>
        Since 2003, the number of exploitable vulnerabilities <br />has fallen considerably in Microsoft's Office suite.
      </td>
    </tr>
  </table>
  
  <p>
    <b>H-Online:</b> Independently of each other, security specialists <a href="http://dankaminsky.com/">Dan Kaminsky</a> and Will Dormann from <a href="https://www.cert.org/cert/">Carnegie Mellon University's CERT</a> have found that, in the past few years, the number of flaws and exploitable vulnerabilities in individual versions of Microsoft Office has fallen dramatically, achieving results that are even below those of<a href="http://de.openoffice.org/">OpenOffice</a>. However, their findings should be treated with caution, as they are based on automatic evaluations and say little about the actual threat potential.
  </p>
  
  <p>
    For their analyses, both researchers used fuzzing tools to create several thousand flawed .doc files, loaded them into the office products, and evaluated the results with Microsoft's &#8220;<a href="http://msecdbg.codeplex.com/">!exploitable Crash Analyzer</a>&#8221; tool. Kaminsky and Dormann then proceeded to count the number of crashes and the flaws classified by Crash Analyzer as vulnerabilities that can, or can potentially, be exploited for attacks. However, the tool uses an automated mechanism to classify risks.
  </p>
  
  <p>
    Dormann <a href="https://www.cert.org/blogs/certcc/2011/04/office_shootout_microsoft_offi.html">found</a> that the number of crashes decreased steadily from Office XP through Office 2003 and 2007 to Office 2010. Reportedly, the number of exploitable holes also decreased continuously from seven to zero. The researcher only compared versions 3.2.1 and 3.30 RC7 of OpenOffice, and found that, while there was a fall in the number of crashes and exploitable flaws (from 18 to 15) between the products, the number was still considerably higher than that achieved by Microsoft Office.
  </p>
  
  <p>
    Kaminsky's research <a href="http://dankaminsky.com/2011/03/11/fuzzmark/">yielded</a> more drastic results: while Office 2003 was still found to contain 127 (potentially) exploitable holes, numbers reportedly dropped to 12 for Office 2007 and to seven for Office 2010. By comparison, the version of OpenOffice that was available in 2003 (version 1.1) reportedly contained 73 vulnerabilities, dropping to 62 in 2007 and to 20 in 2010.
  </p>
  
  <p>
    Kaminsky and Dormann only offer conservative interpretations of their results. Kaminsky says that, in his view, the situation has improved considerably. Neither of the researchers makes a statement about the potential reasons for their findings. With Microsoft, the introduction of the Software Development Lifecycle is likely to have played a major role, as the vendor has established specific processes and tools for increasing its product security in this context.
  </p>
  
  <p>
    However, it would be a mistake to read too much into the results. For instance, they appear to vary greatly in similar tests, and Microsoft's products are currently still a far more popular attack target than OpenOffice, which means that the risk of an infection is higher even if there are fewer vulnerabilities. This could, of course, change when the support of Office XP runs out (12 July 2011), prompting businesses and users to upgrade to newer versions of Office. In these versions, mechanisms such as the &#8220;Office File Validation&#8221; feature attempt to prevent the execution of specially crafted files. This function also became available for Office 2003 and 2007 too on the <a href="http://www.h-online.com/news/item/Microsoft-s-record-Patch-Tuesday-1226887.html">latest Patch Tuesday</a>.</div>