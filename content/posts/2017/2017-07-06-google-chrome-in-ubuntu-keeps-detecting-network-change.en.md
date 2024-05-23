---
title: Google Chrome in Ubuntu keeps detecting network change
date: 2017-07-06T19:14:41+00:00
layout: single
author_profile: true
url: 2017/07/06/google-chrome-ubuntu-keeps-detecting-network-change/
shortlink: https://g.omid.dev/2tNmE5z
image: /images/sites/3/2017/07/2015-05-25_1051099-1.jpg
tags:
  - chrome
  - Google
  - Linux
  - networking
  - ubuntu
lang: en
categories: 
  - techblog
---
Recently I had problem with my Ubuntu, Whenever I tried to open a website my Chromium told me that a Network Change has been detected and after 1-2 reload that sites would load and sometimes failed to load fully.

After looking up for that problem, I found out many other people had same problem and it has something to do with [“avahi-daemon”](https://askubuntu.com/questions/905866/new-ubuntu-17-04-problem-your-connection-was-interrupted).

### Solution

According to the links I found in Ubuntu forums, this problem comes from IPv6 in Ubuntu and disabling that service will fix it, I tried it and it worked:

```shell
# create the long-life config file
echo "net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
net.ipv6.conf.lo.disable_ipv6 = 1" | sudo tee /etc/sysctl.d/99-my-disable-ipv6.conf

# ask the system to use it
sudo service procps reload

# check the result
cat /proc/sys/net/ipv6/conf/all/disable_ipv6
```

&nbsp;