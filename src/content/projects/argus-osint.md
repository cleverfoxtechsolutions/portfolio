---
title: "Argus: OSINT Correlation Platform"
subject: One screen instead of a dozen CLI tools and browser tabs
vector: Investigation tooling / full-stack
stack: [FastAPI, WebSockets, SQLite, vanilla JS, Sherlock, Holehe, dnstwist]
status: Operational
order: 3
summary: >-
  A self-built platform that wraps several open-source OSINT tools behind one API
  and a live-updating web UI, streaming investigation progress instead of making you
  poll or babysit a terminal.
---

## The problem

Open-source OSINT tooling is powerful but fragmented — a username-enumeration tool
here, a breach/registration checker there, a typosquat scanner somewhere else, each
with its own CLI, its own output format, and its own runtime that you have to
babysit. Running an investigation meant a dozen terminal tabs and manually
correlating output by hand.

## What I built

A FastAPI backend that wraps each tool behind a common module interface, plus a
single-page vanilla-JS frontend that kicks off a job and watches it progress in real
time over a WebSocket rather than polling an endpoint every few seconds:

- **Sherlock** for username presence across sites.
- **Holehe** for email-to-registered-service checks.
- **dnstwist** for typosquat / lookalike-domain detection.
- A self-hosted **SearXNG** instance as the metasearch backend, so queries aren't
  logged by a third party.

Each module reports incremental status back through the WebSocket as it runs, so the
UI fills in results live instead of showing a spinner until everything finishes —
useful when one module is fast and another takes two minutes.

## Design choices worth calling out

- **One API surface, many tools.** Each OSINT tool is wrapped behind the same
  adapter interface (submit job → stream status → return normalized results), so
  adding a new source doesn't mean adding a new UI.
- **Self-hosted search backend.** Routing metasearch through my own SearXNG instance
  instead of a public API keeps query patterns from leaking to a third party — a
  real consideration when the queries themselves are sensitive.
- **SQLite over a heavier database.** Investigation history is per-user, low-volume,
  and doesn't need concurrent-write complexity — SQLite was the right amount of
  database for the job.

## Ethics and scope

Argus is built for investigating things I'm authorized to investigate — my own
digital footprint, engagements I've been explicitly scoped for, and OSINT practice
against my own accounts. Username and email enumeration tools are trivially misused;
the platform doesn't change that, so the usage boundary is a personal-policy one, not
a technical one, and worth stating plainly.

## Why it matters

The value wasn't inventing new OSINT techniques — it was removing the friction
between "I have a lead" and "I have a correlated answer," which is where a lot of
investigation time actually goes.
