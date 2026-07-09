---
title: "Building a Tiny Linux App to Explain Desktop Stutter"
date: 2026-06-04T01:38:00+03:30
description: "A hands-on Rust/Linux app walkthrough: build a small TUI that reads /proc and /sys, parses Pressure Stall Information, and turns kernel signals into an explanation for desktop stutter."
layout: single
author_profile: true
url: 2026/06/04/building-a-tiny-linux-app-to-explain-desktop-stutter/
shortlink: https://g.omid.dev/uJPPO8M
x_link: https://x.com/omidfarhang/status/2062300889482977435
mastodon_link: https://mastodon.social/@omidfarhang/116688542867790143
bluesky_link: https://bsky.app/profile/omid.dev/post/3mng5x7oios22
linkedin_link: https://www.linkedin.com/posts/omidfarhang_building-a-tiny-linux-app-to-explain-desktop-share-7468066806700789761-P2fG/
tags:
  - Linux
  - Desktop Linux
  - Kernel
  - Rust
  - Performance
  - PSI
  - cgroups
categories:
  - TechBlog
series:
  id: linux-desktop-lab
  title: "Linux Desktop Lab"
  order: 1
  label: "Building a Tiny Linux App to Explain Desktop Stutter"
  role: part
seeAlso:
  - /2026/06/03/ubuntu-manjaro-and-the-linux-desktop-im-rethinking/
  - /2026/06/16/how-i-learned-my-linux-machine-has-been-compressing-memory-for-years/
---
I wanted an excuse to build a small real Linux app.

Not a shell script. Not a giant desktop application. Not a kernel module. Just a focused program that talks to Linux through the interfaces the system already exposes, gives that data a shape, and presents it as something a normal desktop user can run.

Desktop stutter turned out to be a good excuse.

My own machine is not slow: modern CPU, fast NVMe storage, plenty of RAM, KDE Plasma on Wayland, and a current kernel. Most of the time it feels excellent. Then, once in a while, the pointer hesitates, a window animation misses a beat, audio gets a tiny crackle, or the browser pauses while a package update or build is running.

The developer question behind that moment is useful:

**Can we build a tiny Linux app that asks what the desktop was waiting for?**

That is the shape of this post. We will use desktop stutter as the problem, Linux Pressure Stall Information as the kernel signal, and Rust as the language for turning `/proc` and `/sys` data into a small TUI called **Latency Lens**.

The app is intentionally tiny. It is not here to outclass Linux's serious observability tools. It is here to show the path: choose a useful kernel interface, read it, parse it, interpret it, and present it as a user-facing tool.

{{< companion
  repo="omidfarhang/example-projects"
  path="latency-lens"
  title="Latency Lens Companion App"
  description="A tiny Rust/Linux TUI example that reads /proc and /sys, parses PSI, and turns kernel signals into a user-facing explanation."
  demoSlug="latency-lens"
  label="Open the companion app"
>}}

## The old performance story is not enough

For years, desktop performance conversations leaned on easy numbers:

- CPU usage
- RAM usage
- boot time
- FPS
- package manager speed
- benchmark scores

Those numbers are not useless, but they are often the wrong shape for desktop smoothness.

A desktop session is not a batch job. It is a pile of latency-sensitive work sharing the same machine:

- the compositor wants predictable frame timing;
- PipeWire wants audio callbacks to happen on time;
- the browser wants bursty CPU;
- the IDE wants filesystem scans, TypeScript servers, and language indexes;
- package managers want CPU, disk, and network;
- backups and indexers want background throughput;
- games want GPU and CPU coordination;
- the kernel has to keep the whole thing fair enough without making the foreground feel ignored.

The pain is rarely "my CPU averaged 100% for ten minutes."

The pain is more often:

**Something important woke up and waited too long.**

That is a latency problem, not just a throughput problem.

## Average speed hides desktop pain

Imagine the compositor needs to draw the next frame, but runnable tasks are already queued on busy CPU cores. Or an app tries to read a file while the disk is busy with package extraction. Or memory reclaim starts because a browser, an IDE, a VM, and a few Electron apps are all very confident about your RAM.

The machine can still be "fast" in the average sense.

But the user only needs one bad moment to feel it.

That is why desktop stutter is such a strange bug report. It often sounds vague:

