---
title: "Sun VirtualBox Update [3.1.4.57640]"
date: 2010-02-13T20:41:00+00:00
layout: single
author_profile: true
url: 2010/02/13/sun-virtualbox-update-3-1-4-57640/
tags:
  - AMD
  - Updates
lang: en
category: 
  - techblog
---
[![](http://2.bp.blogspot.com/_vaUVXcmC3OI/S3cGuZPL9LI/AAAAAAAAA8g/paK4gz7GWxQ/s640/virtualBox.gif)](http://2.bp.blogspot.com/_vaUVXcmC3OI/S3cGuZPL9LI/AAAAAAAAA8g/paK4gz7GWxQ/s1600-h/virtualBox.gif)

VirtualBox is a general-purpose full virtualizer for x86 hardware. Targeted at server, desktop and embedded use, it is now the only professional-quality virtualization solution that is also Open Source Software.

Some of the features of VirtualBox are:

Modularity. VirtualBox has an extremely modular design with well-defined internal programming interfaces and a client/server design. This makes it easy to control it from several interfaces at once: for example, you can start a virtual machine in a typical virtual machine GUI and then control that machine from the command line, or possibly remotely. VirtualBox also comes with a full Software Development Kit: even though it is Open Source Software, you don't have to hack the source to write a new interface for VirtualBox.  
Virtual machine descriptions in XML. The configuration settings of virtual machines are stored entirely in XML and are independent of the local machines. Virtual machine definitions can therefore easily be ported to other computers.

**Download**: <http://www.virtualbox.org/wiki/Downloads>

**Change Log:**

– VMM: SMP stability fixes  
– VMM: fixed guru meditation in certain rare cases (bug #5968)  
– VMM: activate NXE for PAE enabled guests (VT-x and AMD-V on 32 bits hosts only; bug #3578)  
– VMM: added workaround for broken BIOSes that make VirtualBox think AMD-V is in use (for details see bug #5639)  
– VMM: fixed rare host reboot when restoring a saved state (bug #3945)  
– VMM: fixed incompatibility with 2.6.32 Linux kernels (software virtualization only; bug #6100)  
– VMM: turn on nested paging by default for new VMs (if available; VT-x and AMD-V only)  
– VMM: turn on VPID by default for new VMs (if available; VT-x only)  
– VMM: perform strict CPUID compatibility checks when teleporting; to get the old behavior set “VBoxInternal/CPUM/StrictCpuIdChecks” to 0  
– VMM: fixed VM crash with certain 16 bits Windows applications (software virtualization only; bug #5399)  
– Snapshots: fixed a 3.1 regression that broke deletion of snapshots when a machine had immutable or writethrough storage attached (bug #5727)  
– Saved state: fixed VERR\_SSM\_LOADED\_TOO\_MUCH error when loading DisplayScreenshot(bug #6162)  
– VBoxManage: add restorecurrent operation to snapshots command  
– VBoxManage: fixed broken snapshot lookup by name (bug #6070  
– GUI: fixed the broken “Reload” button that reloads the machine XML when a machine is inaccessible  
– GUI: fixed guest fullscreen mode after reboot (bug #5372)  
– GUI: handle Ctrl+Break properly on X11 hosts (bug #6122)  
– GUI: fixed status LEDs for storage devices  
– GUI: workaround for disabling the seamless mode on KDE hosts (KWin bug)  
– 3D support: fixed SELinux warning saying VBoxOGL.so requires text relocation (bug #5690)  
– 3D support: fixed Corrupted surface rendering (bug #5695)  
– 3D support: free textures on guest application termination (bug #5206)  
– 3D support: fixed ubigraph_server crashes (#4674)  
– 3D support: fixes for 64-bit Solaris guests  
– Seamless: disable seamless mode when guest changes screen resolution (bug #5655)  
– NAT: fixed high CPU load under certain circumstances (Windows hosts only; bug #5787)  
– NAT: fixed handling of the broadcast flag in DHCP requests  
– NAT: fixed rare crash due to an assertion in the ICMP code (bug #3217)  
– Virtio-net: don't crash when ports accessed beyond the valid range (bug #5923)  
– LsiLogic: fix for Windows 7 guests  
– ATA: fix for guru meditation when installing Solaris 8 guests (bug #5972)  
– VHD: fixed an incompatibility with Virtual PC (bug #5990)  
– VHD: update the footer backup after setting a new UUID (bug #5004)  
– Host DVD: really fixed loading “passthrough” setting from config file (bug #5681)  
– Shared folders: fixed resolving of symlink target on Linux (3.1.2 regression)  
– VRDP: fixed VERR\_NET\_ADDRESS\_IN\_USE error when restarting a VM (3.1 regression; bug #5902)  
– VRDP: fixed crash on Mac OS X when 3D is enabled (3.1 regression)  
– PulseAudio: fixed recording (bug #4302)  
– USB: fixed a shutdown blue screen (Windows hosts only; bug #5885)  
– BIOS: fixed attribute during text scroll (bug #3407)  
– OVF: fix strange error messages on disk import errors  
– OVF: do not require write access the the .ovf file during import (3.1 regression; bug #5762)  
– iSCSI: fix taking snapshots of a running VM (#5849)  
– Guest Additions: fixed wrong guest time adjustment if the guest clock is ahead (3.1 regression; non-Windows guests only)  
– Windows Additions: fixed malfunctioning !VBoxService that broke time-sync (bug #5872)  
– Windows Additions: fixed uninstallation issues on 64-bit guests  
– Windows Additions: fixed some sysprep execution issues  
– X.Org Additions: never reject the saved video mode as invalid (bug #5731)  
– XFree86 Additions: accept video mode hints for the initial mode again