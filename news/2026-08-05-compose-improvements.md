---
title: "Speeding Up Rocky Linux's Build-to-Staging Pipeline"
date: "2026-08-05"
author: "Jonathan Dieter"
---

# Speeding Up Rocky Linux's Build-to-Staging Pipeline

One of the issues we've been struggling with when pushing out updates is the time it takes to get updates out of Koji, our build system, and into our staging repositories. The process was taking four to five hours, which seemed excessive given that it's really just copying new packages into staging.

## The Old Process

The workflow was split into two parts.

### Part 1: Compose Generation

We use a tool called Pungi to take all the latest packages in Koji and turn them into a "compose" — a collection of packages split into separate repositories. A compose only contains the latest packages, so more work is still needed to get them into staging, where we also keep all the old packages from the current minor release. Generating the compose takes about an hour and can't be changed without major architectural changes.

### Part 2: Post-Compose Staging Sync

This is where we copy the compose into staging, regenerate the metadata users pull to get updates, grab the security errata, and sign all the metadata. This should have been fast, even across all the repositories we ship per major release.

## Removing the Bottleneck

Further investigation revealed that one step — regenerating the metadata — was taking the bulk of the time. Here's why: we copy the new packages and metadata into the staging path, but then have to regenerate the metadata so it includes the old packages too. You can reduce the number of packages checked by passing `--update` to `createrepo_c` (the tool that generates metadata from packages in a directory), which only looks at packages not already in the metadata — but that's still every package updated in the past. Across all repositories and architectures, that added up to over three hours.

We already had the metadata for the old packages sitting in the staging tree, so the logical fix was to merge the compose and staging tree metadata directly. That's what we've done.

We did have to write new libraries to handle merging modular metadata, since `mergerepo_c` (the tool that handles repository merging) doesn't support that — but that turned into an unexpected bonus.

### A Side Benefit: Fewer Modularity Mistakes

Previously, we had to manually add modular metadata directly into a git repository, since there was no easy way to combine it. That process was error-prone — most of the modularity issues Rocky has hit in the last few months trace back to mistakes made adding modules to the repo. Now, our new module-merging code bypasses the git repo altogether and merges the compose metadata directly with what's already in staging.

## Efficiencies Gained

The post-compose staging sync dropped from 3–4 hours down to 20–25 minutes. The full compose/sync process went from 4–5 hours down to roughly 1.5 hours. As a bonus, module-related mistakes should be greatly reduced too.

Where this has helped is when a compose has failed to run automatically (due to unsigned packages or other issues), and we've needed to trigger a manual compose. We had to do that recently to get some kernels out over the weekend, a process that took under two hours with the improvements made, rather than up to the 12 hours it would have taken previously.

We'd still like to make the compose process scale linearly with the size of the package updates, but that's a longer-term project. For now, we'll take the win we've got.

For more detail, see the [tracking issue on GitHub](https://github.com/rocky-linux/releng/issues/48).

