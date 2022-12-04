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
**Microsoft Malware Protection Center:** We've had reports of a new worm in the wild and that generates increased RDP traffic for our users on port 3389. Although the overall numbers of computers reporting detections are low in comparison to more established malware families, the traffic it generates is noticeable. The worm is detected as Worm:Win32/Morto.A and you can see a detailed description of at [http://www.microsoft.com/security/portal/Threat/Encyclopedia/Entry.aspx?Name=Worm%3aWin32%2fMorto.A](http://www.microsoft.com/security/portal/Threat/Encyclopedia/Entry.aspx?Name=Worm%3AWin32%2FMorto.A).
  
Morto attempts to compromise Remote Desktop connections in order to penetrate remote systems, by exploiting weak administrator passwords. Once a new system is compromised, it connects to a remote server in order to download additional information and update its components. It also terminates processes for locally running security applications in order to ensure its activity continues uninterrupted. Affected users should note that a reboot may be required in order to complete the cleaning process.

This particular worm highlights the importance of setting strong system passwords. Using strong passwords can go a long way towards protecting your environment &#8212; and the ability of attackers to exploit weak passwords shouldn't be underestimated. For example, Morto tries the following passwords:

*1234 \
0 \
111 \
123 \
369 \
1111 \
12345 \
111111 \
123123 \
123321 \
123456 \
168168 \
520520 \
654321 \
666666 \
888888 \
1234567 \
12345678 \
123456789 \
1234567890 \
%u% \
%u%12 \
1234qwer \
1q2w3e \
1qaz2wsx \
aaa \
abc123 \
abcd1234 \
admin \
admin123 \
letmein \
pass \
password \
server \
test \
user

When creating strong passwords, remember that the key to a strong password is length and complexity. Here's a few tips to keep in mind:

  
*   An ideal password is long and has letters, punctuation, symbols, and numbers.
*   Whenever possible, use at least 14 characters or more.
*   The greater the variety of characters in your password, the better.
*   Use the entire keyboard, not just the letters and characters you use or see most often.
  
For more advice on creating (and remembering) strong passwords, visit my [Safety and Security Center](/en/knowledge-base/security/passwords).

For your information here are some examples of files that are being detected as Win32/Morto:
  
0x48AE936692FFBD14782D5C97DD067402FBB52356\
0x6929EAD324EFA7A667BAE88A041F546DBBECBF26\
0x188BA0E3A03BFFFF4B9C96721AC70EF68D19A86E

_Hil Gradascevic_\
MMPC Melbourne