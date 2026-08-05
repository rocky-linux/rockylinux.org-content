---
title: "Speeding Up Rocky Linux's Build-to-Staging Pipeline"
date: "2026-08-05"
author: "Jonathan Dieter"
---

# Speeding Up Rocky Linux's Build-to-Staging Pipeline

One of the issues we’ve been struggling with when pushing out updates is the time that it takes to get the updates out of koji, our build system, and into our staging repositories. The process was taking between four and five hours, which seemed excessive, given that you’re really just copying the new packages into staging.

## The Old Process
The process we used was split into two parts, and the first was fairly straightforward. We use a tool called pungi to take all the latest packages in koji and turn them into a “compose,” a collection of packages split into separate repositories. Note that a compose only contains the latest packages, so work still needs to be done to get the packages into staging, where we also keep all the old packages from the current minor release. The compose takes about an hour to generate, and can’t be changed without some major architectural changes.

The second part of the process is the post-compose staging sync, where we were copying the compose into staging, regenerating the metadata users pull to get updates, grabbing the security errata for this update, and then signing all the metadata. This should have been straightforward and relatively fast, even for all the repositories we ship per major release. 

Further investigation revealed that just one step, regenerating the metadata, was taking the bulk of that time. The reason lies in the process. We copy the new packages and metadata into the staging path, but then have to regenerate the metadata so it includes the old packages as well. You can reduce the number of packages being checked by passing the `--update` flag to `createrepo_c` (the tool which actually generates the metadata from the packages in the directory), which will only look at packages that aren’t already in the metadata, but that’s still every single package that has been updated in the past, and that’s why across all the repositories and all the architectures, it was taking over three hours.

## Removing the Bottleneck
One of the things we recognized was that we already had the metadata for the old packages in the staging tree. So the most logical fix was to just go and merge the compose and staging tree metadata, and that’s what we’ve done. We did have to write some libraries to handle merging the modular metadata as `mergerepo_c` (the tool which does repository merging) doesn’t support that, but that turned out to be another bonus from this work.

### A side Benefit: Fewer Modularity Mistakes
Previously, we had to manually add the modular metadata directly into a git repository because there was no easy way to combine it, and the process was prone to error (most of the modularity issues we’ve had in Rocky in the last few months were due to mistakes when adding modules to the repo). Now, with our new module merging code, we bypass the git repo altogether and just merge what’s in the compose with what is already in staging.

## Efficiencies Gained
The end result of this work is staggering. The post-compose staging sync has gone from 3 - 4 hours all the way down to 20 - 25 minutes. The full compose/sync process has gone from 4 - 5 hours down to roughly 1.5 hours. And, as a bonus, mistakes in the modules should be greatly reduced.

There are further changes we would like to achieve with the compose process so the time scales linearly with the size of the packages being updated, but those will be longer term projects. For now, we’ll take the win that we’ve got!

For detail on the project, you can see the issue we used to track this work [here](https://github.com/rocky-linux/releng/issues/48).

