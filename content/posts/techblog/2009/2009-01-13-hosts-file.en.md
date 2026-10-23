---
title: Hosts File
date: 2009-01-13T23:50:43+03:30
description: How the local hosts file works as an address book for hostnames — and how mapping ad or malware domains to 127.0.0.1 blocks them before DNS is asked.
layout: single
author_profile: true
url: 2009/01/13/hosts-file/
tags:
  - Safety Tips
  - Guide
  - Security

categories:
  - TechBlog

seeAlso:
  - /2009/01/13/protect-hosts-file/
  - /2009/01/13/antivirus/
  - /2009/01/13/site-advisor/
---
You can block a lot of ads and tracking by editing the **hosts** file on Windows and other operating systems. It is a local override that runs *before* your ISP’s DNS — useful against known bad domains as well as noisy ad servers.

Once you rely on a custom hosts file, also read [Protect Hosts File](/2009/01/13/protect-hosts-file/) so malware cannot quietly rewrite it. Pair with a real [antivirus](/2009/01/13/antivirus/) and, where helpful, a [site advisor](/2009/01/13/site-advisor/)-style reputation tool.

## What is the Hosts file, and how does it stop ads and tracking?

### The Short Answer

The short answer is that the Hosts file is like an address book. When you type an address like www.yahoo.com into your browser, the Hosts file is consulted to see if you have the IP address, or "telephone number," for that site. If you do, then your computer will "call it" and the site will open. If not, your computer will ask your ISP's (internet service provider) computer for the phone number before it can "call" that site. Most of the time, you do not have addresses in your "address book," because you have not put any there. Therefore, most of the time your computer asks for the IP address from your ISP to find sites.

If you put ad server names into your Hosts file with your own computer's IP address, your computer will never be able to contact the ad server. It will try to, but it will be simply calling itself and get a "busy signal" of sorts. Your computer will then give up calling the ad server and no ads will be loaded, nor will any tracking take place. Your choices for blocking sites are not just limited to blocking ad servers. You may block sites that serve advertisements, sites that serve objectionable content, or any other site that you choose to block.

### The Longer, More Technically Oriented Answer

The "Hosts" file in Windows and other operating systems is used to associate host names with IP addresses. Host names are the www.yahoo.com addresses that you see every day. IP addresses are numbers that mean the same thing as the www words - the computers use the numbers to actually find the sites, but we have words like www.yahoo.com so humans do not need to remember the long strings of numbers when they want to visit a site.

For instance, the host name for Yahoo! is www.yahoo.com, while its IP address is 204.71.200.67 Either address will take you to Yahoo!'s site, but the www address will first have to be translated into the IP address. If you type in the IP address directly, your computer will not have to look it up.

A series of steps are used when searching for IP addresses that go with these host names. The first step, and the one that concerns us here, is the hosts file on your local computer. The Hosts file tells your computer what the name is in numbers so the computer can go find it. If the IP address is found in your Hosts file, the computer will stop looking and go to that site, but if it is not it will ask a DNS computer (domain name server) for the information. Since the search ends once a match is found, that provides us with a mechanism to block sites we have no interest in. You may block sites that serve advertisements, sites that serve objectionable content, or any other site that you choose to block.

We can put names and addresses into the Hosts file so your computer does not have to ask a DNS server to translate the domain name into an IP number. This speeds up access to the host site you want to see because your computer no longer has to query other systems on the Internet for the address translation. When you type in a web address like www.yahoo.com, the host name portion of the web address is translated into an IP address before the site is accessed. If you put Yahoo!'s host and IP settings into your Hosts file, it would load a little quicker because your computer doesn't have to ask another to translate where to look for Yahoo!

Computers have a host address of their own - it is known as the "localhost" address, with an IP address of 127.0.0.1 which it uses to refer to itself. If you associate another computer's host name with your localhost IP address, you have effectively blocked that host since all attempts to access it will lead back to you. That is how we will block sites using the Hosts file. We will tell our computer that the IP address of the site we want to block is our own address. That way, our computer will not ever leave and go looking for the site we are blocking - which keeps that site from appearing because the computer thinks it has found the site and displayed it already.

Many web sites have links to other servers for the retrieval of advertisements. In the case of those web servers, the browser will quickly fail to locate the requested data (scripts, images, etc.) from the advertising server because we told our computer to look for the information on itself - of course it won't find any of it and will quit looking for it - and will continue loading the pertinent portions of the page you want to see. This will keep your computer from even talking to the ad servers, and thus you won't see the ads, they can't put cookies on your hard drive, and you can't be profiled by them.
