---
title: "Linux Network Namespaces and Virtual Links"
date: 2026-09-04T21:00:00+03:30
description: "Isolate network stacks with netns, connect them with veth, and choose bridge vs macvlan vs ipvlan — the kernel primitives containers reuse."
layout: single
author_profile: true
url: 2026/09/04/linux-network-namespaces-and-virtual-links/
shortlink: https://g.omid.dev/qU54YyX
tags:
  - Linux
  - Networking
categories:
  - TechBlog
series:
  id: linux-networking
  title: "Advanced Networking in Linux"
  order: 2
  label: "Namespaces and Virtual Links"
  role: part
seeAlso:
  - /2024/06/21/advanced-networking-in-linux-vlans-bonding-and-bridging/
  - /2026/09/01/linux-as-a-router/
  - /2026/09/10/linux-vxlan-and-why-cni/
---
[Part 1](/2024/06/21/advanced-networking-in-linux-vlans-bonding-and-bridging/) built Layer 2 stacks on a host. [Part 2](/2026/09/01/linux-as-a-router/) moved packets between IP networks. Both assumed one network stack: one set of interfaces, routes, and firewall rules.

This post isolates **whole stacks** on the same machine. A network namespace is a private view of networking. A veth pair is a cable between views. A bridge, macvlan, or ipvlan is how those cables join a shared domain or a parent NIC.

These are the same primitives containers reuse. This article stays on the kernel tools. Product wiring (Docker drivers, Kubernetes CNI) is the next post.

In this lab, namespaces imitate **isolated workloads**, not cluster nodes.

## The Mental Model

A **network namespace** (`netns`) has its own:

- interfaces (including `lo`)
- addresses and routes
- neighbor tables
- firewall rules

Processes in that namespace only see that stack. The host's default namespace is just another one — the one you use when you do not call `ip netns`.

A **veth** pair is two ends of a virtual Ethernet cable. What goes in one end comes out the other. Put one end in a namespace and leave the other in the host (or in a bridge), and you have a patch cable between stacks.

```text
Host (default netns)              Workload netns "app"
┌─────────────────────┐           ┌──────────────────┐
│ br0                 │           │                  │
│  └─ veth-host ──────── cable ───── veth-app        │
│       (or eth0)     │           │  10.0.0.2/24     │
└─────────────────────┘           └──────────────────┘
```

Part 1's bridge is how several of those cables share a Layer 2 domain. Part 2's forwarding is how namespaces on different subnets talk through the host as a router.

## Network Namespaces

Create, list, and enter a namespace:

```bash
sudo ip netns add app
ip netns list

sudo ip netns exec app ip link
sudo ip netns exec app ping -c 1 127.0.0.1   # fails until lo is up
```

Loopback is down by default in a new namespace:

```bash
sudo ip netns exec app ip link set lo up
sudo ip netns exec app ping -c 1 127.0.0.1
```

`ip netns identify <pid>` shows which namespace a process is in. `ip netns delete app` removes the namespace when you are done (move or delete interfaces first if needed).

Inside vs outside:

```bash
ip link                          # default namespace
sudo ip netns exec app ip link   # only what lives in app
```

## veth Pairs

Create a pair and move one end into `app`:

```bash
sudo ip link add veth-host type veth peer name veth-app
sudo ip link set veth-app netns app

sudo ip addr add 10.0.0.1/24 dev veth-host
sudo ip link set veth-host up

sudo ip netns exec app ip addr add 10.0.0.2/24 dev veth-app
sudo ip netns exec app ip link set veth-app up
sudo ip netns exec app ip link set lo up
```

Ping both ways:

```bash
ping -c 3 10.0.0.2
sudo ip netns exec app ping -c 3 10.0.0.1
```

### Attach Like a VM Tap

For a shared Layer 2 domain, put the host end on a bridge instead of addressing it directly — the same pattern as part 1's VM tap:

```bash
sudo ip link add name br0 type bridge
sudo ip link set veth-host master br0
sudo ip addr add 10.0.0.1/24 dev br0
sudo ip link set br0 up
sudo ip link set veth-host up
```

The namespace still uses `10.0.0.2/24` on `veth-app`. From the namespace's point of view it has one NIC; the bridge is the software switch in the default namespace.

## Bridge vs Macvlan vs Ipvlan

Three common ways to hang a namespace (or container) off a parent interface:

| Approach | What the workload looks like | Parent role |
|----------|------------------------------|-------------|
| **Bridge + veth** | Its own MAC on a software switch | Bridge ports; host IP usually on the bridge |
| **Macvlan** | Its own MAC on the parent NIC's network | Parent presents multiple MACs upstream |
| **Ipvlan** | Usually shares the parent's MAC; L3 (or L2) modes | Parent MAC reused; less MAC churn |

**Bridge + veth** is the clearest lab model and the classic Docker/libvirt pattern: lots of virtual ports, one switch, host can filter or route at the bridge edge.

**Macvlan** gives each child a distinct MAC on the real LAN. That is useful when something upstream expects unique MACs, or when you want workloads to look like separate machines on the switch. The tradeoff is **MAC visibility**: multiple source MACs leave through the parent. Some physical switches, Wi-Fi clients, and cloud networks restrict that. Host↔child communication on macvlan also has its own limitations (the host often cannot talk to macvlan children the way it talks to bridge ports without an extra macvlan in "bridge" mode or similar). Do **not** treat "enable promiscuous mode on the NIC" as a universal fix; whether the parent needs promiscuous mode depends on driver, mode, and topology.

**Ipvlan** keeps one MAC on the wire and demultiplexes by IP (L3 mode) or shares L2 carefully (L2 mode). It is often the less painful default on clouds that allow few MACs per NIC or that filter unexpected source MACs.

