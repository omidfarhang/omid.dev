---
title: Dutch ISP KPN hacked, credentials and personal information leaked
date: 2012-02-11T11:24:00+00:00
layout: single
author_profile: true
url: 2012/02/11/dutch-isp-kpn-hacked-credentials-and-personal-information-leaked/
tags:
  - hack
  - ISP
  - news
  - report
lang: en
categories: 
  - TechBlog
---
**[<img title="kpn_logo175" border="0" alt="kpn_logo175" align="right" src="http://lh3.ggpht.com/-nJvlEKj7UPU/TzZIs2sZFFI/AAAAAAAAErA/VOUfdGAlmUM/kpn_logo175_thumb%25255B3%25255D.png?imgmax=800" width="175" height="76" />](http://lh5.ggpht.com/-NyKM9su3F9A/TzZIohoAZBI/AAAAAAAAEq8/yBGB-YKJ_go/s1600-h/kpn_logo175%25255B5%25255D.png)SophosLabs:** One of the largest ISPs in The Netherlands has shut down its email services after hackers posted usernames, passwords, phone numbers, addresses and more of more than 500 customers on the internet. 

KPN [discovered](https://www.kpn.com/corporate/Digitale-inbraak.htm) the attackers on its network January 27th, but decided not to disclose the information immediately after consulting with the Dutch government and law enforcement agencies. 

Presumably this was intended to allow them to monitor the attacker and gather evidence that might be used to apprehend and prosecute them. 

They announced the breach on February 8th, but suddenly today decided to suspend all email access after some customers' information was posted on pastebin.com. 

They are currently allowing customers to send outbound email, but have disabled access to customer mailboxes while they work on securing the server infrastructure. 

KPN provides service to more than two million Dutch internet users and it is unclear if information was stolen about more than the 500+ already disclosed. 

I have seen a lot of arguments among security researchers lately about the value of analyzing passwords that have been stolen from sites like Care2.com and Stratfor. 

[<img title="kpnexamplepasswords175" border="0" alt="kpnexamplepasswords175" align="right" src="http://lh5.ggpht.com/-lgSkWRZBmMI/TzZI1X3tDhI/AAAAAAAAErI/CtHZZ6QOas4/kpnexamplepasswords175_thumb%25255B9%25255D.png?imgmax=800" width="179" height="119" />](http://lh4.ggpht.com/-B3tWENtKPTw/TzZIw3zOrVI/AAAAAAAAErE/Xxw_Sx5e094/s1600-h/kpnexamplepasswords175%25255B6%25255D.png)The argument is that people's passwords are weak because these are throwaway websites and people can't be bothered to choose unique passwords for every site they access. 

This time the passwords disclosed are for accessing private email accounts, something I would expect most of us would consider very personal and important enough to protect properly. 

What did I find? The average password was 8.3 characters long and most of them abysmally weak. The shortest password was only 4 characters, while the longest (2) were 13 characters. 

[<img title="shutterstock_passwordlock250" border="0" alt="shutterstock_passwordlock250" align="right" src="http://lh6.ggpht.com/-TalgB2eN9Sc/TzZI-i7RVUI/AAAAAAAAErQ/91XzUAZK1kI/shutterstock_passwordlock250_thumb%25255B2%25255D.jpg?imgmax=800" width="244" height="244" />](http://lh3.ggpht.com/-B_bciM5Phe4/TzZI5YHHwuI/AAAAAAAAErM/MW785awSW7g/s1600-h/shutterstock_passwordlock250%25255B4%25255D.jpg)Password complexity isn't really the problem in this case, rather it is not having your password database stolen to begin with. 

No matter how long your password is it does you no good if it is stored in plain text and stolen by a cybercriminal. 

KPN has warned its customers that they should change any passwords they might have reused on other sites like Google or Facebook. 

To me, that is the real lesson here. You really \*need\* to use a unique password for every site you visit, or in the worst case at least for the important ones. 

Complexity is nice, entropy is great, but it is all for naught if your service provider can't hold up its end of the bargain.