---
title: "Rocky Linux 10.3 Available Now"
date: "2026-11-18"
author: "Rocky Linux Team"
---

We are pleased to announce the general availability of Rocky Linux 10.3. Updated installation media, container images, cloud images, and live images are available from the [Rocky Linux Downloads](https://rockylinux.org/download) webpage. Please consult the [release notes](https://docs.rockylinux.org/releases/release_notes/10_3/) published in the [Rocky Linux Documentation](https://docs.rockylinux.org/) for important information, such as known issues and detailed changes in this version.

Rocky Linux 10.3 ships with kernel 6.12.0-264.16.1 and is available for x86-64-v3, aarch64, riscv64, ppc64le (POWER10 and later), and s390x (IBM z15 and later).

Rocky Linux 10 requires the x86-64-v3 microarchitecture level on 64-bit AMD and Intel systems, so hardware at x86-64-v2 and earlier is not supported. If you are unsure whether your CPU qualifies, follow the [CPU compatibility check](https://docs.rockylinux.org/gemstones/test_cpu_compat/) before installing or upgrading.

## Highlights

### Compilers and developer tools

- **GCC Toolset 16**, providing GCC 16.2 and Binutils 2.46 as an Application Stream alongside the system compiler. It adds several C++26 features, including Reflection and Contracts, and changes the default C++ standard to `-std=gnu++20`
- **LLVM Toolset 22.1.8**, updating the toolset from the LLVM 21 release series
- **`rust` 1.97**, applying changes from upstream Rust 1.93 through 1.97 and switching to the v0 symbol mangling format for more accurate demangling of generic types
- **`golang` 1.27.3**, adding generic methods, the `encoding/json/v2` packages, and the `crypto/mldsa` package implementing post-quantum ML-DSA signatures
- **`gdb` 17.2**, with support for debugging x86-64 CET shadow stacks and AArch64 Guarded Control Stacks
- **Grafana 12.4.3**, built on a redesigned dashboard architecture using the Scenes library, with Unified Alerting improvements such as a Recovering state for flapping alerts
- **PCP 7.1.5**, adding automatic archive repair in `pmlogcheck`, metrics for Linux delay accounting and Device Mapper Multipath, and better handling of corrupted archives
- **Grafana PCP plugin 6.1.0**, supporting Grafana 12 with prebuilt dashboards for NVIDIA GPU metrics and vLLM inference server performance

### Security

- **Keylime 7.14.3** and **`keylime-agent-rust` 0.2.10**, adding agent-driven push attestation for edge and NAT environments, plus evidence verification for AMD SEV-SNP confidential virtual machines
- **`fapolicyd` 2.0.1**, introducing multi-threaded parallel decision processing, transactional policy and trust database updates, dynamic database sizing, and systemd watchdog integration
- **`libreswan` 5.4**, adding ML-KEM-768 and ML-KEM-1024 post-quantum key exchange in IKEv2 and multiple key exchanges per RFC 9370
- **`rust-sequoia-sqv` 1.5.0**, providing full post-quantum cryptography support based on the final OpenPGP RFC 9980
- **`audit` 4.2.1**, supporting TLS 1.3 with post-quantum cryptography and PSK authentication for remote logging, plus `cgroup` and `cgroup2` filesystem filtering in `auditctl`
- **SSH in FIPS mode** now supports and prefers the `mlkem768nistp256-sha256` and `mlkem1024nistp384-sha384` hybrid post-quantum key exchange algorithms
- **`crypto-policies`** gains a `NO-HMAC-SHA1` subpolicy for disabling SHA-1 in HMAC operations, which helps satisfy compliance scanners
- **OpenSC 0.27.1**, adding PKCS #11 version 3.2 support and post-quantum cryptography features
- **`aide`** ships a pre-configured `aide-check.timer` systemd unit for automated integrity checks and supports drop-in configuration in `/etc/aide.d/`
- **`libcap-ng` 0.9.3**, providing the new `cap-audit` tool for inspecting application capability requirements and an advanced attack surface option in `netcap`

### Kernel

- The **eBPF subsystem** and **`perf`** are rebased to upstream version 6.19
- **Runtime Verification monitors** are enabled, including the `sched` and `rtapp` monitors
- **`rtla`** gains custom eBPF threshold-overflow actions and clearer `timerlat` stack analysis for EFI call paths
- **Integrity Measurement Architecture (IMA)** appraisal is tightened on previously unevaluated file systems
- **`tboot`** is updated for Trusted Execution Technology workflows
- Intel Resource Director Technology support expands through an **`intel-cmt-cat`** rebase, with related QAT and IAA userspace updates
- IBM Z tooling and cryptography packages are refreshed, including **`libzpc` version 2**
- Memory-management and CXL enablement continues for Grace and special-purpose memory configurations
- The AMD **`amdxdna`** driver for Neural Processing Units is available as a Technology Preview

### Installer and image creation

- The **`image-builder` CLI** is generally available for building operating system artifacts and image-mode assets from the terminal
- The **image builder web console** creates `bootc`-compatible images from any valid base image in the local host store, including Fedora, CentOS Stream, and custom container images
- Image type names are standardized across the web console and CLI, such as `aws` for AMI and `guest-image` for QCOW2
- Blueprints support first-boot scripts, and **Kickstart** can add anchor certificates during installation, enabling HTTPS downloads of the installation image and in `%pre` and `%post` scripts

### Identity management and infrastructure

- The **`ipauser`** and **`ipagroup`** modules in `ansible-freeipa` support a new `query` state that reads information about users and groups without modifying them
- Active Directory AMA SIDs can be mapped to authentication indicators using **`pam_gssapi_indicators_apply`**
- **`access.conf`** accepts numerical UIDs and GIDs, bypassing name resolution to speed up access checks
- **RDMA support** is available for Valkey
- **GNOME Kiosk** adds accessibility features, including an accessibility panel, a screen magnifier, and an option to disable animations

## Important Changes

The following changes may affect existing workflows. Review them before upgrading.

- **WEP is no longer supported.** The Wired Equivalent Privacy standard has been removed, including from the `wpa_supplicant` package. Remove any WEP-configured networks before upgrading and move to WPA2 or WPA3.
- **The ZBUD compressed page allocator has been removed.** The kernel memory management core moves to upstream version 6.15, and ZSMALLOC is now the default zpool allocator for compressed swap.
- **Grafana removes legacy alerting and AngularJS plugin support.** If you depend on either, review your dashboards before upgrading.

Some Application Streams in the Rocky Linux 10.3 repositories will receive no further updates. This happens with nearly every release, so check that you are running the latest supported version of the software you depend on.

## Known Issues

- **`xxhash64` is marked as not FIPS-approved.** Storage volumes created with `dmsetup` or `integritysetup` using `xxhash64` become inaccessible in FIPS mode. It is not the default for either command, so volumes are unlikely to be affected unless it was chosen explicitly.
- **Hostname resolution fails with encrypted DNS and a custom CA in boot options.** Define the installation source in the Kickstart file rather than on the kernel command line with `inst.repo=` or `inst.stage2=`.

See the [Rocky Linux 10.3 Release Notes](https://docs.rockylinux.org/releases/release_notes/10_3/) for a complete list and explanation of known issues.

## Testing

The Rocky Linux testing process combines manual and automated checks across a wide range of environments and configurations. We validated this release for a week before approving it for availability.

Rocky Linux 10.3 is among the first releases tracked in [Testrarc](https://testrarc.rockylinux.org), the Testing team's new platform for managing release validation. The [RockyLinux-10.3 RC2 book](https://testrarc.rockylinux.org/app/book/RockyLinux-10.3/RC2) records the validation status of this release test by test and architecture by architecture, and needs no login to read. Discussions and the release checklist live in the [Rocky Release (v10.3) Playbook](https://chat.rockylinux.org/rocky-linux/channels/rocky-release-v103).

To help test future releases, join the [~Testing channel](https://chat.rockylinux.org/rocky-linux/channels/testing) on the [Rocky Linux Mattermost](https://chat.rockylinux.org/). Submitting results requires a [Rocky account](https://accounts.rockylinux.org/), and Testrarc's `community_testable` tag filters for tests that need no specialized hardware or tooling.

## Upgrade and Conversion Process

You may upgrade from previous versions of Rocky Linux 10 to Rocky Linux 10.3 on the CLI by running `sudo dnf -y upgrade`, or via desktop tools like GNOME Software or KDE Discover.

Rocky Linux does not support upgrades between major releases. To upgrade from Rocky Linux 8 or 9 to Rocky Linux 10, a fresh install of the operating system is recommended, followed by restoring your data from a backup.

Users of other Enterprise Linux 10-based distributions may convert their installations to Rocky Linux 10.3 using the [migrate2rocky](https://docs.rockylinux.org/guides/migrate2rocky/) utilities.

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
