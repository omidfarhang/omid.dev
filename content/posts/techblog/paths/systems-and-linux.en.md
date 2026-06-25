---
title: "Systems & Linux"
description: "A curated reading path for infra-curious frontend leads — Linux desktop, containers, networking, and shell automation."
layout: reading-path
url: /posts/techblog/paths/systems-and-linux/
hidemeta: true
comments: false
build:
  list: never
---

For frontend leads who want to understand the machines their apps run on — desktop Linux, containers, networking, and automation — without becoming full-time SREs.

## Linux Desktop Lab series

Start with the anchor, then follow the lab notes in order (3 posts):

1. **[Ubuntu, Manjaro, and the Linux Desktop](/2026/06/03/ubuntu-manjaro-and-the-linux-desktop-im-rethinking/)** — Why I rethought my desktop stack and what I learned comparing distros.
2. **[Your Desktop Is Fast — Why Does It Still Stutter?](/2026/06/04/building-a-tiny-linux-app-to-explain-desktop-stutter/)** — Building a tiny app to explain desktop stutter on Linux.
3. **[Memory Compression on Linux](/2026/06/16/how-i-learned-my-linux-machine-has-been-compressing-memory-for-years/)** — zswap, zram, and what “free memory” actually means.

## Tools and setup

4. **[How to Install Cursor IDE on Manjaro](/2026/05/29/how-to-install-cursor-ide-in-manjaro/)** — Practical setup notes for a modern editor on Arch-based distros.
5. **[Install oh-my-zsh in VS Code on Linux](/2019/06/05/install-and-configure-oh-my-zsh-and-use-it-in-vscode-in-linux/)** — Shell and editor setup companion to the scripting posts below.

## Containers and orchestration

6. **[Introduction to Docker](/2024/05/28/introduction-to-docker-simplifying-application-deployment/)** — Container basics for developers who deploy their own apps.
7. **[Getting Started with Kubernetes](/2024/05/27/getting-started-with-kubernetes-a-beginners-guide/)** — A beginner's map to orchestration concepts frontend leads encounter in production.
8. **[Beyond Kubernetes](/2024/06/12/advanced-container-orchestration-beyond-kubernetes-basic/)** — What comes after the basics when orchestration gets real.

## Networking and automation

9. **[Advanced Networking in Linux](/2024/06/21/advanced-networking-in-linux-vlans-bonding-and-bridging/)** — VLANs, bonding, and bridging when you need more than `ip addr`.
10. **[Advanced Shell Scripting Techniques](/2024/06/19/advanced-shell-scripting-techniques-automating-complex-tasks-with-bash/)** — Bash patterns for automating repetitive sysadmin and dev workflows.

## Observability

Follow the [Observability](/2024/06/28/building-a-distributed-tracing-system-with-opentelemetry-in-angular-applications/) series, then the hardware-debugging pair:

11. **[OpenTelemetry in Angular: Distributed Tracing](/2024/06/28/building-a-distributed-tracing-system-with-opentelemetry-in-angular-applications/)** — Step-by-step guide to instrumenting an Angular app for distributed tracing.
12. **[Debugging Radio vs Microservices](/2025/12/26/debugging-radio-vs-microservices/)** — What vintage hardware debugging teaches about observability in distributed systems.
13. **[Troubleshooting Intermittent Faults in Vintage Circuits](/2026/01/01/troubleshooting-intermittent-faults-electronics/)** — Hunting ghost bugs in hardware — same mindset as flaky distributed systems.

## Resilience

14. **[Chaos Engineering: Principles and Practice](/2024/06/06/chaos-engineering/)** — Start the Chaos Engineering series (3 posts) for frontend and backend resilience patterns.

## Related paths

- **[Frontend Quality](/posts/techblog/paths/frontend-quality/)** — Full Chaos Engineering series and frontend testing strategy.
