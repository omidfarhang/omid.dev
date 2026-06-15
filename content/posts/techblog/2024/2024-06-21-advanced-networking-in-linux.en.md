---
title: 'Advanced Networking in Linux: VLANs, Bonding, and Bridging'
date: 2024-06-21T21:30:37+03:30
description: "A practical guide to Linux VLANs, bonding, and bridging: how to layer interfaces, avoid common mistakes, and build a resilient server or virtualization-host network."
layout: single
author_profile: true
url: 2024/06/21/advanced-networking-in-linux-vlans-bonding-and-bridging/
shortlink: https://g.omid.dev/9uI2ZBh
keywords:
  - linux bridge vs bond
  - linux bond vs bridge
  - network bonding in linux
  - linux vlan
  - linux bridging
tags:
  - Networking
  - Linux
  - VLANs
  - Bonding
  - Bridging
  - CentOS
  - RHEL
  - Debian
  - Ubuntu
  - NetworkManager
  - Netplan
  - Virtualization

categories:
  - TechBlog
---
Linux networking becomes much easier to reason about when you treat interfaces as layers. A physical NIC can become part of a bond. A VLAN interface can sit on top of that bond. A bridge can sit on top of the VLAN. The host's IP address belongs on whichever layer represents the host on that network.

This post focuses on three building blocks that often appear together on servers, virtualization hosts, routers, and lab machines:

- **VLANs** separate Layer 2 networks while sharing the same physical links.
- **Bonding** combines multiple NICs into one logical interface for failover or link aggregation.
- **Bridging** creates a software switch, most commonly to connect VMs or containers to an existing Layer 2 network.

The goal is not to memorize every command. It is to understand where each feature fits, how to stack them safely, and how to verify the result.

## The Mental Model

Think from the bottom up:

1. **Physical NICs:** `eno1`, `eno2`, `eth0`, or similar names represent real network ports.
2. **Bond:** `bond0` turns multiple physical NICs into one logical uplink.
3. **VLAN interfaces:** `bond0.10` or `eth0.10` represents traffic tagged with VLAN ID 10.
4. **Bridge:** `br10` forwards Ethernet frames between bridge ports, such as a VLAN interface and VM tap devices.
5. **IP configuration:** The host's address goes on the interface where the host participates in the network.

A common virtualization host might look like this:

```text
eno1 + eno2
    -> bond0
        -> bond0.10
            -> br10
                -> host IP: 192.168.10.10/24
                -> VM interfaces
        -> bond0.20
            -> br20
                -> VM interfaces only
```

That layering is the most important idea in the whole post. Most broken Linux network setups come from putting the IP address on the wrong layer, creating a bridge loop, or mismatching the Linux configuration with the switch configuration.

## When to Use Each Feature

Use a VLAN when one physical link must carry more than one logical network. For example, a server can receive management traffic on VLAN 10, storage traffic on VLAN 20, and guest traffic on VLAN 30 through the same switch port.

Use a bond when the host needs a resilient uplink or aggregate capacity across multiple flows. For simple redundancy, `active-backup` is usually the safest mode. For standards-based link aggregation, use `802.3ad` LACP and configure the switch ports in the same LACP port channel.

Use a bridge when something else needs to share a Layer 2 network through the Linux host. The most common examples are KVM virtual machines, containers, network namespaces, and lab routers.

Do not use a bridge as a replacement for bonding. If two physical NICs connect to the same Layer 2 network, adding both directly to a bridge can create a loop. Bond the NICs first, then bridge on top of the bond or VLAN.

## VLANs

A VLAN is an IEEE 802.1Q tag added to Ethernet frames. Switches use the VLAN ID to keep Layer 2 networks separate while still carrying them across shared links.

Before creating VLAN interfaces in Linux, check the switch:

- A host that carries multiple VLANs usually connects to a trunk/tagged switch port.
- A host that belongs to exactly one VLAN usually connects to an access/untagged switch port and does not need a VLAN subinterface.
- The allowed VLAN list and native VLAN on the switch must match the host design.

Modern Linux systems should use `iproute2`, NetworkManager, netplan, or systemd-networkd. The older `vconfig` tool is deprecated.

### Temporary VLAN Example

This creates VLAN 10 on `eth0` and assigns an address to it. It is useful for testing, but it will not survive a reboot.

```bash
sudo modprobe 8021q
sudo ip link add link eth0 name eth0.10 type vlan id 10
sudo ip link set dev eth0 up
sudo ip link set dev eth0.10 up
sudo ip addr add 192.168.10.10/24 dev eth0.10
```

Verify it:

```bash
ip -d link show eth0.10
ip addr show dev eth0.10
```

Remove it:

```bash
sudo ip link delete eth0.10
```

### Persistent VLAN with NetworkManager

For a static address:

```bash
sudo nmcli connection add type vlan con-name vlan10 dev eth0 id 10 ifname eth0.10 ipv4.addresses 192.168.10.10/24 ipv4.gateway 192.168.10.1 ipv4.method manual
sudo nmcli connection up vlan10
```

