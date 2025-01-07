---
title: How To Use Cloudflare WARP On Linux
date: 2022-11-27T01:33:51+03:30
layout: single
author_profile: true
url: 2022/11/27/how-to-use-cloudflare-warp-on-linux/
shortlink: https://g.omid.dev/sMrrjTP
tags:
  - linux
  - CloudFlare
  - Warp
  - network
lang: en
categories: 
  - TechBlog
---

## What is WARP?

The Cloudflare WARP client allows individuals and organizations to have a faster, more secure, and more private experience online. The WARP client sits between your device and the Internet, and has several connection modes to better suit different needs.

## Install

Installing Warp Client (aka Cloudflare Zero Trust Client) is so easy, specially if your OS uses AUR.

### AUR

Use your AUR helper to find and install `cloudflare-warp-bin`, for example I use yay here:

```bash
yay -S cloudflare-warp-bin
```

### APT/YUM

If your OS Does not support AUR:

#### apt-based OS (like Ubuntu)

```sudo apt install cloudflare-warp```

#### yum-based OS (like CentOS or RHEL)

```sudo yum install cloudflare-warp```

### Manual

Or get the latest WARP clients manually.

* [Package repository](https://pkg.cloudflareclient.com/packages/cloudflare-warp)
* [APT/YUM repository](https://pkg.cloudflareclient.com/install)

## First Run

After installing WARP client, you have to enable the relevant services:

```bash
sudo systemctl enable --now warp-svc.service
```

Or if you want to start it once to give it a try:

```bash
sudo systemctl start warp-svc.service
```

Also if you want to have taskbar icon to see the status

```bash
systemctl --user enable --now warp-taskbar
```

Now you can start using it, to register your device, run the following command:

```bash
warp-cli register
```

and then to connect or disconnect:

```bash
warp-cli connect
```

```bash
warp-cli disconnect
```

Also if you already own WARP+ account on your phone, you may use your account ID on your desktop:

```bash
warp-cli set-license <YOUR-ACCOUNT-ID>
```

Feel free to ask any questions you have.
