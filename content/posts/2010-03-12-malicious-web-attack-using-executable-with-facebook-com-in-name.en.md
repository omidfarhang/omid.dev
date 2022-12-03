---
title: Malicious Web Attack Using Executable With facebook.com in Name
date: 2010-03-12T12:30:00+00:00
layout: single
author_profile: true
url: 2010/03/12/malicious-web-attack-using-executable-with-facebook-com-in-name/
tags:
  - alert
  - malware
  - review
lang: en
category: techblog
---
As we were working through URLs identified as suspicious due to our GTI technology, one of the URLs that presented itself was an average “.com” site that loaded a php. As we processed this – it was interesting to see that this php actually reached out to download a file that ended with the string facebook.com.exe — as this “.com” site was very social-network friendly – it would be easy to see how an average user, without web protection in place, would not even realize what was going on.

<div>
  <a href="http://4.bp.blogspot.com/_vaUVXcmC3OI/S5oivIEAoUI/AAAAAAAABQQ/hKOhn7iuG4E/s1600-h/2010-03-blog-malware-1.png" imageanchor="1"><img border="0" height="241" src="http://4.bp.blogspot.com/_vaUVXcmC3OI/S5oivIEAoUI/AAAAAAAABQQ/hKOhn7iuG4E/s400/2010-03-blog-malware-1.png" width="400" /></a>
</div>

And what was this *facebook.com.exe?  This was  detected as:

<table border="1" cellspacing="0">
  <tr>
    <td colspan="4">
      <span>File IM24672.JPG-www.facebook.com.exe received on 2010.03.10 19:54:18 (UTC)</span>
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
      8.2.1.180
    </td>
    
    <td>
      2010.03.10
    </td>
    
    <td>
      TR/Injector.Awi.88
    </td>
  </tr>
  
  <tr>
    <td>
      AVG
    </td>
    
    <td>
      9.0.0.787
    </td>
    
    <td>
      2010.03.09
    </td>
    
    <td>
      I-Worm/Stration.IPY
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
      2010.03.10
    </td>
    
    <td>
      GenPack:Backdoor.SDBot.DGEY
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
      2010.03.10
    </td>
    
    <td>
      <span>GenPack:Generic.Malware.SYd!Cdldsp.B424F431</span>
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
      2010.03.10
    </td>
    
    <td>
      GenPack:Backdoor.SDBot.DGEY
    </td>
  </tr>
  
  <tr>
    <td>
      Jiangmin
    </td>
    
    <td>
      13.0.900
    </td>
    
    <td>
      2010.03.10
    </td>
    
    <td>
      Trojan/Buzus.chp
    </td>
  </tr>
  
  <tr>
    <td>
      Kaspersky
    </td>
    
    <td>
      7.0.0.125
    </td>
    
    <td>
      2010.03.10
    </td>
    
    <td>
      Trojan.Win32.Buzus.dmgy
    </td>
  </tr>
  
  <tr>
    <td>
      McAfee+Artemis
    </td>
    
    <td>
      5916
    </td>
    
    <td>
      2010.03.10
    </td>
    
    <td>
      Artemis!6B8A163B27CD
    </td>
  </tr>
  
  <tr>
    <td>
      McAfee-GW-Edition
    </td>
    
    <td>
      6.8.5
    </td>
    
    <td>
      2010.03.10
    </td>
    
    <td>
      Trojan.Injector.Awi.88
    </td>
  </tr>
  
  <tr>
    <td>
      Microsoft
    </td>
    
    <td>
      1.5502
    </td>
    
    <td>
      2010.03.10
    </td>
    
    <td>
      VirTool:Win32/CeeInject.gen!BE
    </td>
  </tr>
  
  <tr>
    <td>
      NOD32
    </td>
    
    <td>
      4932
    </td>
    
    <td>
      2010.03.10
    </td>
    
    <td>
      a variant of Win32/Injector.AWI
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
      2010.03.10
    </td>
    
    <td>
      High Risk Worm
    </td>
  </tr>
  
  <tr>
    <td>
      Sunbelt
    </td>
    
    <td>
      5816
    </td>
    
    <td>
      2010.03.10
    </td>
    
    <td>
      Trojan.Win32.Generic!BT
    </td>
  </tr>
</table>



<div>
  <a href="http://3.bp.blogspot.com/_vaUVXcmC3OI/S5oivTFFCTI/AAAAAAAABQU/OkZLepE9TF4/s1600-h/2010-03-blog-malware-2.png" imageanchor="1"><img border="0" height="263" src="http://3.bp.blogspot.com/_vaUVXcmC3OI/S5oivTFFCTI/AAAAAAAABQU/OkZLepE9TF4/s400/2010-03-blog-malware-2.png" width="400" /></a>
</div>



<div>
  <a href="http://2.bp.blogspot.com/_vaUVXcmC3OI/S5oivbh2aDI/AAAAAAAABQY/nHv0D5fLdRc/s1600-h/2010-03-blog-malware-3.png" imageanchor="1"><img border="0" height="95" src="http://2.bp.blogspot.com/_vaUVXcmC3OI/S5oivbh2aDI/AAAAAAAABQY/nHv0D5fLdRc/s400/2010-03-blog-malware-3.png" width="400" /></a>
</div>

 By the time I am writing this – it is already being seen with further visibility across McAfee Artemis detection and we are making sure that all of our products protect against this threat.

<div>
  <a href="http://4.bp.blogspot.com/_vaUVXcmC3OI/S5oivlRD8mI/AAAAAAAABQc/ai-1jv6fut8/s1600-h/2010-03-blog-malware-4.png" imageanchor="1"><img border="0" height="200" src="http://4.bp.blogspot.com/_vaUVXcmC3OI/S5oivlRD8mI/AAAAAAAABQc/ai-1jv6fut8/s400/2010-03-blog-malware-4.png" width="400" /></a>
</div>

This server where this was hosted has already been taken off-line – however, this threat, maneuver, and piece of malware will continue to be seen again, and again, and again. In fact, we already have other webservers that are hosting that same attack – along the same lines – and will be continuing to monitor and follow this particular attack.