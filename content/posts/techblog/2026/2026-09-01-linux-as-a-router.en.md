---
title: "Linux as a Router: Forwarding, Policy Routing, and nftables"
date: 2026-09-01T21:00:00+03:30
description: "Linux leaves the bridge domain: IP forwarding, policy routing for two uplinks, and nftables input vs forward."
layout: single
author_profile: true
url: 2026/09/01/linux-as-a-router/
shortlink: https://g.omid.dev/y00Y2tY
tags:
  - Linux
  - Networking
categories:
  - TechBlog
series:
  id: linux-networking
  title: "Advanced Networking in Linux"
  order: 1
  label: "Routing and Firewalling"
  role: part
seeAlso:
  - /2024/06/21/advanced-networking-in-linux-vlans-bonding-and-bridging/
  - /2026/09/04/linux-network-namespaces-and-virtual-links/
---
In [VLANs, Bonding, and Bridging](/2024/06/21/advanced-networking-in-linux-vlans-bonding-and-bridging/), the host stayed inside one or more Layer 2 domains: bonds for uplinks, VLANs for separation, bridges for VMs. That stack answers "who shares this Ethernet segment?"

This post answers a different question: **how does a Linux box move packets between IP networks?** That is routing — forwarding, policy routing when you have more than one path, and nftables rules that decide what is allowed to cross.

The audience is the same as part 1: people who already run servers or lab hosts and need a clear mental model, not a vendor certification dump.

## The Mental Model

A **bridge** forwards Ethernet frames inside one Layer 2 network. Hosts on the same bridge share a broadcast domain. The host IP usually sits on the bridge.

A **router** forwards IP packets between Layer 3 networks. It has an address in each network, looks at the destination IP, and chooses a next hop or an egress interface. Broadcasts do not cross routers.

```text
Part 1 (L2)                         Part 2 (L3)

eno1 + eno2                         lan0 (192.168.10.1/24)
  -> bond0                            |
    -> bond0.10 -> br10               Linux host with ip_forward=1
         host + VMs                   |
                                    wan0 (203.0.113.10/30)
                                      -> default via ISP
```

You can still build the LAN side with part 1's bond/VLAN/bridge stack. Routing starts when packets must leave that domain for another subnet or the internet.

## When to Route vs Bridge

Route when:

- Two subnets need to talk and should not share a broadcast domain (LAN vs DMZ, lab vs home).
- The host is a NAT gateway for a private network.
- Traffic should leave through different uplinks depending on source or destination (management vs internet, dual WAN).

Bridge when guests or containers must appear on the same Layer 2 network as the physical NIC (classic KVM bridge, DHCP from the same switch as the host).

Do **not** bridge two different ISPs or two independent Layer 2 domains "for redundancy." That creates loops and broken ARP. Bond for redundant links into the *same* L2 fabric; route (or use policy routing) when the uplinks are different networks.

## IP Forwarding

Linux does not forward packets between interfaces until you ask it to.

Temporary:

```bash
sudo sysctl -w net.ipv4.ip_forward=1
sudo sysctl -w net.ipv6.conf.all.forwarding=1
```

Persistent (distribution paths vary; `/etc/sysctl.d/99-router.conf` is common):

```ini
net.ipv4.ip_forward = 1
net.ipv6.conf.all.forwarding = 1
```

Also know **reverse path filtering**. Strict `rp_filter` drops packets that would not be accepted on the return path through the same interface. That breaks asymmetric routing and some dual-uplink designs:

```bash
# 0 = off, 1 = strict, 2 = loose
sysctl net.ipv4.conf.all.rp_filter
sysctl net.ipv4.conf.wan0.rp_filter
```

For a lab with deliberate asymmetry, use loose mode (`2`) or turn filtering off on the affected interfaces. Prefer fixing the routing design when you can.

### Temporary Two-NIC Router

Assume `lan0` faces a private network and `wan0` faces an upstream router:

