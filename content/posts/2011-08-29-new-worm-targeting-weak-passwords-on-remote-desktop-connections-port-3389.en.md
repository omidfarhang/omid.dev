---
title: New worm targeting weak passwords on Remote Desktop connections (port 3389)
date: 2011-08-29T14:13:00+00:00
layout: single
author_profile: true
url: 2011/08/29/new-worm-targeting-weak-passwords-on-remote-desktop-connections-port-3389/
tags:
  - advice
  - analyze
  - malware
  - Microsoft
  - Password
  - review
  - security
lang: en
category: techblog
---
<div dir="ltr" trbidi="on">
  <b>Microsoft Malware Protection Center:</b> We've had reports of a new worm in the wild and that generates increased RDP traffic for our users on port 3389. Although the overall numbers of computers reporting detections are low in comparison to more established malware families, the traffic it generates is noticeable. The worm is detected as Worm:Win32/Morto.A and you can see a detailed description of at <a href="http://www.microsoft.com/security/portal/Threat/Encyclopedia/Entry.aspx?Name=Worm%3AWin32%2FMorto.A">http://www.microsoft.com/security/portal/Threat/Encyclopedia/Entry.aspx?Name=Worm%3aWin32%2fMorto.A</a>.</p> 
  
  <p>
    Morto attempts to compromise Remote Desktop connections in order to penetrate remote systems, by exploiting weak administrator passwords. Once a new system is compromised, it connects to a remote server in order to download additional information and update its components. It also terminates processes for locally running security applications in order to ensure its activity continues uninterrupted. Affected users should note that a reboot may be required in order to complete the cleaning process.
  </p>
  
  <p>
    This particular worm highlights the importance of setting strong system passwords. Using strong passwords can go a long way towards protecting your environment &#8212; and the ability of attackers to exploit weak passwords shouldn't be underestimated. For example, Morto tries the following passwords:<br /><i><br />*1234 <br />0 <br />111 <br />123 <br />369 <br />1111 <br />12345 <br />111111 <br />123123 <br />123321 <br />123456 <br />168168 <br />520520 <br />654321 <br />666666 <br />888888 <br />1234567 <br />12345678 <br />123456789 <br />1234567890 <br />%u% <br />%u%12 <br />1234qwer <br />1q2w3e <br />1qaz2wsx <br />aaa <br />abc123 <br />abcd1234 <br />admin <br />admin123 <br />letmein <br />pass <br />password <br />server <br />test <br />user</i>
  </p>
  
  <p>
    When creating strong passwords, remember that the key to a strong password is length and complexity. Here's a few tips to keep in mind:
  </p>
  
  <ul>
    <li>
      An ideal password is long and has letters, punctuation, symbols, and numbers.
    </li>
    <li>
      Whenever possible, use at least 14 characters or more.
    </li>
    <li>
      The greater the variety of characters in your password, the better.
    </li>
    <li>
      Use the entire keyboard, not just the letters and characters you use or see most often.
    </li>
  </ul>
  
  <p>
    For more advice on creating (and remembering) strong passwords, visit my <a href="/en/knowledge-base/security/passwords">Safety and Security Center</a>.
  </p>
  
  <p>
    For your information here are some examples of files that are being detected as Win32/Morto:
  </p>
  
  <p>
    0x48AE936692FFBD14782D5C97DD067402FBB52356<br />0x6929EAD324EFA7A667BAE88A041F546DBBECBF26<br />0x188BA0E3A03BFFFF4B9C96721AC70EF68D19A86E
  </p>
  
  <p>
    <em>Hil Gradascevic</em><br />MMPC Melbourne</div>