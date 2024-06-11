---
title: 'Solving the Dropbox Connecting Tray Icon Issue on Manjaro KDE'
date: 2024-06-11T17:33:06+03:30
layout: single
author_profile: true
url: 2024/06/12/dropbox-tray-icon-connecting/
shortlink: https://g.omid.dev/gh0ZC7Z
tags:
  - Manjaro
  - KDE
  - Dropbox
lang: en
categories: 
  - techblog
---
![dropbox-before-after](/images/2024/06/dropbox-before-after.jpg)

If you're using Manjaro KDE and rely on Dropbox for file syncing, you might have encountered a frustrating issue where the Dropbox tray icon perpetually shows "connecting" while the app itself works and syncs files perfectly in the background. After spending considerable time experimenting with various solutions, I finally found a fix that resolves this issue.

## The Issue

After installing the Dropbox AUR package on my Manjaro KDE system, everything seemed to work fine except for the tray icon. It kept displaying "connecting" indefinitely. This was annoying because it made it hard to quickly check the sync status of my files without opening the main application window.

## The Culprit: `dbus-broker`

After trying several different solutions without success, I discovered that the issue was related to `dbus-broker`, the default D-Bus message bus daemon used by Manjaro KDE. It turns out that `dbus-broker` has some compatibility issues with Dropbox, causing the tray icon problem.

## The Solution: Downgrade to `dbus-daemon`

To fix this issue, I needed to switch from `dbus-broker` to `dbus-daemon`. Here’s a step-by-step guide on how to do it:

### 1. Install `dbus-daemon`

First, you need to install `dbus-daemon`. You can do this by running the following command in the terminal:

```bash
sudo pacman -S dbus-daemon-units
```

when it asks for conflicting packages, answer it with `y` and let it complete the tasks:

```bash
resolving dependencies...
looking for conflicting packages...
:: dbus-daemon-units-1.14.10-2 and dbus-broker-units-36-2 are in conflict. Remove dbus-broker-units? [y/N]
```

Once the process is done, you may notice some weired behavior with your system like disconnting wifi or timeout some services. In that case a hard reboot will fix it and you can ignore the following steps.

### 2. Disable `dbus-broker` and Enable `dbus-daemon` if exist

Next, you need to disable `dbus-broker` and enable `dbus-daemon` if you did not uninstall it yet. You can do this by running the following commands:

```bash
sudo systemctl disable --now dbus-broker.service
sudo systemctl enable --now dbus-daemon.service
```

### 3. Restart Your System

To ensure that the changes take effect, it’s best to restart your system:

```bash
sudo reboot
```

### 4. Verify the Fix

After your system restarts, check the Dropbox tray icon. It should now display the correct status instead of being stuck on "connecting."

## Conclusion

Switching from `dbus-broker` to `dbus-daemon` resolved the Dropbox tray icon issue on my Manjaro KDE system. It's a simple yet effective fix that ensures the tray icon correctly reflects the sync status of Dropbox. If you encounter the same issue, give this solution a try, and you should be back to enjoying a seamless Dropbox experience on Manjaro KDE.

Happy syncing!

---

Feel free to leave a comment if you have any questions or if this solution worked for you. Your feedback helps the community and me to keep improving our shared knowledge.
