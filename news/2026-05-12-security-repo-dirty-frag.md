---
title: "Introducing the Rocky Linux security repository and a hotfix for Dirty Frag"
date: "2026-05-12"
author: "Alexia"
---

Rocky Linux has always held stability and upstream compatibility as core commitments. That means following the Enterprise Linux release cadence, not getting ahead of it. Today, we are introducing a narrow but important exception to that rule -- and explaining exactly why we made it.

## A new optional security repository

We are launching an optional Rocky Linux security repository designed for situations where a critical vulnerability is actively being exploited, public proof-of-concept code is already circulating, and waiting on an upstream Enterprise Linux release would leave administrators exposed.

This is a deliberate and carefully scoped departure from our long-standing policy of never shipping packages ahead of upstream. It is not a signal that Rocky Linux is changing course on compatibility. It is a mechanism to give administrators a faster path to protection when the threat is real, the risk is immediate, and waiting is not a viable option.

Because this changes the behavior our users depend on, **the security repository is disabled by default**. The default Rocky Linux experience remains fully aligned with the upstream Enterprise Linux release model. Administrators who need to act quickly can opt in:

```
$ sudo dnf --enablerepo=security update
```

Permanent enablement is also available through standard DNF repository configuration. Packages published through this repository are versioned so that official upstream releases will always supersede them -- this is a hotfix mechanism, not a parallel release track.

## Dirty Frag: what it is and why we acted

Alongside the repository launch, we are publishing an immediate security update addressing **Dirty Frag**, a recently disclosed local privilege escalation vulnerability affecting Linux kernel versions going back to 2017.

What makes Dirty Frag particularly concerning is how reliable it is. Many privilege escalation vulnerabilities depend on race conditions or tight timing windows that make exploitation inconsistent in practice. Dirty Frag does not. Security researchers have characterized exploitation as highly reliable and deterministic, meaning that any attacker who has obtained local access to a system has a straightforward path to elevated privileges.

Public proof-of-concept exploit code is already available. Environments that should treat this as especially urgent include:

- Shared-user systems and shell access environments
- Container workloads and CI infrastructure
- HPC clusters and university systems
- Any multi-tenant environment where local access is shared or easily obtained

The public disclosure of Dirty Frag arrived before coordinated upstream fixes were broadly available. That gap -- however narrow -- is exactly the scenario the security repository was designed to address.

## How to get the fix

To apply the Dirty Frag hotfix, enable the security repository and run an update:

```
$ sudo dnf --enablerepo=security update
```

The fix is available now. Once the official upstream Enterprise Linux packages are released, they will automatically supersede the hotfix through the normal update process.

## Thank you, CIQ

This response would not have moved as quickly without significant engineering support from CIQ. Their kernel team played a central role in remediating Dirty Frag, and they contributed engineering resources, infrastructure, and coordination that made this accelerated timeline possible. We are grateful for their continued investment in Rocky Linux and the broader open source community.

---

Questions, feedback, or issues with the security repository? Join the conversation on the [Rocky Linux forums](https://forums.rockylinux.org) or in [Mattermost](https://chat.rockylinux.org).
