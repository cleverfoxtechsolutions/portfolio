---
title: Air-Gapped Detection Lab
subject: Validating SOC detections against real attack techniques
vector: Defense / detection engineering
stack: [Wazuh, Sysmon, KVM/Proxmox, isolated network segment]
status: Operational
order: 1
summary: >-
  A SIEM alert that's never been tested against a real attack is a guess. I built an
  isolated lab to run ATT&CK-mapped techniques end-to-end and prove the telemetry
  chain actually works, from raw event to dashboard.
---

## The problem

It's easy to stand up a SIEM, point log sources at it, and assume coverage. It's much
rarer to actually run the technique a detection claims to catch and watch the alert
fire. Most of the detection rules I'd written up to this point had never been tested
against a live attack — they were untested assumptions with a checkbox next to them.

## What I built

An air-gapped network segment with no route to the internet or the rest of my
infrastructure by default:

- A **Wazuh** SIEM (indexer, manager, and dashboard) as the collection and alerting
  backend.
- A Windows endpoint instrumented with **Sysmon** (SwiftOnSecurity config as a
  baseline, tuned from there) and enrolled as a Wazuh agent.
- A dedicated attacker VM, kept separate from anything with production access, used
  only to generate the techniques being tested.

The segment is genuinely isolated — its own bridge, its own DHCP/DNS scope, no bridge
ports to the LAN. A scoped, temporary internet-egress toggle exists purely for
provisioning (pulling packages, updating signatures) and stays off otherwise. The
point of an air-gapped lab is defeated if it quietly has a route out.

## What I tested

I worked through a set of ATT&CK-mapped techniques across a few tactic categories —
persistence, credential access, and process-injection style execution — and for each
one confirmed the full chain: technique runs → Sysmon logs the right event →
Wazuh ingests it → a rule fires → the alert shows up correctly attributed on the
dashboard. Where a technique produced telemetry but no alert, that was the actual
finding: a detection gap, not a false sense of coverage.

## What I'd underestimated

The lab's own plumbing caused more debugging than the attacks did. A few examples,
generalized:

- **DHCP options leak across bridges more easily than you'd expect.** An option
  scoped to one segment showed up influencing a neighboring one — worth checking
  explicitly rather than assuming bridge isolation implies scope isolation.
- **Firewall rule *order* mattered more than rule *presence*.** A correct rule placed
  after a broader allow rule is a no-op. Auditing effective order, not just the rule
  set, caught this.
- **Unattended-install networking defaults are a common silent failure mode** —
  gateway/DNS assumptions baked into an autoinstall profile don't always match a
  hand-built segment, and the symptom (a VM that just never phones home) looks
  identical to a dozen other causes.

## Why it matters

Detection engineering without a way to generate ground truth is just configuration.
This lab is small, but it turns "we should catch that" into something I can actually
watch happen.
