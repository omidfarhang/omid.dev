---
title: Google, Yahoo, Skype targeted in attack linked to Iran
date: 2011-03-24T11:15:00+00:00
layout: single
author_profile: true
url: 2011/03/24/google-yahoo-skype-targeted-in-attack-linked-to-iran/
tags:
  - advice
  - alert
  - attack
  - hack
  - warning
lang: en
category: techblog
---
**[<img title="ComodoIran" border="0" alt="ComodoIran" align="right" src="http://lh6.ggpht.com/_vaUVXcmC3OI/TYsg3P9aj6I/AAAAAAAADyY/YSZlDesbfX4/ComodoIran_thumb%5B4%5D.png?imgmax=800" width="254" height="72" />](http://lh3.ggpht.com/_vaUVXcmC3OI/TYsg0zGgJAI/AAAAAAAADyU/wEjvWtDMkwI/s1600-h/ComodoIran%5B6%5D.png)Cnet:** A malicious attacker that appears to be the Iranian government managed to obtain supposedly secure digital certificates that can be used to impersonate Google, Yahoo, Skype, and other major Web sites, the security company affected by the breach said today. 

Comodo, a Jersey City, N.J.-based firm that issues digital certificates, said the nine certificates were fraudulently obtained, including one for Microsoft's Live.com, have already been revoked. A fraudulent certificate allows someone to impersonate the secure versions of those Web sites&#8211;the ones that are used when encrypted connections are enabled&#8211;in some circumstances.

The Internet Protocol addresses used in the attack are in Tehran, Iran, said Comodo, which believes that because of the focus and speed of the attack, it was &#8220;state-driven.&#8221; Spoofing those Web sites would allow the Iranian government to use what's known as a man-in-the-middle attack to impersonate the legitimate sites and grab passwords, read e-mail messages, and monitor any other activities its citizens performed, even if the connections were protected with SSL (Secure Sockets Layer) encryption.

The attacker tested the certificate for &#8220;login.yahoo.com,&#8221; but because it had been revoked, most browsers attempting to communicate with the site would see that it was not a trusted site, Comodo Chief Executive Melih Abdulhayoglu told CNET.

The spoofing would only work if the unknown perpetrators also operated the network, allowing them to use the Internet's domain name system to redirect innocent users to a fake Gmail.com site. That wouldn't be a problem for a national government like Iran, which controls the telecommunications infrastructure, but means that the impact of such a security breach is limited.

All the affected domain names &#8220;have to do with communications&#8211;they are not financially motivated at all,&#8221; Abdulhayoglu said. &#8220;They must have done some surveillance and they knew exactly how to get in (to the Comodo partner system). This was a fairly well planned and executed attack.&#8221; He refused to name the southern European partner whose systems were compromised, and said the Iranian server is now offline.

The Iranian IP address was linked to the compromise of the European registration authority affiliated with Comodo on March 15, according to another Comodo [blog post](http://blogs.comodo.com/it-security/data-security/the-recent-ca-compromise) written by Vice President Philip Hallam-Baker. Several IP addresses were used, but mainly IP addresses were from Iran, a separate [incident report](http://www.comodo.com/Comodo-Fraud-Incident-2011-03-23.html) says.

If Comodo is right about the attack originating from Iran's government, it wouldn't be the first government to have done something like this. Late last year, the Tunisian government [undertook](http://www.theatlantic.com/technology/archive/2011/01/the-inside-story-of-how-facebook-responded-to-tunisian-hacks/70044/) an ambitious scheme to steal an entire country's worth of Gmail, Yahoo, and Facebook passwords. It used malicious JavaScript code to siphon off unencrypted log-in credentials, which allowed government to infiltrate or delete protest-related discussions.

&#8220;It does not escape notice that the domains targeted would be of greatest use to a government attempting surveillance of Internet use by dissident groups,&#8221; Hallam-Baker wrote. &#8220;The attack comes at a time when many countries in North Africa and the Gulf region are facing popular protests and many commentators have identified the Internet and in particular social-networking sites as a major organizing tool for the protests.&#8221;

Many major browser makers already have revoked the fraudulent SSL certificates. Mozilla [said](https://blog.mozilla.com/security/2011/03/22/firefox-blocking-fraudulent-certificates/) last night that &#8220;we have updated [Firefox](http://www.cnet.com/firefox-3/) 4.0, 3.6, and 3.5 to recognize these certificates and block them automatically.&#8221; Google Chrome has been updated, and Microsoft said in a [security advisory](http://www.microsoft.com/technet/security/advisory/2524375.mspx) that it was contacted by Comodo on March 16 and &#8220;an update is available for all supported versions of Windows to help address this issue.&#8221;

&#8220;This issue affects any application or service utilizing SSL certificates that attempts to access one of the Web sites with fraudulent keys. We decided to take a holistic approach to protecting users,&#8221; Bruce Cowper, group manager for Trustworthy Computing at Microsoft, said in an e-mail. &#8220;We built a mitigation into Microsoft Windows so that any application or version of Internet Explorer could leverage it for protection.&#8221;

Apple did not immediately respond to a request for comment.

Opera does not need a specific patch for the problem, a spokesman said, adding that the company is considering blacklisting the nine fraudulent certificates, nevertheless. &#8220;Because the potential attacker would not be able to get a valid OCSP (Online Certificate Status Protocol) response with these certificates, Opera users will get immediate visual feedback,&#8221; he said in an e-mail. &#8220;When we do not get a valid OCSP response, we will change the security level of the page. The security pad lock will disappear and the user will know that the site is no longer secure. We may be the only browser that handles invalid OCSP responses in this way.&#8221;

Jacob Appelbaum, a [Tor Project](http://www.torproject.org/about/overview.html.en) programmer, wrote in a [blog post](https://blog.torproject.org/blog/detecting-certificate-authority-compromises-and-web-browser-collusion) yesterday that this snafu shows that the Internet's trust mechanism, that was erected upon the idea of using signed digital certificates, is broken.

&#8220;This should serve as a wake-up call to the Internet,&#8221; he said. &#8220;We need to research, build, and share new methods for ensuring trust, identity, authenticity, and confidentiality.&#8221;

Read More here: <a href="http://news.google.com/news/more?q=comodo&#038;hl=en&#038;prmd=ivnsu&#038;bav=on.2,or.r_gc.r_pw.&#038;um=1&#038;ie=UTF-8&#038;ncl=dEa1v8UYADeE1vMb29TbS90APoTjM&#038;ei=AWOLTfzrCIfPsgbP-tSkCg&#038;sa=X&#038;oi=news_result&#038;ct=more-results&#038;resnum=1&#038;ved=0CCsQqgIwAA" target="_blank">Google News</a>