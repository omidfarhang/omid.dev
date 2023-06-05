---
title: How to Upgrade Ubuntu
date: 2022-12-30T23:55:43+03:30
layout: single
author_profile: true
url: 2022/12/30/how-to-upgrade-ubuntu/
shortlink: https://g.omid.dev/r0QrWud
tags:
  - How to
  - linux
  - Ubuntu
lang: en
categories: 
  - kb
---
## Update Release Name in Sources

To start upgrading you need to change the /etc/apt/sources.list file and replace the name of your previous release with new one. So, for example if you are 20.04, replace every instance of focal with kinetic. If you currently have 22.04, replace jammy with kinetic.

This process can be automated by using the following sed command:

```bash
sudo sed -i 's/jammy/kinetic/g' /etc/apt/sources.list
```

Then, look in ```/etc/apt/sources.list.d/```. Change any files in there the same way.

## Ubuntu Update and Ubuntu Upgrade

Now, you can run the Ubuntu dist upgrade. First, update the Apt sources. Then, run the Ubuntu upgrade.

```bash
sudo apt update
sudo apt full-upgrade
```

The upgrade should take a bit of time. Chances are, every package on the system will be upgraded. When the Ubuntu upgrade does finish, reboot the system. When the system comes back up, you’ll be running desired Ubuntu release.

## What if something went wrong after upgrade?

If you found some package are not working as expected usually re-configuring them after upgrade fixes common problems:

```bash
sudo dpkg --configure -a
```

Also if you got 404 error on sources, you may need to downgrade that source back to last release until they update the repo to match your ubuntu release.