For DHCP:

```bash
sudo nmcli connection add type vlan con-name vlan10 dev eth0 id 10 ifname eth0.10 ipv4.method auto
sudo nmcli connection up vlan10
```

## Bonding

Bonding makes multiple physical NICs behave like one logical interface. The right mode depends on your goal and your switch.

The modes worth knowing first are:

1. **`active-backup`:** One NIC is active and another waits as backup. It is simple and does not require switch-side link aggregation.
2. **`802.3ad`:** Uses LACP for dynamic link aggregation. It requires matching switch configuration.
3. **`balance-xor`:** Uses a transmit hash to pick a link. It can be useful in controlled environments but needs switch support.
4. **`balance-tlb` and `balance-alb`:** Provide adaptive load balancing without switch aggregation, but can be harder to reason about operationally.

For most production servers, choose `active-backup` when you mainly want failover. Choose `802.3ad` when you control both ends and want LACP.

Important caveats:

- LACP will not work correctly unless the switch ports are in the same LACP group.
- A single TCP connection usually cannot exceed the speed of one member link. LACP spreads multiple flows, not one flow.
- Put IP addresses on `bond0`, a VLAN on top of `bond0`, or a bridge on top of that VLAN. Do not put IP addresses on the slave NICs.
- Use link monitoring. `miimon=100` is a common starting point.

### Temporary Bond Example

This creates an `active-backup` bond from `eth0` and `eth1`:

```bash
sudo modprobe bonding
sudo ip link add bond0 type bond mode active-backup miimon 100
sudo ip link set eth0 master bond0
sudo ip link set eth1 master bond0
sudo ip link set eth0 up
sudo ip link set eth1 up
sudo ip addr add 192.168.1.10/24 dev bond0
sudo ip link set bond0 up
```

Check the bond:

```bash
cat /proc/net/bonding/bond0
```

### Persistent Bond with NetworkManager

This creates a persistent `active-backup` bond:

```bash
sudo nmcli connection add type bond con-name bond0 ifname bond0 bond.options "mode=active-backup,miimon=100" ipv4.addresses 192.168.1.10/24 ipv4.gateway 192.168.1.1 ipv4.method manual
sudo nmcli connection add type ethernet con-name bond0-eth0 ifname eth0 master bond0
sudo nmcli connection add type ethernet con-name bond0-eth1 ifname eth1 master bond0
sudo nmcli connection up bond0
```

For LACP, configure the switch first, then use `802.3ad`:

```bash
sudo nmcli connection modify bond0 bond.options "mode=802.3ad,miimon=100,lacp_rate=fast,xmit_hash_policy=layer3+4"
sudo nmcli connection up bond0
```

## Bridging

A Linux bridge is a software Layer 2 switch. It learns MAC addresses and forwards Ethernet frames between ports. This is why bridges are so useful for virtualization: a VM's virtual NIC can connect to the same Layer 2 network as a physical NIC.

The key rules are:

- If `eth0` is a bridge port, the host IP address should move from `eth0` to the bridge, such as `br0`.
- A bridge forwards frames; it does not route between IP networks.
- Avoid adding multiple physical uplinks to the same bridge unless you are deliberately using STP/RSTP and understand the topology.
- For redundant uplinks, bond first and bridge on top of the bond.

The old `brctl` command from `bridge-utils` still exists on some systems, but `ip` and `bridge` from `iproute2` are the modern tools.

### Temporary Bridge Example

This creates `br0`, attaches `eth0`, and moves the host IP address to the bridge:

```bash
sudo ip link add name br0 type bridge
sudo ip link set dev eth0 master br0
sudo ip addr flush dev eth0
sudo ip addr add 192.168.1.10/24 dev br0
sudo ip link set dev eth0 up
sudo ip link set dev br0 up
sudo ip route add default via 192.168.1.1
```

Verify it:

```bash
bridge link
bridge fdb show br br0
ip addr show br0
```

Remove it:

```bash
sudo ip link set dev eth0 nomaster
sudo ip link delete br0
```

### Persistent Bridge with NetworkManager

For a host bridge with a static address:

```bash
sudo nmcli connection add type bridge con-name br0 ifname br0 ipv4.addresses 192.168.1.10/24 ipv4.gateway 192.168.1.1 ipv4.method manual
sudo nmcli connection add type ethernet con-name br0-eth0 ifname eth0 master br0
sudo nmcli connection up br0
```

For a DHCP bridge:

```bash
sudo nmcli connection add type bridge con-name br0 ifname br0 ipv4.method auto
sudo nmcli connection add type ethernet con-name br0-eth0 ifname eth0 master br0
sudo nmcli connection up br0
```

## A Practical Server Design

Now combine the pieces into a useful server layout.

Assume this design:

- `eno1` and `eno2` connect to the same switch or MLAG pair.
- The switch ports are configured as one LACP port channel.
- The port channel is a VLAN trunk carrying VLAN 10 and VLAN 20.
- VLAN 10 is the host management network: `192.168.10.10/24`.
- VLAN 20 is a VM network with no host IP address.
- VMs should attach to Linux bridges named `br10` and `br20`.

