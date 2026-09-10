---
title: "Linux VXLAN and Why CNI Exists"
date: 2026-09-10T12:00:00+03:30
description: "Ethernet does not stretch across hosts by itself. VXLAN is one overlay; CNI is the contract that plugs a pod into whatever network the cluster actually uses."
layout: single
author_profile: true
url: 2026/09/10/linux-vxlan-and-why-cni/
shortlink: https://g.omid.dev/MORQL5W
tags:
  - Linux
  - Networking
  - Docker
  - Kubernetes
categories:
  - TechBlog
series:
  id: linux-networking
  title: "Advanced Networking in Linux"
  order: 3
  label: "Overlays and CNI"
  role: part
seeAlso:
  - /2026/09/04/linux-network-namespaces-and-virtual-links/
  - /2026/09/01/linux-as-a-router/
  - /2024/05/28/introduction-to-docker-simplifying-application-deployment/
  - /2024/05/27/getting-started-with-kubernetes-a-beginners-guide/
  - /2024/06/12/advanced-container-orchestration-beyond-kubernetes-basic/
---
[Part 3](/2026/09/04/linux-network-namespaces-and-virtual-links/) kept everything on one machine: namespaces as workloads, veth as cables, bridge or macvlan or ipvlan as the attachment. That is enough for a single Docker host.

Two hosts do not share a broadcast domain just because both run Linux. Something has to carry Ethernet (or IP) across the real network between them. **VXLAN** is one common way to do that. **CNI** is something else entirely: a contract so Kubernetes (and other runtimes) can plug a pod into *whatever* network architecture you chose.

**CNI does not mean VXLAN.** This post teaches both ideas so the title earns its name.

## The Mental Model

In part 3, namespaces imitated **workloads**. Here, namespaces imitate **nodes**. Each "node" gets a bridge for local workloads and a VXLAN tunnel endpoint (VTEP) that joins those bridges across an **underlay**.

- **Underlay** — the real routed network between hosts (or between our fake nodes). Example: `192.0.2.0/24`.
- **Overlay** — the virtual Ethernet fabric carried inside underlay packets. VXLAN encapsulates Ethernet frames in UDP (port 4789 by default), tagged with a VNI (VXLAN Network Identifier).

Geneve is a sibling encapsulation used by some cloud and SDN stacks. Same job class; this lab uses VXLAN.

```text
             Underlay
        192.0.2.0/24

      Node A             Node B
   ┌──────────┐       ┌──────────┐
   │ namespace│       │ namespace│
   │    A     │       │    B     │
   └────┬─────┘       └────┬─────┘
        │                    │
      bridge               bridge
        │                    │
      VXLAN                VXLAN
        │                    │
       eth0 ─────────────── eth0
```

## VXLAN Lab: Two Nodes on One Machine

Everything below runs on one Linux host. Network namespaces stand in for Node A and Node B. A veth (or two) in the default namespace can provide the underlay link; the simplest teaching setup uses a bridge in the default namespace as a fake "rack switch" for underlay IPs.

### Underlay

```bash
sudo ip link add name underlay type bridge
sudo ip link set underlay up

sudo ip netns add node-a
sudo ip netns add node-b

sudo ip link add a-eth0 type veth peer name a-up
sudo ip link add b-eth0 type veth peer name b-up
sudo ip link set a-eth0 netns node-a
sudo ip link set b-eth0 netns node-b
sudo ip link set a-up master underlay
sudo ip link set b-up master underlay
sudo ip link set a-up up
sudo ip link set b-up up

sudo ip netns exec node-a ip addr add 192.0.2.10/24 dev a-eth0
sudo ip netns exec node-b ip addr add 192.0.2.11/24 dev b-eth0
sudo ip netns exec node-a ip link set lo up
sudo ip netns exec node-b ip link set lo up
sudo ip netns exec node-a ip link set a-eth0 up
sudo ip netns exec node-b ip link set b-eth0 up

sudo ip netns exec node-a ping -c 2 192.0.2.11
```

Nodes can reach each other on the underlay. Overlay next.

### Overlay bridges and VXLAN

Same VNI on both sides. Point each VTEP at the other node's underlay IP (`remote`).

```bash
# Node A
sudo ip netns exec node-a ip link add name br-overlay type bridge
sudo ip netns exec node-a ip link add vxlan0 type vxlan id 100 \
  remote 192.0.2.11 local 192.0.2.10 dstport 4789 dev a-eth0
sudo ip netns exec node-a ip link set vxlan0 master br-overlay
sudo ip netns exec node-a ip link set br-overlay up
sudo ip netns exec node-a ip link set vxlan0 up
sudo ip netns exec node-a ip addr add 10.200.0.1/24 dev br-overlay

# Node B
sudo ip netns exec node-b ip link add name br-overlay type bridge
sudo ip netns exec node-b ip link add vxlan0 type vxlan id 100 \
  remote 192.0.2.10 local 192.0.2.11 dstport 4789 dev b-eth0
sudo ip netns exec node-b ip link set vxlan0 master br-overlay
sudo ip netns exec node-b ip link set br-overlay up
sudo ip netns exec node-b ip link set vxlan0 up
sudo ip netns exec node-b ip addr add 10.200.0.2/24 dev br-overlay

sudo ip netns exec node-a ping -c 3 10.200.0.2
```

Optional: hang a workload namespace off `br-overlay` with a veth, exactly as in part 3 — that mimics a pod on the node.

