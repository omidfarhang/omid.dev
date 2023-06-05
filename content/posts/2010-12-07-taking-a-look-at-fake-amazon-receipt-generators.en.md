---
title: Taking a look at fake Amazon receipt generators
date: 2010-12-07T23:51:00+00:00
layout: single
author_profile: true
url: 2010/12/07/taking-a-look-at-fake-amazon-receipt-generators/
tags:
  - Amazon
  - malware
  - phishing
  - report
  - review
lang: en
categories: 
  - techblog
---
**Sunbelt Blog:** 

[<img title="fakeamazon0" border="0" alt="fakeamazon0" src="http://lh3.ggpht.com/_vaUVXcmC3OI/TP7BJCpQijI/AAAAAAAADbU/IAIQ8cYw7BI/fakeamazon0_thumb%5B3%5D.gif?imgmax=800" width="341" height="139" />](http://lh3.ggpht.com/_vaUVXcmC3OI/TP7BG86RguI/AAAAAAAADbQ/LU3glLz7cBY/s1600-h/fakeamazon0%5B5%5D.gif)

Above, you can see a vaguely optimistic VirusTotal user summary in relation to a file that’s been doing the rounds for about a month or two. Here is the file in question:

[<img title="fakeamazon00" border="0" alt="fakeamazon00" src="http://lh3.ggpht.com/_vaUVXcmC3OI/TP7BNON8lTI/AAAAAAAADbc/X_qjWXy1hvQ/fakeamazon00_thumb%5B3%5D.gif?imgmax=800" width="93" height="122" />](http://lh6.ggpht.com/_vaUVXcmC3OI/TP7BK-B8bDI/AAAAAAAADbY/e-DKKohoW48/s1600-h/fakeamazon00%5B5%5D.gif)

A “receipt generator”, I hear you ask – what do people want with one of those?  
The answer, of course, is rather straightforward:

[<img title="fakeamazon060" border="0" alt="fakeamazon060" src="http://lh3.ggpht.com/_vaUVXcmC3OI/TP7BRdhHnnI/AAAAAAAADbk/fV-bUQ0uvXI/fakeamazon060_thumb%5B1%5D.gif?imgmax=800" width="397" height="99" />](http://lh6.ggpht.com/_vaUVXcmC3OI/TP7BPSE6YsI/AAAAAAAADbg/yrIMVEFz89Y/s1600-h/fakeamazon060%5B3%5D.gif)

This is a particularly interesting scam, as it doesn’t target regular PC users – it targets the people who sell you things, such as the merchants on the Amazon marketplace. This is what the would-be social engineer sees when they fire up the program:

[<img title="fakeamazon1" border="0" alt="fakeamazon1" src="http://lh4.ggpht.com/_vaUVXcmC3OI/TP7BVmcn9jI/AAAAAAAADbs/TYUU_9KGqCQ/fakeamazon1_thumb%5B1%5D.gif?imgmax=800" width="343" height="504" />](http://lh4.ggpht.com/_vaUVXcmC3OI/TP7BTgA3Q9I/AAAAAAAADbo/-hwwVJyFoKY/s1600-h/fakeamazon1%5B3%5D.gif)

They can fill in a variety of information, including Item name, Price and the date the order was taken. Additionally, it allows them to choose between the .com, .co.uk, .fr and .ca Amazon portals. When they hit “Generate”, a html file is created in the program folder which looks like this:

[<img title="fakeamazon040" border="0" alt="fakeamazon040" src="http://lh5.ggpht.com/_vaUVXcmC3OI/TP7BZxprMJI/AAAAAAAADb0/iI69dV4ZHqo/fakeamazon040_thumb%5B1%5D.gif?imgmax=800" width="504" height="332" />](http://lh5.ggpht.com/_vaUVXcmC3OI/TP7BXnrIfBI/AAAAAAAADbw/i65y3qC3uYU/s1600-h/fakeamazon040%5B3%5D.gif)

It’s a pretty good facsimile of a genuine Amazon receipt – I just logged into my Amazon account, hit the “Printable Order Summary” button on an old order and it’s identical to the above. Note the small details, such as “Total before tax”, “Sales tax” and other touches that make it as convincing as possible.  
What happens once our scammer is armed with his fake receipt? Well, many sellers on Amazon will ask you to send them a copy of your receipt should you run into trouble, have orders go missing, lose your license key for a piece of software and so on. The gag here is that the scammer is relying on the seller not checking the details and accepting the printout at face value. After all, how many sellers would be aware somebody went to the trouble of creating a fake receipt generator in the first place?  
Some things to note for the wary seller: not only will you not have a record of these people buying your products, you should be able to confirm with Amazon that no purchase was ever made. Check the orange order number at the top, because those are randomly selected from a set of looping numbers every time the scammer clicks on the “Order Number” button – again, something either the seller or Amazon should be able to check. Finally, the program seems to add some random digits on the “Visa: payment method” section in payment information.  
As you can see, the _careful_ seller has little to worry about – many of the items in the fake printout are convincing as a whole, but once you start digging into the details a little bit it quickly falls apart. However, it seems this program has started a little wave of imitations, as evidenced by this screenshot lifted from a (now defunct) downloads portal:

[<img title="fakeamazon4400" border="0" alt="fakeamazon4400" src="http://lh6.ggpht.com/_vaUVXcmC3OI/TP7Bf_IU-BI/AAAAAAAADb8/l5VNdELdx9Y/fakeamazon4400_thumb%5B2%5D.gif?imgmax=800" width="504" height="440" />](http://lh4.ggpht.com/_vaUVXcmC3OI/TP7BcePMJaI/AAAAAAAADb4/d3zZ5rEzlpI/s1600-h/fakeamazon4400%5B6%5D.gif)

Oh dear.  
Anyway, it’s clear that sellers will need to keep their wits about them over the coming festive season as I can see this being a particularly popular scam for the time being. If a “customer” seems a little peculiar, ensure you take a good look at their receipt – you probably don’t want to have a Homer Simpson moment after you’ve sent three Playstations to their dropoff address.

We’ve passed the files onto Amazon, and the VirusTotal detection rate is currently [1/42](http://www.virustotal.com/file-scan/report.html?id=5cf020ed6f8bc5eecaf6870d87cb4d787302771a7ebb51e10fd8f8ce7297faa1-1291671982) – VIPER detect this as Hacktool.Win32.Amagen.A.