---
date: 2026-09-22T19:41:00+03:30
url: notes/179009348551299773/
source: https://discourse.ubuntu.com/t/ubuntu-desktop-26-10-stonking-stingray-roadmap-building-toward-ubuntu-28-04-lts/83751
---
Ubuntu 26.10 "Stonking Stingray" hit [Beta Freeze](https://discourse.ubuntu.com/t/announcing-7-2-kernel-for-ubuntu-26-10-stonking-stingray/83393) (Sep 21). Beta images are aimed at Sep 24; final is still Oct 15. The interim release is doing the boring-but-load-bearing work toward 28.04: [dbus-broker](https://discourse.ubuntu.com/t/ubuntu-26-10-is-switching-to-dbus-broker/84060) replaces dbus-daemon for system and session buses, Rust [uutils coreutils](https://www.phoronix.com/news/Ubuntu-Completes-Rust-Coreutils) finishes the `cp`/`mv`/`rm` holdouts, and the kernel target stepped up to 7.3.

I am not jumping from Manjaro for a beta. What I am watching is the same class of change as in [How Ubuntu Ships Releases](/2022/12/30/how-to-upgrade-ubuntu/): defaults that look invisible until an upgrade path or a greeter/session edge case is not. If dbus-broker or the last uutils swaps bite anyone with scars before Oct 15, that is worth a field note. Until then: freeze means the shape is mostly locked — not that your desktop machine should be the first tester.
