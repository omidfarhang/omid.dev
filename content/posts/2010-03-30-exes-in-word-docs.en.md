---
title: EXEs in word docs
date: 2010-03-30T18:15:00+00:00
layout: single
author_profile: true
url: 2010/03/30/exes-in-word-docs/
tags:
  - malware
  - review
  - spam
lang: en
category: techblog
---
Today, our friends at Trend Micro blogged about a new attack vector using Microsoft Word documents. We saw this as well last week, and have written a detection for the dropped trojan.

It’s not just a “lawsuit” that’s being spammed, we also picked up another form of this attack in our honeypots over the weekend:

<div>
  <a href="http://3.bp.blogspot.com/_vaUVXcmC3OI/S7I3QAm0P1I/AAAAAAAABaw/YcJigKGsGsM/s1600-h/wordvector182312388.png" imageanchor="1"><img border="0" height="317" src="http://3.bp.blogspot.com/_vaUVXcmC3OI/S7I3QAm0P1I/AAAAAAAABaw/YcJigKGsGsM/s400/wordvector182312388.png" width="400" /></a>
</div>

When you open the Word document, you see a “PDF”, but it’s actually not. It’s a JPG, which links to an executable.

<div>
  <a href="http://1.bp.blogspot.com/_vaUVXcmC3OI/S7I3NtgQKbI/AAAAAAAABao/DQPk4FH-pgs/s1600-h/document12381231231238.png" imageanchor="1"><img border="0" height="396" src="http://1.bp.blogspot.com/_vaUVXcmC3OI/S7I3NtgQKbI/AAAAAAAABao/DQPk4FH-pgs/s400/document12381231231238.png" width="400" /></a>
</div>

In Word 2007, it’s kind of like the Amish virus: The user has to really want to get infected.

<div>
  <a href="http://3.bp.blogspot.com/_vaUVXcmC3OI/S7I3O8vCxMI/AAAAAAAABas/ZFiwzaVabnY/s1600-h/openpackage12388.png" imageanchor="1"><img border="0" height="331" src="http://3.bp.blogspot.com/_vaUVXcmC3OI/S7I3O8vCxMI/AAAAAAAABas/ZFiwzaVabnY/s400/openpackage12388.png" width="400" /></a>
</div>

Latest VirusTotal detection [here](http://www.virustotal.com/analisis/3a3e521cdf84c32035f64821be844599253d5f3567199e2acced7178267a3252-1269903650).

<table border="1" cellspacing="0">
  <tr>
    <td colspan="4">
      File COMPLA_1.EXE received on 2010.03.29 23:00:50 (UTC)
    </td>
  </tr>
  
  <tr>
    <td>
      Antivirus
    </td>
    
    <td>
      Version
    </td>
    
    <td>
      Last Update
    </td>
    
    <td>
      Result
    </td>
  </tr>
  
  <tr>
    <td>
      AntiVir
    </td>
    
    <td>
      7.10.5.248
    </td>
    
    <td>
      2010.03.29
    </td>
    
    <td>
      TR/Dropper.Gen
    </td>
  </tr>
  
  <tr>
    <td>
      Avast
    </td>
    
    <td>
      4.8.1351.0
    </td>
    
    <td>
      2010.03.29
    </td>
    
    <td>
      Win32:Malware-gen
    </td>
  </tr>
  
  <tr>
    <td>
      Avast5
    </td>
    
    <td>
      5.0.332.0
    </td>
    
    <td>
      2010.03.29
    </td>
    
    <td>
      Win32:Malware-gen
    </td>
  </tr>
  
  <tr>
    <td>
      BitDefender
    </td>
    
    <td>
      7.2
    </td>
    
    <td>
      2010.03.29
    </td>
    
    <td>
      Trojan.Downloader.JMZC
    </td>
  </tr>
  
  <tr>
    <td>
      F-Secure
    </td>
    
    <td>
      9.0.15370.0
    </td>
    
    <td>
      2010.03.30
    </td>
    
    <td>
      <span>Trojan-Downloader:W32/Lapurd.E</span>
    </td>
  </tr>
  
  <tr>
    <td>
      GData
    </td>
    
    <td>
      19
    </td>
    
    <td>
      2010.03.29
    </td>
    
    <td>
      Trojan.Downloader.JMZC
    </td>
  </tr>
  
  <tr>
    <td>
      McAfee+Artemis
    </td>
    
    <td>
      5935
    </td>
    
    <td>
      2010.03.29
    </td>
    
    <td>
      Artemis!60DF604563A1
    </td>
  </tr>
  
  <tr>
    <td>
      <span>McAfee-GW-Edition</span>
    </td>
    
    <td>
      6.8.5
    </td>
    
    <td>
      2010.03.29
    </td>
    
    <td>
      Trojan.Dropper.Gen
    </td>
  </tr>
  
  <tr>
    <td>
      Microsoft
    </td>
    
    <td>
      1.5605
    </td>
    
    <td>
      2010.03.30
    </td>
    
    <td>
      Trojan:Win32/Meredrop
    </td>
  </tr>
  
  <tr>
    <td>
      Prevx
    </td>
    
    <td>
      3.0
    </td>
    
    <td>
      2010.03.30
    </td>
    
    <td>
      <span>High Risk Fraudulent Security Program</span>
    </td>
  </tr>
  
  <tr>
    <td>
      Sophos
    </td>
    
    <td>
      4.52.0
    </td>
    
    <td>
      2010.03.30
    </td>
    
    <td>
      Sus/UnkPack-C
    </td>
  </tr>
  
  <tr>
    <td>
      Sunbelt
    </td>
    
    <td>
      6114
    </td>
    
    <td>
      2010.03.30
    </td>
    
    <td>
      Trojan-Downloader
    </td>
  </tr>
  
  <tr>
    <td>
      Symantec
    </td>
    
    <td>
      20091.2.0.41
    </td>
    
    <td>
      2010.03.30
    </td>
    
    <td>
      Backdoor.Trojan
    </td>
  </tr>
</table>