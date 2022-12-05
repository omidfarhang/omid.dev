---
title: Viruses and Digital Signatures
date: 2010-03-05T19:58:00+00:00
layout: single
author_profile: true
url: 2010/03/05/viruses-and-digital-signatures/
tags:
  - advice
  - alert
  - malware
  - review
lang: en
category: techblog
---
Recently, We received some malicious files which appeared to be signed by “Adobe Systems Incorporated”. On closer inspection, however, it was seen that the signature was just a ruse used by the malware author to give an air of legitimacy to the files. Virus writers are getting smarter and going that extra mile to digitally sign their files. Using this technique the malware authors could, for example, penetrate an environment where only signed files are allowed but the authenticity of the signature is not checked.

Although the files are signed, they are signed using an unauthenticated CA (Certificate Authority) which is masquerading as Verisign. A CA is a trusted third party that issues and signs the certificate and vouches for the authenticity of the file. Each CA should be registered and therefore recognized globally as a trusted signer. The signature on the certificate is verified by the signer’s public key.

What the malware authors have tried here is to create their own CA and attempt to use it to sign these malicious files. They chose a misleading name for their CA, namely “Verisign”, but their private key used for signing will obviously be different from the authentic Verisign CA key. Therefore this renders their CA untrustworthy so that, while the file still has a valid signature, it is not from the real Verisign CA.

Also, although the file is correctly signed by a company called “Adobe Systems Incorporated,” that company has been certified by their fake Verisign CA and therefore has no meaning or relation to the real “Adobe Systems Incorporated.”

Shown below are the real and fake Verisign CA signed files. On the left you can see that the certificate chain is not trusted all the way to the root where as on the right side (a real Adobe file) the certification chain is trusted up to the root.

[![](http://4.bp.blogspot.com/_vaUVXcmC3OI/S5FaZzBZVNI/AAAAAAAABLk/SmxBK-b65MM/s640/certificates.jpg)](http://4.bp.blogspot.com/_vaUVXcmC3OI/S5FaZzBZVNI/AAAAAAAABLk/SmxBK-b65MM/s1600-h/certificates.jpg)

[![](http://3.bp.blogspot.com/_vaUVXcmC3OI/S5Faa4XUeRI/AAAAAAAABLs/KwcIY8kmpu0/s640/path.jpg)](http://3.bp.blogspot.com/_vaUVXcmC3OI/S5Faa4XUeRI/AAAAAAAABLs/KwcIY8kmpu0/s1600-h/path.jpg)

On Windows machines with User Access Control enabled, a warning similar to the one shown below will be displayed (warning that the publisher is unknown).

[![](http://1.bp.blogspot.com/_vaUVXcmC3OI/S5Faeuwf9fI/AAAAAAAABL0/c5MABrvIyi0/s640/warning_1a.jpg)](http://1.bp.blogspot.com/_vaUVXcmC3OI/S5Faeuwf9fI/AAAAAAAABL0/c5MABrvIyi0/s1600-h/warning_1a.jpg)

So, in a nutshell, creating “authentic-looking” certificates to make malicious files look legitimate is a trick which virus writers are employing to challenge today’s sophisticated security mechanisms.

So, play safe, and check the authenticity of the signature whenever one is present.