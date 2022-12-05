---
title: OONI maps internet censorship on a global scale
date: 2012-05-03T11:23:00+00:00
layout: single
author_profile: true
url: 2012/05/03/ooni-maps-internet-censorship-on-a-global-scale/
tags:
  - Announcement
  - report
  - Tor Project
lang: en
category: techblog
---
[<img title="Tor" border="0" alt="Tor" align="right" src="http://lh5.ggpht.com/-KRvUmO1cxZM/T6JjmxyfP0I/AAAAAAAAF2M/TJWhCdYMedU/Tor_thumb.png?imgmax=800" width="150" height="90" />](http://lh3.ggpht.com/-U_Zc82XqoDU/T6JjlBcISmI/AAAAAAAAF2E/Y7tVcLjB94I/s1600-h/Tor%25255B2%25255D.png)The H-Online: Tor developers Arturo Filasto and Jacob Appelbaum [have been working on a new tool](http://www.forbes.com/sites/andygreenberg/2012/04/30/the-tor-projects-new-tool-aims-to-map-out-internet-censorship/) they call the OONI-probe. [OONI](http://ooni.nu/) stands for Open Observatory of Network Interference and is designed to help map internet censorship across the global network. The open source tool gives users the ability to check their internet connection for censorship, selective bandwidth throttling, surveillance and other interferences. This data can then be shared freely with other users, creating a global overview of the state of censorship of the network. 

Filasto and Appelbaum said they were frustrated with the closed nature of either the code or the data collected by existing tools like Google's Transparency Report and that they wanted to correct this. The OONI project is in part funded with a grant from Radio Free Asia. The probe tool's source code has been released [on GitHub](https://github.com/hellais/ooni-probe) under an unspecified open source license. According to Filastro, OONI's goal is “to build that open framework, so that researchers can independently prove that the methodology is valid and repeat the tests.” The program has already been used by political activists and members of the press to confirm politically-motivated blocking of web sites at the ISP level. 

The OONI-probe works by either checking a list of web sites (usually the top one million Alexa-ranked sites, which can take close to a week) or by setting up a network of machines in different locations and analyzing the data-flow between them. Anyone using the tool is volunteering to submit the collected information to the OONI web site which will eventually aggregate the results and make the data available to the public. This should then make it possible to see exactly what the internet looks like from any given country and what sites are blocked or have been altered. 

OONI-probe is written in Python and further information on the program is available in its [README file](https://github.com/hellais/ooni-probe/blob/master/README). The developers point out that while the tool works, it is still under heavy development and does not yet have a graphical user interface.