Temporary macvlan example (child in a namespace):

```bash
sudo ip link add mac0 link eth0 type macvlan mode bridge
sudo ip link set mac0 netns app
sudo ip netns exec app ip addr add 192.168.1.50/24 dev mac0
sudo ip netns exec app ip link set mac0 up
sudo ip netns exec app ip route add default via 192.168.1.1
```

Temporary ipvlan L3 example:

```bash
sudo ip link add ipvl0 link eth0 type ipvlan mode l3
sudo ip link set ipvl0 netns app
sudo ip netns exec app ip addr add 192.168.1.50/24 dev ipvl0
sudo ip netns exec app ip link set ipvl0 up
# L3 mode often needs routes via the parent namespace — design carefully
```

Prefer bridge+veth when you control the host switch and want simple host↔guest traffic. Prefer ipvlan when the upstream network is MAC-hostile. Prefer macvlan when you truly need distinct MACs and the network allows them.

## Practical Lab

### Lab A: Two workloads on a point-to-point veth

```bash
sudo ip netns add left
sudo ip netns add right

sudo ip link add v-left type veth peer name v-right
sudo ip link set v-left netns left
sudo ip link set v-right netns right

sudo ip netns exec left ip addr add 10.10.0.1/24 dev v-left
sudo ip netns exec right ip addr add 10.10.0.2/24 dev v-right
sudo ip netns exec left ip link set lo up
sudo ip netns exec right ip link set lo up
sudo ip netns exec left ip link set v-left up
sudo ip netns exec right ip link set v-right up

sudo ip netns exec left ping -c 3 10.10.0.2
```

### Lab B: One workload on a bridge, one routed

Reuse part 1's bridge idea and part 2's forwarding:

```bash
sudo ip netns add bridged
sudo ip netns add routed

sudo ip link add name br-lab type bridge
sudo ip addr add 10.20.0.1/24 dev br-lab
sudo ip link set br-lab up

sudo ip link add vh type veth peer name vb
sudo ip link set vb netns bridged
sudo ip link set vh master br-lab
sudo ip link set vh up
sudo ip netns exec bridged ip addr add 10.20.0.2/24 dev vb
sudo ip netns exec bridged ip link set lo up
sudo ip netns exec bridged ip link set vb up

sudo ip link add rh type veth peer name rr
sudo ip link set rr netns routed
sudo ip addr add 10.30.0.1/24 dev rh
sudo ip link set rh up
sudo ip netns exec routed ip addr add 10.30.0.2/24 dev rr
sudo ip netns exec routed ip link set lo up
sudo ip netns exec routed ip link set rr up
sudo ip netns exec routed ip route add default via 10.30.0.1

sudo sysctl -w net.ipv4.ip_forward=1
# optional: nftables forward rules from part 2 between rh and br-lab
```

From `bridged`, ping `10.20.0.1`. From `routed`, ping `10.30.0.1` and, with forwarding and routes, reach `10.20.0.0/24`. You have seen L2 isolation (bridge domain) versus L3 isolation (routed namespace) on one machine.

Cleanup sketch:

```bash
sudo ip netns delete left
sudo ip netns delete right
sudo ip netns delete bridged
sudo ip netns delete routed
sudo ip link delete br-lab
```

Deleting a namespace removes interfaces that lived only there; delete host-side leftovers explicitly.

## Verification Workflow

```bash
ip netns list
ip link
bridge link
sudo ip netns exec app ip addr
sudo ip netns exec app ip route
sudo ip netns exec app ping -c 1 10.0.0.1
```

Packet capture on the host end of a veth:

```bash
sudo tcpdump -ni veth-host icmp
```

## Common Mistakes

- **Leaving `lo` down:** Local services and some tooling fail in confusing ways.
- **Addressing a bridge port instead of the bridge:** Same rule as part 1 — IP on `br0`, not on `veth-host` once it is enslaved.
- **veth end stuck in the wrong namespace:** `ip link` in the default ns will not show the peer; check `ip netns exec … ip link`.
- **Assuming bridged namespace traffic is firewalled like routed traffic:** Without `br_netfilter`, a pure L2 bridge does not hit the IP `forward` chain the way part 2 described. See part 1's bridge firewall note.
- **MAC visibility and upstream restrictions (macvlan):** Multiple source MACs through the parent can be blocked by cloud or campus networks; host↔macvlan-child communication has separate limitations. Do not start with "turn on promiscuous mode" as the generic diagnosis.

## Tooling Notes

Almost everything here is `iproute2`: `ip netns`, `ip link`, `ip addr`, `bridge`. No separate "namespace daemon" is required for labs.

Containers runtimes create these objects for you. Understanding the objects first makes `docker network` and CNI less magical — and that is exactly what the next post builds on.

## Further Reading

- [`ip-netns(8)`](https://man7.org/linux/man-pages/man8/ip-netns.8.html)
- [`ip-link(8)`](https://man7.org/linux/man-pages/man8/ip-link.8.html) — `veth`, `macvlan`, `ipvlan`
- [Linux bridge](https://docs.kernel.org/networking/bridge.html) documentation

## Conclusion

Network namespaces give each workload its own stack. Veth pairs connect those stacks. Bridges, macvlan, and ipvlan choose how the connection appears on the host and on the wire.

Containers reuse this model on one host. Clusters need the same idea **across** hosts — an underlay, often an overlay such as VXLAN, and a contract so the runtime does not hard-code every wiring choice. That story is [Linux VXLAN and Why CNI Exists](/2026/09/10/linux-vxlan-and-why-cni/).
