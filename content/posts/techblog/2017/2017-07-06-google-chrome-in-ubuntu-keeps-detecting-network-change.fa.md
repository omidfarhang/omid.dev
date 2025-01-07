---
title: گوگل کروم در اوبونتو سایتی رو باز نمیکنه و مرتب میگه که شبکه تغییر کرد
date: 2017-07-06T23:14:05+00:00
layout: single
author_profile: true
url: 2017/07/06/google-chrome-in-ubuntu-keeps-detecting-network-change/
shortlink: https://g.omid.dev/2suTpAT
lang: fa
categories: 
  - TechBlog
---
چند روز بود که با شبکه اوبونتوم مشکل داشتم، هربار که میخواستم یک سایتی رو با کرومیوم باز کنم میگفت که تغییری در شبکه م به وجود اومده و باید چندبار صفحه رو ریلود میکردم تا باز شه و گاهی کلا باز نمیشد.

یه مقداری که گشتم، فهمیدم که مشکل با [“avahi-daemon”](https://askubuntu.com/questions/905866/new-ubuntu-17-04-problem-your-connection-was-interrupted) در ارتباطه.

### راه حل

طبق چیزی که توی فوروم اوبونتو نوشته شده بود، این مشکل به خاطر IPv6 اوبونتو هستش و غیرفعال کردن اون فعلا مشکل رو برطرف میکنه، تست کردم و برای من کار کرد:

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