Adjust the interface names, VLAN IDs, addresses, DNS servers, and gateway for your own network before applying it.

The layer order should be:

```text
eno1, eno2 -> bond0 -> bond0.10 -> br10 -> host IP and VMs
                  \-> bond0.20 -> br20 -> VMs only
```

On Ubuntu Server with netplan and systemd-networkd, that can look like this:

```yaml
network:
  version: 2
  renderer: networkd

  ethernets:
    eno1:
      dhcp4: false
    eno2:
      dhcp4: false

  bonds:
    bond0:
      interfaces:
        - eno1
        - eno2
      parameters:
        mode: "802.3ad"
        mii-monitor-interval: 100
        lacp-rate: fast
        transmit-hash-policy: "layer3+4"

  vlans:
    bond0.10:
      id: 10
      link: bond0
    bond0.20:
      id: 20
      link: bond0

  bridges:
    br10:
      interfaces:
        - bond0.10
      addresses:
        - 192.168.10.10/24
      routes:
        - to: default
          via: 192.168.10.1
      nameservers:
        addresses:
          - 192.168.10.1
      parameters:
        stp: false
        forward-delay: 0

    br20:
      interfaces:
        - bond0.20
      dhcp4: false
      parameters:
        stp: false
        forward-delay: 0
```

Apply it carefully:

```bash
sudo netplan try
sudo netplan apply
```

Use `netplan try` when working over SSH. It can roll back if the new network configuration breaks connectivity.

## Verification Workflow

After applying a design like this, verify each layer from bottom to top.

Check physical link state:

```bash
ip link show eno1
ip link show eno2
```

Check bond status:

```bash
cat /proc/net/bonding/bond0
```

You should see the expected bonding mode, active slaves, link status, and LACP details if using `802.3ad`.

Check VLAN interfaces:

```bash
ip -d link show bond0.10
ip -d link show bond0.20
```

Check bridge ports:

```bash
bridge link
bridge fdb show br br10
bridge fdb show br br20
```

Check IP and routing:

```bash
ip addr show br10
ip route
ping -c 3 192.168.10.1
```

Check traffic on the wire when something does not work:

```bash
sudo tcpdump -eni bond0 vlan
sudo tcpdump -eni bond0.10 arp or icmp
```

If you see no VLAN-tagged traffic on `bond0`, inspect the switch trunk. If you see tagged traffic on `bond0` but nothing on `bond0.10`, inspect the VLAN ID and interface naming. If the host can reach the gateway but VMs cannot, inspect the bridge and VM tap interfaces.

## Common Mistakes

- **Putting the IP address on a bridge port:** If `eth0` or `bond0.10` is enslaved to a bridge, put the IP address on the bridge.
- **Creating a bridge loop:** Do not put two physical NICs into the same bridge as redundant uplinks. Use a bond, or design STP/RSTP intentionally.
- **Expecting LACP to multiply one download:** LACP distributes flows. One flow normally uses one member link.
- **Forgetting the switch:** VLAN trunks, allowed VLANs, native VLANs, and LACP groups must match the Linux host.
- **Mixing network managers:** Avoid configuring the same interface in NetworkManager, netplan, systemd-networkd, and old ifupdown files at the same time.
- **Testing only after persistence:** Build temporary configs to understand behavior, but use your distribution's persistent network system for production.

## Tooling Notes

Use `iproute2` for inspection and temporary changes. The useful commands are `ip link`, `ip -d link`, `ip addr`, `ip route`, and `bridge`.

Use NetworkManager when it is the active network manager on your distribution. `nmcli` is scriptable and works well on RHEL-family systems, Fedora, many desktops, and some servers.

Use netplan on Ubuntu systems where netplan owns network configuration. Netplan then renders to either NetworkManager or systemd-networkd.

Use systemd-networkd directly on minimal servers if your distribution is built around it.

Avoid new production documentation based on `ifconfig`, `route`, `vconfig`, or `brctl`. They are useful to recognize on old systems, but they are not the modern interface for Linux networking.

## Further Reading

- [Linux kernel networking documentation](https://docs.kernel.org/networking/)
- [Linux bonding driver documentation](https://docs.kernel.org/networking/bonding.html)
- [NetworkManager documentation](https://networkmanager.dev/docs/)
- [Netplan documentation](https://netplan.readthedocs.io/)
- [systemd-networkd documentation](https://www.freedesktop.org/software/systemd/man/latest/systemd-networkd.service.html)
- [Red Hat networking documentation](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/)

## Conclusion

VLANs, bonds, and bridges are most useful when you combine them deliberately. VLANs define which Layer 2 network traffic belongs to. Bonds define how physical uplinks behave as one logical link. Bridges define which Layer 2 ports can talk to each other.

If you remember the layering order, you can build complex Linux network setups without guessing: physical NICs at the bottom, bonds above them, VLANs above the uplink, bridges above VLANs when VMs or containers need Layer 2 access, and IP addresses on the interface where the host actually participates in the network.
