---
title: "Rocky Linux 9.9 Available Now"
date: "2026-11-15"
author: "Rocky Linux Team"
---

We are pleased to announce the general availability of Rocky Linux 9.9. Updated installation media, container images, cloud images, and live images are available from the [Rocky Linux Downloads](https://rockylinux.org/download) webpage. Please consult the [release notes](https://docs.rockylinux.org/releases/release_notes/9_9/) published in the [Rocky Linux Documentation](https://docs.rockylinux.org/) for important information, such as known issues and detailed changes in this version.

Rocky Linux 9.9 ships with kernel 5.14.0-741.22.1 and is available for x86-64-v2, aarch64, ppc64le, and s390x.

## Highlights

### Languages and developer tools

- **PHP 8.4**, with property hooks, asymmetric visibility, and a standards-compliant HTML5 DOM API
- **Go 1.27**, with generic methods, the `encoding/json/v2` package, and post-quantum ML-DSA signatures in `crypto/mldsa`
- **Rust 1.97** and **LLVM Toolset 22.1.8**
- **GDB 17.2**, with support for x86-64 CET shadow stacks and AArch64 Guarded Control Stacks
- **Valgrind 3.27.1** and **SystemTap 5.5**
- **GCC Toolset 16**, including `gcc-toolset-16-gcc` and `gcc-toolset-16-binutils`
- **Node.js 26** as a Technology Preview, installable with `dnf module install nodejs:26`
- **glibc** string and memory functions up to 64 percent faster on AMD Zen 5, using 512-bit EVEX instructions by default

### Kernel and performance

- Two new sysctls, `sysctl_dr_prio_drop` and `sysctl_mem_cgroup_reclaim_retries`, tune how aggressively the kernel reclaims memory, so the OOM killer acts instead of letting the system stall under pressure
- **`perf`** updated to recent upstream versions, adding debuginfod support, expanded Intel core and uncore counters, and AMD IBS load-latency filtering
- The **Real-Time Linux Analysis (RTLA)** framework runs custom eBPF programs in response to latency threshold overflows
- **`libaio` 0.3.112** restores asynchronous polling, bringing database I/O performance back to parity with Rocky Linux 8

### Networking and security

- **TCP Authentication Option (TCP-AO)**, specified in RFC 5925, as a secure alternative to the older TCP-MD5 extension. Configure it through standard socket APIs with `setsockopt()`
- **`nmcli`** marks interfaces as managed or unmanaged permanently, and **Nmstate** configures IPIP, IP6IP6, IPIP6, and SIT tunnel interfaces
- The **IMA policy** appraises execution attempts on file systems it previously skipped, including `/tmp`, `/proc`, and `/sysfs`
- **AMD SecureTSC** protects guest timekeeping in SEV-SNP guests from a tampering hypervisor
- **Keylime 7.14.3**, **`fapolicyd` 2.0.1**, **`opencryptoki` 3.27.0**, and a new **`sequoia-sq`** package whose `sq` command reads and inspects OpenPGP certificates

### Installation and administration

- **Image Builder** supports advanced disk partitioning, Kickstart injection when building ISO images, and WSL2 images. Images in formats such as AWS and KVM no longer carry a separate `/boot` partition
- **`bootc` 1.16.4**, which merges files in `/etc` more reliably and updates the composefs implementation
- **`reposync`** gains `--min-buildtime <YYYY-MM-DD>`, letting mirror operators synchronize only recent builds
- **`pcs cluster node rename-corosync`** and **`rename-cib`** simplify renaming cluster nodes
- **`grub2`** boots from NVMe over Fibre Channel devices on IBM Power Systems
- **Cockpit 366** and **`ipa` 4.13.4**, plus full support for the LMDB backend in Directory Server

## Important Changes

The following changes may affect existing workflows. Review them before upgrading.

- **WEP is no longer supported.** The Wired Equivalent Privacy standard has been removed, including from the `wpa_supplicant` package. Move any WEP-configured networks to WPA2 or WPA3.
- **authselect disables group merging by default.** This improves lookup performance for most deployments. If you combine groups from multiple NSS sources, run `authselect enable-feature with-group-merging`.
- **pcs validates operations more strictly.** Unsupported operation names in `pcs resource update` and `pcs resource op add` now return an error, which you can override with `--force`. Invalid option values such as `role` or `on-fail` trigger errors that cannot be overridden. The `name=<value>` syntax is deprecated; pass the operation name as the first argument instead.
- **`perf` cannot demangle Rust symbols.** Rust now uses the v0 symbol mangling format, which GCC Toolset 12 and later understand but `perf` on Rocky Linux 9 does not. If you profile Rust binaries or use other tools that inspect them, expect raw symbol names. Most other users will not notice the change.
- **sendmail-milter** has moved from the CodeReady Builder (CRB) repository to AppStream, so it can now be installed without enabling CRB.

Some Application Streams in the Rocky Linux 9.9 repositories will receive no further updates. This happens with nearly every release, so check that you are running the latest supported version of the software you depend on.

## Known Issues

- **ZFS 2.2.11 does not work on Rocky Linux 9.9.** Testing found that ZFS 2.4.4 works correctly. If you run ZFS, upgrade the module before upgrading the OS. The upstream bug is [openzfs/zfs#19369](https://github.com/openzfs/zfs/issues/19369).
- **RPM packages signed with MLDSA-87 fail to install in FIPS mode.** Post-quantum algorithms are not FIPS-validated and are absent from the FIPS provider, so importing MLDSA-87 keys into the RPM database and verifying PQC signatures both fail. Leave the DNF plugin for PQC signature support disabled in FIPS mode, and the system falls back to verifying packages with classical signatures.
- **fwupd EFI capsule doesn't work.** This is a known upstream problem, see https://redhat.atlassian.net/browse/RHEL-300815 and https://redhat.atlassian.net/browse/RHEL-305227.  This will be fixed when upstream gets the fixes into 9.9.

For the complete list, see the [Rocky Linux 9.9 Release Notes](https://docs.rockylinux.org/releases/release_notes/9_9/) and the [upstream known issues](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/9.9_release_notes/known-issues).

## Testing

The Rocky Linux testing process combines manual and automated checks across a wide range of environments and configurations. We validated this release for a week before approving it for availability.

Rocky Linux 9.9 is among the first releases tracked in [Testrarc](https://testrarc.rockylinux.org), the Testing team's new platform for managing release validation. The [RockyLinux-9.9 RC2 book](https://testrarc.rockylinux.org/app/book/RockyLinux-9.9/RC2) records the validation status of this release test by test and architecture by architecture, and needs no login to read. Discussions and the release checklist live in the [Rocky Release (v9.9) Playbook](https://chat.rockylinux.org/rocky-linux/channels/rocky-release-v99).

To help test future releases, join the [~Testing channel](https://chat.rockylinux.org/rocky-linux/channels/testing) on the [Rocky Linux Mattermost](https://chat.rockylinux.org/). Submitting results requires a [Rocky account](https://accounts.rockylinux.org/), and Testrarc's `community_testable` tag filters for tests that need no specialized hardware or tooling.

## Upgrade and Conversion Process

You may upgrade from previous versions of Rocky Linux 9 to Rocky Linux 9.9 on the CLI by running `sudo dnf -y upgrade`, or via desktop tools like GNOME Software or KDE Discover.

Rocky Linux does not support upgrades between major releases. To upgrade from Rocky Linux 8 to Rocky Linux 9, a fresh install of the operating system is recommended.

Users of other Enterprise Linux 9-based distributions may convert their installations to Rocky Linux 9.9 using the [migrate2rocky](https://docs.rockylinux.org/guides/migrate2rocky/) utilities.

## Reporting Bugs

Please report any bugs you encounter to the [Rocky Linux Bug Tracker](https://bugs.rockylinux.org/). We also welcome you to join our community in any way you want, be it on our [Forums](https://forums.rockylinux.org), [Mattermost](https://chat.rockylinux.org), [IRC on Libera.Chat](irc://irc.liberachat/rockylinux), [Reddit](https://reddit.com/r/rockylinux), or any other way you want to participate!

## Acknowledgements

We extend our deepest thanks to the Rocky Linux project volunteers and leaders for their commitment to making this release possible through compiling, testing, and documenting it. Our gratitude goes as well to our sponsors and partners, whose continued support ensures we have the resources for this work.

Special thanks to the following contributors for their efforts in this release:

- Alexey Melezhik (@melezhik)
- Bob Robison (@grayeul)
- Brian Clemens (@brian)
- Bryan Zuelly (@codedude)
- Chris Stackpole (@stack)
- Fredrik Nystrom (@nscfreny)
- Gregory Casey (@sil3nthawk)
- Jeffrey Serio (@hyperreal)
- Jonathan Dieter (@jdieter)
- Howard Van Der Wal (@metalinux)
- Gabriel Graves (@nebraskacoder)
- Leigh Hennig (@leigh)
- Lukas Magauer (@lumarel)
- Michael Young (@elguero)
- Mustafa Gezen (@mustafa)
- Scott Shinn (@atomicturtle)
- Sherif Nagy (@sherif)
- Skip Grube (@skip77)
- Stephen Simpson (@ssimpson)
- Steven Spencer (@sspencerwire)
- Taylor Goodwill (@tgo)
- Trevor Cooper (@tcooper)
- Wale Soyinka (@wale)

Finally, we appreciate our Enterprise Linux ecosystem: the upstream development work of Fedora Linux, the curation work in CentOS Stream, Red Hat, and the many, many additional developers of projects that make up our distribution.
