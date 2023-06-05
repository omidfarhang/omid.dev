---
title: Phishing via NFC
date: 2012-03-02T21:38:00+00:00
layout: single
author_profile: true
url: 2012/03/02/phishing-via-nfc/
tags:
  - phishing
  - report
  - review
lang: en
category: 
  - techblog
---
At the [RSA Conference 2012](http://www.rsaconference.com/events/2012/usa/mightier.htm), McAfee's Chief Technology Officer, Stuart McClure, and several of his colleagues, have demonstrated a whole range of different attacks on mobile devices. For example, they demonstrated an attack on an NFC (Near Field Communication)-enabled smartphone: the attacker simply attaches a modified NFC tag to a legitimate surface such as an advertising poster. For their live demo, the researchers used a Red Cross donations appeal such as those seen at bus stops in various cities across Europe. 

The poster's regular NFC tag took the browser to the Red Cross donations web site, where the donor's details could be recorded. However, the modified secondary tag diverted the smartphone browser to a phishing site that pretended to be part of the Red Cross. McClure said that such attacks have already been observed in the wild. 

The researcher also demonstrated how to take control of an iPad. When a victim clicks on a link in an email, a PDF file is downloaded, and malware is installed without the user's knowledge via a vulnerability in the iOS code for processing PDFs. Although the attack is based on a vulnerability that has long been closed by Apple, the expert said that he assumes that newer iOS versions will continue to be vulnerable via jailbreaks. 

Once a device has become infected, it establishes a connection to the command & control server and transfers, for example, its location. One click on the symbol that is displayed in Google Maps on the attacker's system gives access to several options: to retrieve the SMS database, record the device environment using the microphone, or access the key chain. The key chain contains any passwords for applications and online services that are stored on the device. 

Source: H-Security