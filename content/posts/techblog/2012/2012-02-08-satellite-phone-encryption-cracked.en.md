---
title: Satellite phone encryption cracked
date: 2012-02-08T16:10:00+00:00
layout: single
author_profile: true
url: 2012/02/08/satellite-phone-encryption-cracked/
tags:
  - hack
  - report
  - security
lang: en
categories: 
  - TechBlog
---
**H-Online:** [<img title="Thuraya-SO-2510" border="0" alt="Thuraya-SO-2510" align="right" src="http://lh6.ggpht.com/-oC-e5wTZMv8/TzKXW-Q8wHI/AAAAAAAAEjE/9wFbJFxkmvI/Thuraya-SO-2510_thumb%25255B1%25255D.jpg?imgmax=800" width="122" height="200" />](http://lh3.ggpht.com/-oXsATnJtETg/TzKXGI5EugI/AAAAAAAAEi8/ZlQsCyEYhA4/s1600-h/Thuraya-SO-2510%25255B1%25255D.jpg)Researchers at Ruhr-Universität Bochum in Germany have announced that they have [cracked](http://gmr.crypto.rub.de/) the A5-GMR-1 and A5-GMR-2 encryption algorithms used in satellite phones. Satellite phones are mainly used in areas with insufficient mobile network coverage and in the maritime sector. 

The researchers obtained the proprietary, and previously undocumented, algorithms by reverse engineering phone firmware updates. Ideally this, in itself, should not compromise the security of the transmitted data. Data security should not depend on the secrecy of the encryption methods, it should only depend on the non-disclosure of the secret key that is being used. 

However, subsequent analysis exposed [vulnerabilities](http://cryptanalysis.eu/blog/2012/02/02/dont-trust-satellite-phones-the-gmr-1-and-gmr-2-ciphers-have-been-broken/) in both algorithms that make concrete attacks viable. For example, A5-GMR-1 was found to be a slightly modified version of A5/2, which is used in GSM and was cracked in 2003. The existing attack scenario could be adapted for the satellite version without much effort. In A5-GMR-2, the researchers found a vector for a [known-plaintext attack](http://en.wikipedia.org/wiki/Known-plaintext_attack). 

The researchers [presentations](http://gmr.crypto.rub.de/#presentations), [publications](http://gmr.crypto.rub.de/#publications) and reconstructed C implementations of the [algorithms](http://gmr.crypto.rub.de/#sourcecode) are all available from their web site.