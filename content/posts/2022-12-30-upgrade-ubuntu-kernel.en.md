---
title: How to Upgrade Ubuntu Kernel
date: 2022-12-30T23:55:43+03:30
layout: single
author_profile: true
url: 2022/12/30/how-to-upgrade-ubuntu-kernel/
shortlink: https://g.omid.dev/KaQylFt
tags:
  - How to
  - linux
  - Ubuntu
  - Kernel
lang: en
categories: 
  - techblog
---
Ubuntu by default uses LTS Kernels:

> Canonical provides long-term support (LTS) kernels for Ubuntu LTS releases. Canonical also provides interim operating system releases with updated kernels every 6 months.
>
> For customers and business partners that don’t have specialised bleeding-edge workloads or latest hardware needs, the latest LTS release ”-generic” kernel is the best option for them such as the 4.15 default kernel in Ubuntu 18.04 LTS. Customers who need the latest hardware support capability can install the latest HWE kernel such as the ones contained in interim releases, keeping in mind the shorter support lifespan associated with these kernels (9 months). HWE kernel customers are recommended to upgrade to a newer LTS release that supports their hardware and/or software needs as soon as it is available. Another option for customers is to use point releases. For example, there is an 18.04.4 point release as of February 2020, which includes an updated 5.3.x kernel but is also considered LTS, exactly like the original GA 4.15 kernel in 18.04.

If you want to use newer Kernel for your Ubuntu, the easiest solution is using Mainline

## Install Mainline App

Installing Mainline is easy, like many other apps, add the repo, update the sources and install:

```bash
sudo add-apt-repository ppa:cappelikan/ppa
sudo apt update
sudo apt install mainline
```

## Use Mainline to upgrade Kernel

You can either use the GUI or CLI to use Mainline, I will go by CLI:

### Install latest kernel

```bash
sudo mainline --install-latest
```

Once installation is done, reboot the system to use new Kernel. And then you can cleanup older kernels:

```bash
sudo mainline --uninstall-old
```

### Other Options of mainline

```
mainline 1.0.18 - Ubuntu Mainline Kernel Installer

Syntax: mainline <command> [options]

Commands:

  --check             Check for kernel updates
  --notify            Check for kernel updates and notify current user
  --list              List all available mainline kernels
  --list-installed    List installed kernels
  --install-latest    Install latest mainline kernel
  --install-point     Install latest point update for current series
  --install <name>    Install specified mainline kernel(1)
  --uninstall <name>  Uninstall specified kernel(2)
  --uninstall-old     Uninstall kernels older than the running kernel
  --download <name>   Download specified kernels(2)
  --clean-cache       Remove files from application cache

Options:

  --include-unstable  Include unstable and RC releases
  --hide-unstable     Hide unstable and RC releases
  --debug           Enable verbose debugging output
  --yes             Assume Yes for all prompts (non-interactive mode)
  --user            Override user

Notes:
(1) A version string taken from the output of --list
(2) One or more version strings (comma-separated) taken from the output of --list
```