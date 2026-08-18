---
title: Segmented Homelab Infrastructure
subject: The platform everything above actually runs on
vector: Infrastructure / systems security
stack: [Proxmox VE, ZFS, LXC/KVM, network segmentation, automated backups]
status: Operational, actively maintained
order: 4
summary: >-
  Every project on this page runs on infrastructure I designed, segmented, and
  operate myself — treated like production, not like a lab that's allowed to fall
  over.
---

## The problem

Tools and pipelines are only as trustworthy as the platform underneath them. A
detection lab that shares a network with everything else isn't air-gapped. A recon
box with no backup strategy is one bad `rm` away from losing weeks of work. I wanted
infrastructure I could treat as a dependency, not an afterthought.

## What I built

A Proxmox VE host running several dozen LXC containers and VMs, segmented by trust
level rather than flattened onto one network:

- A **general-purpose bridge** for services that need LAN and internet access.
- An **isolated, internet-only bridge** for workloads that shouldn't reach the LAN
  or be reached by it.
- A dedicated **air-gapped bridge** with no default route anywhere, purpose-built
  for the detection lab above, with a scoped, temporary egress toggle used only
  during provisioning.

Backups run on a schedule (weekly full VM/container snapshots, daily config and
system-state backups) to dedicated backup storage, with an explicit retention policy
rather than "keep everything forever until the disk fills up."

## An incident, generalized

A single-vdev ZFS pool crept up in both capacity and fragmentation over months of
normal use, to the point that available space effectively hit zero well before
`zpool list` suggested a problem. The result was a host-wide performance collapse
under load — everything got slow at once, for a reason that wasn't obvious from any
single service's logs.

The fix was straightforward once diagnosed (free space, defragment by removing stale
data), but the real fix was process: capacity and fragmentation are now something I
actively monitor rather than something I notice via a cascading failure. A lab that
runs multiple "production" services deserves the same monitoring discipline as
anything else with that label.

## Why it matters

None of the offense, defense, or investigation tooling above means much if the
platform under it isn't trustworthy. Segmentation, backups, and monitoring aren't
the interesting part of a security portfolio — but skipping them is how the
interesting part stops working.
