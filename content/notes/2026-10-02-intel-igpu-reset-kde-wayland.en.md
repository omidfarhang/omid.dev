---
date: 2026-10-02T00:40:00+03:30
url: notes/179088904703293484/
---
KDE popped “Desktop effects were restarted due to a graphics reset” on Manjaro Plasma Wayland (hybrid Intel Arc + NVIDIA). That notification is a symptom, not a diagnosis. The useful work is in the journal and the `i915` error state — before reboot, because `/sys/class/drm/card*/error` is gone after.

```bash
# Kernel side: DRM / GPU / hang / reset
journalctl -k -b | grep -Ei 'drm|gpu|i915|xe|nvidia|reset|hang|fault'

# Compositor / shell reaction
journalctl -b | grep -Ei 'kwin|plasmashell|GL_CONTEXT_LOST|graphics reset|device lost'

# After a hang, capture the crash dump Intel wants (cardN from the dmesg line)
sudo cat /sys/class/drm/card1/error | bzip2 > i915-error.bz2
```

What showed up: fence timeouts on `kwin_wayland`, then an Intel hang and chip reset — not an NVIDIA reset:

```text
Fence expiration time out i915-0000:00:02.0:kwin_wayland[…]:…
i915 0000:00:02.0: [drm] GPU HANG: ecode 12:0:00000000
i915 0000:00:02.0: [drm] GPU error state saved to /sys/class/drm/card1/error
i915 0000:00:02.0: [drm] GT0: Resetting chip for stopped heartbeat on rcs0
```

Same second, fences also expired for plasmashell’s `QSGRenderThread` and `wined3d_cs`. KWin/Plasma then lost GL and recovered:

```text
kwin_wayland: A graphics reset not attributable to the current GL context occurred.
kwin_wayland: GL_CONTEXT_LOST in context lost
plasmashell: Graphics device lost, cleaning up scenegraph and releasing RHI
```

~8s later a second hang named Wine:

```text
i915 … GPU HANG: ecode 12:1:85dffdfb, in wined3d_cs […]
i915 … wined3d_cs[…] context reset due to GPU hang
```

Wine/Proton may have stressed the GPU, but the failure is in the Intel Linux graphics stack under Wayland: kernel `i915`, GuC/DMC/HuC firmware, Mesa, power management, KWin’s DRM path. Distro choice only changes package versions of that same upstream stack — Kubuntu does not ship a different Intel driver.

Report path and reading: [how to file i915 bugs](https://drm.pages.freedesktop.org/intel-docs/how-to-file-i915-bugs.html), [GPU error state](https://www.intel.com/content/www/us/en/docs/graphics-for-linux/developer-reference/1-0/gpu-error-state.html), [drm/i915 issues](https://gitlab.freedesktop.org/drm/i915/kernel/-/issues), [i915 docs](https://docs.kernel.org/gpu/i915.html). Hybrid session context on this machine: [Ubuntu, Manjaro, and the Linux Desktop](/2026/06/03/ubuntu-manjaro-and-the-linux-desktop-im-rethinking/).