- "It froze for a second."
- "The mouse felt sticky."
- "Audio cracked during a build."
- "The browser lagged but CPU usage was not crazy."
- "The desktop felt slow while the system monitor looked fine."

Those are not imaginary symptoms. They are just symptoms that do not map neatly to the old resource graphs.

## PSI: the kernel already has a better signal

Linux has a feature called **Pressure Stall Information**, usually shortened to **PSI**.

PSI answers a different question from CPU usage or memory usage.

Instead of asking "how much of a resource is being used?", it asks:

**How much time did tasks spend stalled because they could not get a resource they needed?**

That distinction matters.

On a modern Linux system, you may have these files:

```text
/proc/pressure/cpu
/proc/pressure/io
/proc/pressure/memory
```

They look roughly like this:

```text
some avg10=0.23 avg60=0.21 avg300=0.12 total=1234567
full avg10=0.00 avg60=0.00 avg300=0.00 total=0
```

The exact values will differ, but the idea is simple:

- `avg10` is recent pressure over about 10 seconds;
- `avg60` is the longer one-minute view;
- `avg300` is the five-minute view;
- `some` means at least some tasks were stalled;
- `full` means all non-idle tasks were stalled at once, where that definition applies.

For desktop use, the short window is especially useful. If I felt a hitch a few seconds ago, I care more about the recent pressure than a smooth average over the whole day.

## CPU pressure is not CPU usage

CPU usage tells you how busy the CPU was.

CPU pressure tells you whether tasks were waiting to run.

That is a different story.

A system can have high CPU usage and still feel acceptable if the important interactive work gets scheduled quickly. It can also feel bad if foreground work competes with builds, browser processes, containers, indexing, or background services at the wrong moment.

This is why scheduler work matters to desktop users, even if they never read kernel mailing lists.

Linux moved from the long CFS era into EEVDF as the default scheduler design, and there is serious experimentation around `sched_ext`, where scheduler policy can be expressed through BPF. Those are deep kernel topics, but the desktop-level question is understandable:

**Can the system keep latency-sensitive work responsive while still making fair progress on everything else?**

That is the actual feeling of "smooth."

## I/O pressure is the hidden desktop villain

I/O pressure is where many "my desktop is slow but CPU looks fine" moments become less mysterious.

Package updates, browser cache activity, Baloo indexing, Flatpak/Snap updates, VM images, build directories, logs, downloads, backups, and btrfs maintenance can all compete for storage.

On NVMe, this is better than it used to be. It is not gone.

If tasks are stalled behind storage, the CPU may look calm while the desktop feels sticky. That is exactly the kind of situation where PSI is more honest than a CPU graph.

Latency Lens treats elevated I/O pressure as a first-class explanation:

```text
Likely cause: I/O pressure is elevated; desktop stalls may come from storage contention rather than CPU saturation.
```

That one sentence is more useful than staring at ten graphs and guessing.

## Memory pressure is where "plenty of RAM" gets complicated

Memory pressure does not only mean "you ran out of RAM."

It can mean the kernel is spending time reclaiming pages, compacting memory, or pushing pressure toward swap or zram. It can happen because one app is huge, but it can also happen because the modern desktop is a crowd:

- browser tabs;
- Electron apps;
- IDE language servers;
- containers;
- virtual machines;
- file indexers;
- game launchers;
- background sync clients.

The system may recover quickly. You may never see an obvious out-of-memory event. But during reclaim, the desktop can still hitch.

Again, the question is not only "how much memory is used?"

The question is:

**Did memory management make tasks wait?**

## cgroups made desktop performance more political

There is another layer here: cgroups.

On current Linux desktops, especially systemd-based ones, processes do not just exist as a flat list of PIDs. They live inside slices, scopes, services, user sessions, app sandboxes, and sometimes containers.

That matters because resource control is no longer just:

```bash
nice -n 10 some-command
```

The desktop is increasingly organized through cgroup v2, systemd user units, app launchers, portals, Flatpak sandboxes, browser process trees, and service scopes.

The kernel sees resource usage. systemd gives it structure. Desktop environments and app packaging systems decide, sometimes indirectly, how processes enter that structure.

So desktop performance becomes a policy question:

**Which work should be protected when the system is under pressure?**

