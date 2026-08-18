---
title: Notes from building an air-gapped detection lab
date: "2026-08-17"
summary: >-
  Three gotchas that ate more time than the actual attack simulation did — DHCP
  option leakage across bridges, firewall rule ordering, and silent autoinstall
  networking defaults.
---

Standing up an isolated network segment sounds like the easy part of a detection
lab — it's "just" a bridge with nothing plugged into it. In practice, three problems
showed up that had nothing to do with attack techniques or detection rules, and all
three are worth knowing about before you hit them yourself.

## 1. DHCP options don't respect the isolation you think they do

I assumed that scoping a DHCP option to one bridge's `dnsmasq` config meant it only
applied there. It doesn't, automatically — depending on how the DHCP server and
bridge config are laid out, an option meant for an isolated segment can leak into a
neighboring one and quietly change behavior (wrong gateway, wrong DNS) for VMs that
were never supposed to see it.

**The fix isn't clever** — it's checking, explicitly, what each segment's DHCP
clients actually receive, rather than trusting that bridge separation implies
DHCP-scope separation. Those are two different layers and only one of them is
enforced by the network topology.

## 2. Firewall rule order beats rule presence

A correct, specific rule placed *after* a broader allow rule is a no-op. This is an
obvious statement in the abstract and a genuinely confusing bug in practice, because
the rule is *there* — `grep` finds it, the config looks right, and the traffic still
gets through (or doesn't) for a reason that has nothing to do with the rule's
content.

The habit that fixed this: when a firewall behavior doesn't match expectations,
audit *effective order*, not just rule presence. Print the rule set the way the
firewall evaluates it, not the way it's organized in the config file.

## 3. Unattended installs have networking opinions you didn't set

An autoinstall/cloud-init profile that works fine on a normal bridge can silently
assume a gateway or DNS server that doesn't exist on a hand-built, isolated segment.
The symptom is a VM that boots, finishes provisioning (or hangs trying to), and just
never shows up on the network — which looks identical to a dozen unrelated failure
modes.

Worth checking early: does the install profile's networking section make any
assumption that isn't true for *this* segment specifically? On a normal LAN those
assumptions are usually safe. On a bridge you built an hour ago with no DHCP relay
and no default route, they're often exactly what's wrong.

---

None of these are exotic. They're the kind of thing that costs an evening the first
time and thirty seconds every time after, once you know to check for them — which is
the entire reason to write them down.
