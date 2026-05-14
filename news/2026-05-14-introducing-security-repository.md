---
title: Rocky Linux Introduces a Security Repository and Why That Matters
date: "2026-05-14"
author: "Eric 'the IT Guy' Hendricks"
---

Rocky Linux was built on a promise: stay in lockstep with upstream Enterprise Linux. No surprises, no forks, no going rogue. That stability is exactly why organizations trust us with their production workloads.

But stability has a gap. When a serious vulnerability drops publicly before coordinated upstream fixes arrive, administrators are left waiting, sometimes for days, while exploit code is already circulating.

CopyFail made that gap impossible to ignore. Dirty Frag drove it home.

Both were serious local privilege escalation vulnerabilities with public proof-of-concept exploits already in the wild. Both arrived before upstream had fixes broadly available. And both put Rocky Linux administrators in a position no one wants to be in: aware of the risk, aware of the exploit, waiting.

## What we built

Alongside the Dirty Frag kernel patches, we've introduced the Rocky Linux Security Repository: an optional, opt-in repository that gives us a path to ship urgent security fixes ahead of upstream when circumstances genuinely demand it.

This was not a casual decision. Rocky's founding principle is compatibility with upstream Enterprise Linux, and any departure from that deserves scrutiny. The security repository represents a narrow, deliberate exception, not a change in direction.

The repository is disabled by default. That's intentional. The default Rocky Linux experience stays exactly what it has always been: predictable, stable, and fully upstream-compatible. Administrators who want access to accelerated fixes can opt in when they need it.

## What it is and what it isn't

The security repository is designed for a specific, narrow scenario: a significant vulnerability is public, exploit code exists, and upstream fixes aren't available yet. That's the bar. It's not a general-purpose fast-track channel, and it's not a replacement for the normal Rocky Linux release process.

One thing worth being clear about: packages in this repository are explicitly versioned to be superseded by the next upstream release. When Red Hat, for example, ships their fix, it will replace ours automatically. That's by design. We want users to land back on upstream-aligned packages as quickly as possible.

This also means the security repository doesn't carry traditional errata records. An errata record implies a permanent, supported fix. What we're providing here is an emergency bridge, temporary by nature, not a long-term maintenance commitment.

It also won't surface in `dnf update --security` the way a standard advisory would. If you've enabled the repo, you're getting the updates. But the update info infrastructure isn't wired to treat these as formal advisories, because they aren't.

## The Dirty Frag case, specifically

Dirty Frag was actually two CVEs: one affecting ESP, one affecting RxRPC (in the `kernel-modules-partner` package). Our first security repo kernel included fixes for both. Red Hat has since fixed the ESP vulnerability in their latest builds, so our second kernel release carried that fix forward from upstream and continued to address RxRPC on top of it. That second kernel shipped today.

Moving forward, we're dropping the RxRPC patch. Red Hat has indicated they won't fix it, and the reason is straightforward: the affected package lives in `kernel-modules-partner`, which Red Hat doesn't ship to customers. We only carry it in our development repository, the one that comes with no support guarantees. The number of production systems actually exposed is extremely small.

This is the security repository working exactly as intended. We bridged the gap while upstream got their fix out, and we're not carrying an independent patch indefinitely for a package nobody should be running in production. If you have the devel repo enabled and `kernel-modules-partner` installed, this is your heads-up.

## What happens when upstream diverges

If we push a fix and upstream decides not to address it, the next upstream kernel release will supersede our patched version. Users who haven't version-locked their kernel will, at that point, no longer have our fix.

That's the trade-off we accepted when building this. Rocky Linux is a rebuild of Enterprise Linux and we can't sustainably maintain independent kernel forks indefinitely. When upstream doesn't fix something, we'll communicate clearly and give administrators options: version locking, priority adjustments, or accepting the upstream state.

## Getting started

If you want access to the security repository now:

```bash
sudo dnf --enablerepo=security update
```

For permanent enablement, configure it through your DNF repository settings as you would any other repo.

If your environment doesn't need accelerated fixes, do nothing. Your system behavior doesn't change.

We'll communicate clearly whenever anything goes into the repository, what it covers, and what the expected timeline to upstream resolution looks like.

Thanks to our engineering team and to CIQ's kernel team for the rapid work that made this happen, from proposal to production in under a week, under real time pressure.

---

*Questions? Join the conversation in the Rocky Linux community on Mattermost at [chat.rockylinux.org](https://chat.rockylinux.org).*