Your compositor? Audio? The foreground app? A compile job? A container? A game? A backup? A browser tab playing a call?

This is where desktop Linux starts to feel closer to systems engineering than theme tweaking.

## So I built a tiny app: Latency Lens

I wanted a companion example that was more real than a shell script but still small enough to read in one sitting.

So I built **Latency Lens**, a Rust terminal app that reads:

```text
/proc/pressure/cpu
/proc/pressure/io
/proc/pressure/memory
/proc/loadavg
/proc/uptime
/sys/fs/cgroup
```

It has two modes.

For a quick snapshot:

```bash
cargo run -- --once
```

Example output from my machine while the system was calm:

```text
Latency Lens - kernel pressure snapshot

  CPU: 0.23% avg10 | 0.21% avg60 | Minimal
  I/O: 0.00% avg10 | 0.00% avg60 | Minimal
  Memory: 0.00% avg10 | 0.00% avg60 | Minimal

Load average: 1.65 (1m) / 0.81 (5m) / 0.61 (15m), 3 runnable of 2627 tasks
Uptime: 9h 55m

No significant kernel-reported pressure right now.
CPU, I/O, and memory PSI averages are all below 1% over the last 10 seconds.
cgroup v2 unified hierarchy detected (systemd slices use this for resource control).
```

For live monitoring:

```bash
cargo run
```

That opens a small TUI with CPU, I/O, and memory pressure gauges. Press `q` to quit and `r` to refresh.

## This is not trying to beat Linux's real tools

Let me be clear: Linux already has far better monitoring and debugging tools than this tiny companion app.

If I were seriously chasing a production performance problem, I would reach for tools like `perf`, `trace-cmd`, ftrace, `bpftrace`, `bcc`, `bpftop`, `iotop`, `pidstat`, `systemd-cgtop`, `journalctl`, `htop`, `btop`, `strace`, or whatever fits the shape of the problem. The Linux ecosystem is not short on observability.

Latency Lens is not trying to replace any of that.

The point is different: it is an excuse to build a small, real Linux app and show the path from kernel interface to user-facing tool.

That path is less intimidating than it looks:

1. Find a kernel interface that exposes useful state.
2. Read it as normal text from `/proc` or `/sys`.
3. Parse it into typed data.
4. Add a small layer of interpretation.
5. Present it in a CLI or TUI that a normal user can run.

That is a Linux app.

Not a toy in the sense of "fake." Not a monitoring suite either. Just a focused program that talks to the operating system through the same public surfaces many serious tools use.

That is what I wanted to demonstrate. You do not need to start with kernel modules, packaging formats, D-Bus services, or a full GTK application to write something that feels native to Linux. You can start with one honest system question and one readable kernel file.

## Building it: from kernel file to app state

The first version of Latency Lens follows a simple rule: **no privileged tricks before the basic path is clear.**

So the app starts with the most boring Linux API possible:

```rust
const PSI_CPU: &str = "/proc/pressure/cpu";
const PSI_IO: &str = "/proc/pressure/io";
const PSI_MEMORY: &str = "/proc/pressure/memory";
const LOADAVG: &str = "/proc/loadavg";
const UPTIME: &str = "/proc/uptime";
const CGROUP_ROOT: &str = "/sys/fs/cgroup";
```

That is already enough to build something useful.

The next step is to stop treating those files as strings and give the kernel data a shape:

```rust
#[derive(Debug, Clone, PartialEq)]
pub struct PsiLine {
    pub kind: PsiKind,
    pub avg10: f64,
    pub avg60: f64,
    pub avg300: f64,
    pub total_us: u64,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum PsiKind {
    Some,
    Full,
}

#[derive(Debug, Clone, PartialEq)]
pub struct PsiMetrics {
    pub some: Option<PsiLine>,
    pub full: Option<PsiLine>,
}
```

This is the point where the example stops being "read a text file" and starts being an app.

Once `some avg10=0.23 avg60=0.21 ...` becomes a `PsiLine`, the rest of the program can talk in domain terms: CPU pressure, I/O pressure, memory pressure, short-window averages, missing PSI sources, and diagnosis.

The parser is intentionally plain:

```rust
pub fn parse_psi_contents(contents: &str) -> Result<PsiMetrics, PsiError> {
    let mut some = None;
    let mut full = None;

    for line in contents.lines() {
        let trimmed = line.trim();
        if trimmed.is_empty() {
            continue;
        }

        let parsed = parse_psi_line(trimmed)?;
        match parsed.kind {
            PsiKind::Some => some = Some(parsed),
            PsiKind::Full => full = Some(parsed),
        }
    }

    Ok(PsiMetrics { some, full })
}
```

No magic. Read lines, parse tokens, return typed state.

Then `sampler.rs` collects one system snapshot:

```rust
pub trait PressureSampler: Send + Sync {
    fn sample(&self) -> Result<SystemSnapshot, SampleError>;
}

#[derive(Debug, Default, Clone, Copy)]
pub struct ProcSampler;

impl PressureSampler for ProcSampler {
    fn sample(&self) -> Result<SystemSnapshot, SampleError> {
        collect_snapshot()
    }
}
```

That trait is small, but it gives the app a real boundary. Today the sampler reads `/proc` and `/sys`. Tomorrow another sampler could read scheduler tracepoints through eBPF without forcing the UI or diagnosis code to care.

The snapshot itself is just the app's model of the current machine:

```rust
pub struct SystemSnapshot {
    pub cpu: Option<PsiMetrics>,
    pub io: Option<PsiMetrics>,
    pub memory: Option<PsiMetrics>,
    pub load: Option<LoadAverage>,
    pub uptime_secs: Option<f64>,
    pub cgroup: CgroupInfo,
    pub psi_missing: Vec<String>,
}
```

That is the development path I wanted the companion project to show:

```text
/proc and /sys -> parser -> sampler -> snapshot -> diagnosis -> TUI
```

It is small enough to read, but it is not fake. It has modules, errors, parsing tests, a CLI, and a live UI. That is a good scale for learning how Linux apps are built.

## Why Rust and not a shell script?

A shell script could read the files.

That would miss the point.

I wanted this to be a small real Linux app, not a pile of `awk` glued to `watch`. Rust gives the example enough structure to show actual application boundaries:

- `psi.rs` parses the kernel PSI format;
- `sampler.rs` reads `/proc` and `/sys` behind a `PressureSampler` trait;
- `diagnosis.rs` converts numbers into desktop explanations;
- `ui.rs` renders the TUI and one-shot output;
- `main.rs` handles the CLI.

That structure matters for the article because it mirrors the mental model:

```text
kernel pseudo-files -> sampler -> diagnosis -> human explanation
```

The code is still small, but it is shaped like an app.

## The eBPF path I did not take yet

There is an obvious deeper version of this project.

Attach to scheduler tracepoints with eBPF. Measure wakeup latency. Track runtime delays. Correlate spikes with processes, cgroups, and foreground activity. Build a desktop latency profiler that can say "this process tree caused the hitch."

That would be fascinating.

It would also make the first version harder to run, harder to explain, and more dependent on privileges, kernel config, BTF availability, and distro packaging.

So version 1 deliberately does not require eBPF.

The code keeps the door open with a sampler boundary and a hidden `--experimental-ebpf` placeholder, but the useful default is boring in the best way: read kernel interfaces that already exist and explain them clearly.

That is the right tradeoff for a companion app.

## What I want developers to take away

The important part of Latency Lens is not that it is the best way to debug a Linux desktop. It is not.

The important part is the path:

```text
kernel signal -> typed parser -> snapshot -> diagnosis -> CLI/TUI
```

That path is approachable.

A small Linux app does not have to start with privileged tracing, D-Bus, a packaging system, or a full graphical toolkit. It can start with a real question and one readable kernel interface.

In this case, the question was:

**What did my interactive work wait behind?**

And the interface was PSI:

```text
/proc/pressure/cpu
/proc/pressure/io
/proc/pressure/memory
```

PSI will not tell you which exact app caused a frame miss. It will not replace `perf`, ftrace, `bpftrace`, profiling, or careful debugging. But it is enough to build a useful first version and, more importantly for this post, enough to show how a Linux app can grow from a kernel pseudo-file into a user-facing tool.

That is the lesson I wanted from this companion project: Linux app development does not have to begin as something huge.

Start by reading the system honestly. Then give what you read a shape.
