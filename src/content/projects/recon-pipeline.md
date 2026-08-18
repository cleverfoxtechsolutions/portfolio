---
title: Automated Recon Pipeline
subject: Turning a domain into a structured, deduplicated asset inventory
vector: Offense / attack-surface mapping
stack: [subfinder, httpx, dnsx, katana, nuclei, naabu, Python, SQLite]
status: Actively used
order: 2
summary: >-
  A 10-stage pipeline that chains open-source recon tools behind a single
  orchestrator, so one run produces a queryable asset inventory instead of a pile of
  disconnected tool output scattered across terminal scrollback.
---

## The problem

Every individual recon tool is good at one thing. Used separately, they produce a
pile of text files with inconsistent formats, no dedup, and no memory between runs.
Stitching subfinder output into httpx into nuclei by hand, every time, doesn't scale
past a couple of targets.

## What I built

A Python orchestrator that runs a fixed pipeline against a target scope and rolls
everything into one SQLite-backed inventory, exposed through a small API and
dashboard:

1. **Subdomain discovery** — subfinder plus certificate-transparency and archive
   sources, merged and deduplicated.
2. **Live-host probing** — httpx to resolve which discovered hosts are actually
   serving something, capturing status codes, titles, and tech fingerprints.
3. **Crawling & historical URLs** — katana for active crawling, combined with
   archived-URL sources to surface endpoints that aren't linked from the current
   site.
4. **Vulnerability scanning** — nuclei run against confirmed live hosts using a
   curated set of template categories, not a full unscoped template run.
5. **Port discovery** — naabu for a lightweight sweep of confirmed-live hosts.
6. **Config-exposure and fuzzing passes**, **CVE correlation**, and **parameter /
   dork generation** as later stages that consume the accumulated inventory rather
   than re-scanning from scratch.

Every stage writes to the same SQLite database, keyed so re-running the pipeline
against a target updates the inventory instead of duplicating it — a second run
against the same scope is fast and shows you what *changed*, which matters more than
what's there once.

## Scope discipline

The orchestrator reads from an explicit scope file and refuses to enqueue anything
outside it. Recon tooling is easy to point at more than you meant to; gating on an
explicit allowlist rather than a denylist was a deliberate choice, not an
afterthought.

## What I'd do differently

Nuclei's default template set is noisy — a large fraction of early findings were low-
value informational hits. Curating the template categories down to the ones that
actually correlate with exploitable issues cut the noise dramatically and made the
output something I'd actually read instead of skim past.

## Why it matters

The output isn't "logs from six tools." It's one inventory, queryable, that answers
"what does this attack surface actually look like right now" — which is the question
recon is supposed to answer in the first place.