Inspect encapsulation:

```bash
sudo ip netns exec node-a ip -d link show vxlan0
sudo ip netns exec node-a tcpdump -ni a-eth0 udp port 4789
# in another terminal:
sudo ip netns exec node-a ping -c 3 10.200.0.2
```

You should see UDP/4789 on the underlay while ICMP runs on `10.200.0.0/24`.

Cleanup:

```bash
sudo ip netns delete node-a
sudo ip netns delete node-b
sudo ip link delete underlay
```

Production VTEPs often use multicast or a control plane instead of a single `remote`. The lab's point is the encapsulation, not a full SDN.

## Why CNI Exists

Kubernetes does not hard-code "create this veth, this bridge, this VXLAN" into kubelet for every cluster. When the container runtime creates a pod sandbox, it invokes the configured CNI implementation through a standard contract.

Conceptually:

```text
Kubernetes
    │
 kubelet
    │ asks runtime to create pod sandbox
    ▼
container runtime
    │ invokes CNI (ADD / DEL / CHECK)
    ▼
┌───────────────┐
│ CNI plugin    │
│               │
│ netns         │
│ veth          │
│ IP            │
│ routes        │
│ bridge/VXLAN… │
└───────────────┘
```

On **ADD**, the plugin is told about the pod's network namespace and expected to leave an interface, address, and routes ready. On **DEL**, it tears that down. **CHECK** is for consistency. The JSON details are in the [CNI specification](https://www.cni.dev/); you do not need to implement a plugin to use the idea.

Docker's built-in `bridge` and `overlay` drivers do the same *job* without speaking CNI JSON: create interfaces in a container namespace and attach them to a network architecture. Kubernetes standardized the handoff so any compliant plugin can provide the architecture.

## CNI Is the Contract, Not the Architecture

```text
CNI = interface / contract
       │
       ▼
implementation / network architecture
 ┌────────┬─────────┬──────────┐
 │ bridge │ routing │ overlay  │
 │        │ / BGP   │ / VXLAN  │
 └────────┴─────────┴──────────┘
```

Map those shapes onto this series:

| Architecture | What it reuses from this series | Example names (not a vendor bake-off) |
|--------------|---------------------------------|----------------------------------------|
| Host-local / bridge | Part 1 bridges + part 3 veth/netns | Simple bridge CNI, Docker `bridge` |
| Routed / BGP-style | Part 2 forwarding and routes | Calico in routed modes |
| Overlay | This post (VXLAN or Geneve) | Flannel VXLAN, Docker `overlay` |

Cilium and others may use eBPF datapaths; that is still "an implementation behind the same contract," not a reason to confuse CNI with one tunnel type.

**CNI does not mean VXLAN.** A cluster can be CNI-compliant with no overlay at all.

## Docker and Kubernetes in Product Form

Once the primitives click:

- [Introduction to Docker](/2024/05/28/introduction-to-docker-simplifying-application-deployment/) — containers and the default bridge network as a product UI over netns + veth + bridge.
- [Getting Started with Kubernetes](/2024/05/27/getting-started-with-kubernetes-a-beginners-guide/) — pods as networked units; the cluster network is whoever your CNI plugin is.

[Beyond Kubernetes](/2024/06/12/advanced-container-orchestration-beyond-kubernetes-basic/) is the next **orchestration** layer: CRDs, Operators, Istio, scheduling, and security. It assumes pods already have connectivity. **Istio does not replace CNI.** A service mesh sits above the pod network; it does not create the interface in the pod netns.

## Verification and Common Mistakes

For the lab:

```bash
sudo ip netns exec node-a ip -d link show vxlan0
sudo ip netns exec node-a bridge link
sudo ip netns exec node-a ping -c 3 10.200.0.2
sudo ip netns exec node-a tcpdump -ni a-eth0 udp port 4789
```

Watch for:

- **VNI mismatch** — both ends must agree on the VXLAN ID.
- **Underlay MTU vs overlay MTU** — encapsulation costs header space; lower the overlay MTU or raise the underlay MTU consistently.
- **Treating the overlay as "just a VLAN"** — VLANs are usually switch-local tags; VXLAN is UDP across an IP underlay.
- **Assuming every cluster uses VXLAN** — many use pure routing or cloud VPC networking.
- **Conflating CNI with VXLAN** — CNI is the plugin contract; VXLAN is one optional data plane.
- **Expecting Istio (or any mesh) to replace CNI** — different layers.

## Further Reading

- [Linux VXLAN](https://docs.kernel.org/networking/vxlan.html) (kernel networking docs)
- [CNI specification](https://www.cni.dev/docs/spec/)
- [Kubernetes networking concepts](https://kubernetes.io/docs/concepts/services-networking/)

## Conclusion

Part 1 stacked L2 on a host. Part 2 routed between L3 domains. Part 3 isolated stacks with namespaces and virtual links. This part stretched a virtual L2 across an underlay with VXLAN, then separated that implementation from **CNI**, the contract that lets Kubernetes plug pods into bridge, routed, or overlay networks without baking one design into kubelet.

From here, read the Docker and Kubernetes posts on the Systems path as product views of the same primitives — then [Beyond Kubernetes](/2024/06/12/advanced-container-orchestration-beyond-kubernetes-basic/) when you care about CRDs, Operators, and the mesh *above* a working pod network.

This series stops at the network boundary on purpose. Orchestration is the next shelf, not another tunneling mode.
