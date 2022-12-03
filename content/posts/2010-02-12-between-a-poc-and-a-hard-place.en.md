---
title: Between a PoC and a Hard Place
date: 2010-02-12T20:55:00+00:00
layout: single
author_profile: true
url: 2010/02/12/between-a-poc-and-a-hard-place/
tags:
  - malware
  - Mobile
  - phishing
  - scam
lang: en
category: techblog
---
Several reports have been published detailing a Blackberry proof of concept (PoC) exploit called _txsBBSpy_ that was recently presented at a security conference. Although it may not have been the aim of the original presenter, some reports have framed the PoC as being able to exploit so-called vulnerabilities that the writers believe to be present in the Blackberry platform. The “vulnerabilities” involve secretly forwarding incoming emails, locating devices by way of their GPS capabilities, eavesdropping on conversations by surreptitiously turning on microphones, and other such nefarious behavior.  
Although the vectors used for the PoC itself weren’t exactly ground-breaking it does highlight the fact that competition between mobile platform vendors to provide easy-to-use APIs (and thus attract developers) has made it possible to write malicious applications for mobile devices in less time than ever before.  
So, does this mean the existence of easy-to-use APIs makes mobile devices unsafe? The answer is: not really. While over the years it has become easier to work with mobile development platforms, and the amount of time it takes to bring a new and fully featured software product to market has decreased, this has also meant that platform vendors have simultaneously had to introduce steps to ensure that new API features are not being used for malicious purposes.  
Vendors take different approaches to ensuring the security and integrity of applications written for mobile platforms, such as restricting application security policies, providing a single point of distribution, mandating application signing, and restricting applications that may be installed to those that have been approved (with the possibility of future revocation if an application is found to be questionable). However, these steps can never be 100% reliable, and as such, situations may arise in which malicious applications sneak through, as happened last year. This is where the case for mobile security products can be made.  
Some simple precautions that end users can take include:  
•    Watch out for unusually high battery consumption. Although this sounds simple, many threats written for mobile platforms are not designed to run efficiently, which means that resource usage can be extremely high.  
•    Be sure to check the device’s Bluetooth settings. Ensure that devices are set to be “hidden” and not “discoverable.”  
•    Keep track of your normal levels of data usage and contact your service provider if you become aware of significant increases that you cannot account for.  
•    Report any prompts to send premium-rate messages.  
•    Periodically confirm the applications installed on your mobile device and report any entries you did not specifically approve.  
•    Avoid granting “Trusted Application” status unless absolutely required, which may allow malicious code access to confidential data:

<div>
  <a href="http://4.bp.blogspot.com/_vaUVXcmC3OI/S3W4ht8-30I/AAAAAAAAA54/5n4UhfiWIeQ/s1600-h/Screen+shot+2010-02-11+at+11.01.19+PM.png" imageanchor="1"><img border="0" src="http://4.bp.blogspot.com/_vaUVXcmC3OI/S3W4ht8-30I/AAAAAAAAA54/5n4UhfiWIeQ/s640/Screen+shot+2010-02-11+at+11.01.19+PM.png" /></a>
</div>

As more and more developers move towards mobile application development, mobile devices are becoming ever more sophisticated and are increasingly being used to store critical personal data. Mobile device manufacturers will have to walk the fine line between providing comprehensive APIs and preventing malicious applications from gaining unfettered access to user content and other potentially sensitive data.