```bash
sudo ip addr add 192.168.10.1/24 dev lan0
sudo ip link set lan0 up

sudo ip addr add 203.0.113.10/30 dev wan0
sudo ip link set wan0 up

sudo ip route add default via 203.0.113.9

sudo sysctl -w net.ipv4.ip_forward=1
```

Hosts on `192.168.10.0/24` use `192.168.10.1` as their gateway. Until you add NAT or upstream routes for that prefix, the internet will not know how to reply — that is where masquerading comes in later.

Verify:

```bash
ip route
ip route get 8.8.8.8 from 192.168.10.50 iif lan0
ping -c 3 -I lan0 192.168.10.50
```

## Policy Routing

The main routing table is enough when every packet uses the same default gateway. Two uplinks usually need **policy routing**: match on source address, ingress interface, or mark, then look up a different table.

Example: LAN clients should exit via the ISP on `wan0`. Management traffic sourced from `192.168.99.10` on `mgmt0` should use a second uplink.

```bash
# Tables live in /etc/iproute2/rt_tables
echo "100 isp" | sudo tee -a /etc/iproute2/rt_tables
echo "200 mgmt" | sudo tee -a /etc/iproute2/rt_tables

sudo ip route add default via 203.0.113.9 table isp
sudo ip route add 192.168.10.0/24 dev lan0 table isp

sudo ip route add default via 198.51.100.1 table mgmt
sudo ip route add 192.168.99.0/24 dev mgmt0 table mgmt

sudo ip rule add from 192.168.10.0/24 table isp priority 100
sudo ip rule add from 192.168.99.10/32 table mgmt priority 110
```

Check the decision path:

```bash
ip rule
ip route show table isp
ip route get 8.8.8.8 from 192.168.10.50
ip route get 8.8.8.8 from 192.168.99.10
```

When `ip rule` tables multiply and you need interface-scoped routing that looks more like separate routers on one box, **VRF** (Virtual Routing and Forwarding) is the next step. It is worth knowing the name; it is not required for a two-uplink lab. Prefer one or two policy tables first.

## nftables: Input vs Forward vs Output

Filtering a router is not the same as filtering a workstation.

| Chain | What it covers |
|-------|----------------|
| **input** | Packets destined to the host itself (SSH to the router, DNS on the router) |
| **forward** | Packets the host is routing between interfaces |
| **output** | Packets the host originates |

A common mistake: locking down `input` until SSH works, then wondering why LAN clients cannot reach the internet. That traffic never hits `input`. It hits **forward**.

Lab masquerade (SNAT for a private LAN):

```bash
sudo nft add table inet filter
sudo nft add chain inet filter input '{ type filter hook input priority 0; policy drop; }'
sudo nft add chain inet filter forward '{ type filter hook forward priority 0; policy drop; }'
sudo nft add chain inet filter output '{ type filter hook output priority 0; policy accept; }'

# Host access (tighten later)
sudo nft add rule inet filter input ct state established,related accept
sudo nft add rule inet filter input iifname "lo" accept
sudo nft add rule inet filter input iifname "lan0" tcp dport 22 accept

# Routed traffic
sudo nft add rule inet filter forward ct state established,related accept
sudo nft add rule inet filter forward iifname "lan0" oifname "wan0" accept

sudo nft add table ip nat
sudo nft add chain ip nat postrouting '{ type nat hook postrouting priority 100; }'
sudo nft add rule ip nat postrouting oifname "wan0" masquerade
```

Inspect:

```bash
sudo nft list ruleset
```

This is **routed** filtering. If you still use part 1's bridges and guest traffic mysteriously hits filter rules, check `br_netfilter` from that post: bridged frames can be forced through the IP filter path. That is a bridge problem, not a reason to put VM traffic in `forward` by default.

Distributions often wrap nftables with firewalld or ufw. The hooks are still the same: know whether you are opening a service on the host (`input`) or allowing a path through the host (`forward`).

## A Practical Design

A small lab router or edge host:

```text
lan0  — 192.168.10.1/24  — clients use this as gateway
wan0  — DHCP or static from ISP
mgmt0 — optional second uplink for admin traffic only
```

With NetworkManager for addresses and a small nftables file for policy:

```bash
sudo nmcli connection add type ethernet ifname lan0 con-name lan \
  ipv4.method manual ipv4.addresses 192.168.10.1/24 ipv4.gateway "" \
  ipv4.never-default yes

sudo nmcli connection add type ethernet ifname wan0 con-name wan \
  ipv4.method auto

sudo nmcli connection up lan
sudo nmcli connection up wan
```

Enable forwarding in sysctl, install the nftables rules above, and verify from a LAN client.

Netplan variant for static WAN:

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    lan0:
      addresses:
        - 192.168.10.1/24
    wan0:
      addresses:
        - 203.0.113.10/30
      routes:
        - to: default
          via: 203.0.113.9
      nameservers:
        addresses:
          - 1.1.1.1
```

Keep the habit from part 1: configure carefully over console or with a rollback path (`netplan try`, or a timed `nft flush ruleset` if you are experimenting).

## Verification Workflow

Bottom-up still works; the layers are different.

```bash
ip link show lan0
ip link show wan0
ip addr
ip route
ip rule
sysctl net.ipv4.ip_forward
sudo nft list ruleset
```

From the router:

```bash
ping -c 3 203.0.113.9
ping -c 3 -I 192.168.10.1 192.168.10.50
ip route get 8.8.8.8 from 192.168.10.50 iif lan0
```

From a LAN client:

```bash
ping -c 3 192.168.10.1
ping -c 3 8.8.8.8
traceroute -n 8.8.8.8
```

When replies vanish, `tcpdump` on each side of the forward path:

```bash
sudo tcpdump -ni lan0 icmp
sudo tcpdump -ni wan0 icmp
```

If packets enter `lan0` and never leave `wan0`, check forwarding, routes, and `forward` chain policy. If they leave but never return, check NAT, upstream routing, and `rp_filter`.

## Common Mistakes

- **Forgetting `ip_forward`:** Interfaces and routes look fine; nothing crosses.
- **Filtering `input` instead of `forward`:** SSH to the router works; clients cannot reach upstream.
- **Wrong routing table:** Policy rules send traffic into an empty or incomplete table.
- **Strict `rp_filter` on asymmetric paths:** Return packets are dropped before your firewall rules matter.
- **No masquerade for private sources:** Upstream has no route back to `192.168.10.0/24`.
- **Bridging two WANs:** Use routing or policy routing; do not merge ISP Layer 2 domains on a Linux bridge.
- **Blaming nftables for bridge problems:** Guest traffic on a pure L2 bridge is not `forward` unless `br_netfilter` (or an explicit router) is involved.

## Tooling Notes

Use `iproute2` for addresses, routes, and rules: `ip addr`, `ip route`, `ip rule`, `ip route get`.

Use **nftables** as the modern packet filter. Learn the three hooks before memorizing every expression. On RHEL-family systems you may edit firewalld zones that compile down to nftables; the mental model stays the same.

Avoid designing new routers around `iptables-legacy` or `route` from net-tools. They still appear on old hosts; they are not the interface to learn first in 2026.

## Further Reading

- [Linux kernel networking documentation](https://docs.kernel.org/networking/)
- [`ip-rule(8)`](https://man7.org/linux/man-pages/man8/ip-rule.8.html) and [`ip-route(8)`](https://man7.org/linux/man-pages/man8/ip-route.8.html)
- [nftables wiki](https://wiki.nftables.org/)
- [systemd-networkd](https://www.freedesktop.org/software/systemd/man/latest/systemd-networkd.service.html) for persistent interface config

## Conclusion

Bridges keep hosts in a Layer 2 conversation. Routers move IP packets between conversations. Enable forwarding deliberately, put filters in the chain that matches the traffic (`forward` for transit, `input` for the host), and use policy routing when one default route is not enough.

The next step is not a bigger router. It is isolating whole network stacks on the same machine — namespaces, veth pairs, and the bridge versus macvlan versus ipvlan choices that containers reuse. That is [Linux Network Namespaces and Virtual Links](/2026/09/04/linux-network-namespaces-and-virtual-links/).
