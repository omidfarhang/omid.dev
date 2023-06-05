---
title: Google Chrome in Ubuntu erkennt weiterhin Netzwerkänderungen
date: 2017-07-06T19:14:41+00:00
layout: single
author_profile: true
url: 2017/07/06/google-chrome-in-ubuntu-erkennt-weiterhin-netzwerkanderungen/
shortlink: https://g.omid.dev/AvJmel9
image: /images/sites/3/2017/07/2015-05-25_1051099-1.jpg
tags:
  - chrome
  - Google
  - Linux
  - networking
  - ubuntu
lang: de
categories: 
  - techblog
---
Vor kurzem hatte ich ein Problem mit meinem Ubuntu. Wann immer ich versuchte, eine Website zu öffnen, teilte mir mein Chromium mit, dass eine Netzwerkänderung festgestellt wurde, und nach dem erneuten Laden von 1-2 wurden die Websites geladen und konnten manchmal nicht vollständig geladen werden.

After looking up for that problem, I found out many other people had same problem and it has something to do with [„avahi-daemon“](https://askubuntu.com/questions/905866/new-ubuntu-17-04-problem-your-connection-was-interrupted).

Nachdem ich nach diesem Problem gesucht hatte, stellte ich fest, dass viele andere das gleiche Problem hatten und es hat etwas mit „[avahi-daemon](https://askubuntu.com/questions/905866/new-ubuntu-17-04-problem-your-connection-was-interrupted)“ zu tun.

### Lösung

Laut den Links, die ich in den Ubuntu-Foren gefunden habe, ist dieses Problem auf IPv6 in Ubuntu zurückzuführen. Durch Deaktivieren dieses Dienstes wird es behoben. Ich habe es ausprobiert und es hat funktioniert:

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
