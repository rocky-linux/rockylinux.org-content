---
title: Rocky Linux 10.2 Available Now
date: "2026-05-28"
author: "Brian Clemens"
---

We are pleased to announce the general availability of **Rocky Linux 10.2**. Updated installation media, container, cloud, and live images are available from the [Rocky Linux Downloads](https://rockylinux.org/download) webpage. Please consult the [release notes](https://docs.rockylinux.org/release_notes/10_2/) published within [Rocky Linux Documentation](https://docs.rockylinux.org/) for important information, such as known issues and a more detailed explanation of changes in this version.

## What's in This Release

Rocky Linux 10.2 delivers broad post-quantum cryptography adoption, compiler and toolchain refreshes, Flatpak-first delivery for Firefox and Thunderbird, a switch to Sequoia-PGP in Podman, and more.

### Post-Quantum Cryptography

Building on progress from 10.0 and 10.1, Rocky Linux 10.2 features substantial post-quantum cryptography (PQC) improvements:

- **OpenSSH** now supports ML-KEM hybrid key exchange (`mlkem768nistp256-sha256`, `mlkem1024nistp384-sha384`) in FIPS mode.
- **libssh** adds PQ/T hybrid key exchange methods combining ML-KEM with ECDH.
- **Directory Server** supports TLS certificates using ML-DSA keys (ML-DSA-44/65/87).
- **p11-kit** gains PQC definitions in PKCS #11 headers.
- **podman-sequoia** supports composite post-quantum signatures.

**Important:** The `FUTURE` system-wide cryptographic policy now **only** allows hybrid ML-KEM key exchange algorithms. All traditional non-post-quantum key exchange methods have been removed from this policy. This will break connections to endpoints that do not support PQC, including most of the public internet. Review your crypto policy if you use `FUTURE`.

### Desktop Changes

Flatpaks are now the default delivery method for **Mozilla Firefox** and **Mozilla Thunderbird**. The Anaconda installer preinstalls these Flatpaks automatically when a graphical environment is selected. RPM packages remain available in AppStream for the lifetime of Rocky Linux 10, and users who prefer them can override the default in Kickstart configurations.

### Installer and Image Creation

- Default `/boot` partition size increased from 1 GiB to **2 GiB** to accommodate larger `initramfs` images.
- New `rdp` Kickstart command enables headless RDP-based graphical installations.
- The Image builder Cockpit application now supports creating bootable container and disk images.
- Support for stateless PXE images for HPC and diskless systems via the `pxe-tar-xz` image output format.
- Anaconda supports automatic Flatpak installation from local, CDN, and Satellite sources.

### Upgraded Software

**Dynamic programming languages, web, and database servers:**

- Node.js 24
- PHP 8.4
- Ruby 4.0
- Python 3.14
- OpenJDK 25
- Apache HTTP Server 2.4.63
- MariaDB 11.8
- PostgreSQL 18

**System toolchain:**

- GCC 14.3
- glibc 2.39
- Annobin 13.02
- Binutils 2.41

**Compiler toolsets:**

- GCC Toolset 15 (GCC 15.2, Binutils 2.44)
- LLVM Toolset 21.1.8
- Rust Toolset 1.92.0
- Go Toolset 1.26.2

**Performance tools and debuggers:**

- GDB 16.3
- Valgrind 3.26.0
- SystemTap 5.4
- elfutils 0.194
- PCP 7.0.3

**Infrastructure services:**

- Samba 4.23.0 (SMB3 UNIX Extensions enabled by default; experimental SMB3-over-QUIC)
- chrony 4.8
- FRR 10.4.1

### Security

- The `keylime-agent` is rebased to 0.2.9 with a new agent-driven push attestation model and expanded hardware cryptography.
- New `clevis-pin-trustee` package enables automated LUKS volume decryption via remote attestation.
- `fapolicyd` is rebased to 1.4.3 with rule filtering support.
- New `libreswan-minimal` sub-package for smaller container images without systemd dependency.
- SELinux policy now confines the `redfish-finder` service.

### Kernel

- The `io_uring` asynchronous I/O interface is now available (as a tech preview), reducing syscall overhead for high-throughput applications.
- Extended `perf` features and new Intel core, uncore, c-state, and package performance events.
- AMD IBS load-latency filtering for improved CPU and memory analysis.
- New Intel QAT GEN6 driver (`qat_6xxx`) for concurrent crypto and compression; AMD Venice CCP crypto device support.
- Intel In-memory Analytics Accelerator (IAA) promoted from Tech Preview to fully supported.
- Improved real-time tuning via `rtla` threshold-overflow actions and `cpupower` Python bindings.
- Enhanced LUKS-aware kdump handling.

### Networking

- **PRP and HSR** (IEC 62439-3) industrial redundancy protocols move from Tech Preview to fully supported, including VLAN segmentation on HSR/PRP interfaces.
- **nftables** rebased to 1.1.5 with reduced memory consumption for sets/maps and support for wildcard-pattern `netdev` hooks.
- **WiFi7** hardware support.
- **firewalld** adds policy sets -- pre-defined collections of policies (e.g., `gateway`) for common configurations like masquerading and zone forwarding.
- Configurable lower TCP retransmission timeout via `tcp_rto_max_ms` sysctl and `TCP_RTO_MAX_MS` socket option.

### Virtualization

- **QEMU** supports native Forced Unit Access (FUA) I/O, improving virtual storage performance for database workloads.
- **virtio-win** adds `viosock` driver and `VsockTcpBridge` service for direct host-to-Windows-VM socket communication.
- New `virt-secrets-init-encryption` service encrypts `libvirt` secrets (e.g., vTPM keys) using `systemd` credentials sealing.
- Backup jobs (`virsh backup-begin`) now keep the VM process alive even if the guest OS shuts down mid-backup.
- Intel TDX gains a local Provisioning Caching Certification Service (PCCS) for attestation in air-gapped environments.

### Containers

- **Podman** switches from GnuPG to **Sequoia-PGP** for OpenPGP image signature verification, with support for post-quantum algorithms (ML-DSA-87+Ed448). GnuPG signing workflows remain supported alongside the new `--sign-by-sq-fingerprint` option.
- **Podman 5.8.2** includes automatic BoltDB-to-SQLite migration on reboot (preparation for Podman 6.0 dropping BoltDB), new `podman quadlet install` command, quadlet REST APIs, and `unless-stopped` restart policy surviving reboots.

### Identity Management

- **IdM/FreeIPA** rebased to 4.13.0 with a new beta web UI (Tech Preview), RSNv3 enabled by default, and 170+ bug fixes.
- **Directory Server** gains PQC support (ML-DSA TLS certificates), dynamic groups, online TLS certificate refresh, and bulk replication conflict cleanup.
- **Samba** rebased to 4.23.0 with experimental SMB3-over-QUIC support and a new Prometheus metrics exporter.

### Web Console (Cockpit)

Cockpit is rebased to version 356 with a health dashboard warning for unclean shutdowns, custom branding support via `/etc/cockpit/branding.css`, detachable VNC console windows, quadlet lifecycle management in cockpit-podman, and a file manager that can create empty files.

## Important Changes

The following changes may affect existing workflows. Review before upgrading.

- **PHP 8.4 and PHP 8.3 are available.** When installing PHP dependencies, be sure the correct version is used. As an example, `php-json` will match both `php-common` and `php8.4-common`.
- **`FUTURE` crypto policy** now only allows hybrid ML-KEM key exchange. Traditional (non-PQC) key exchange methods are removed from this policy, breaking interoperability with non-PQC endpoints. This does not affect the `DEFAULT` policy.
- **`vi` no longer launches Vim** when both `vim-minimal` and `vim-enhanced` are installed. It now always starts the minimal editor; run `vim` explicitly for the full editor.
- **Windows Server 2012 R2** Active Directory trust configuration is no longer supported, aligning with Microsoft's end-of-life for that version.
- **SCTP transport for knet** is deprecated in Corosync. Transition to supported transport protocols.

## Testing

Like every Rocky Linux release, Rocky Linux 10.2 has undergone thorough testing for accuracy and stability. The Rocky Linux testing process encompasses both manual and automated checks across a diverse range of environments and configurations. We have validated this release thoroughly before approving it for general availability. Testing artifacts, discussions, and the release checklist can be found in the [Rocky Release (v10.2) Playbook](https://chat.rockylinux.org/playbooks/runs/gybf83pxipf5fdz7wubzxp566h).

To participate in this testing process for future releases, join the [~Testing channel](https://chat.rockylinux.org/rocky-linux/channels/testing) on the [Rocky Linux Mattermost](https://chat.rockylinux.org/). We can't wait to meet you!

## Upgrade and Conversion Process

You may upgrade from Rocky Linux 10.0 or 10.1 to Rocky Linux 10.2 on the CLI by running `sudo dnf -y upgrade` or via desktop tools like GNOME Software or KDE Discover.

Rocky Linux does not support upgrades between major releases. To upgrade from Rocky Linux 8 or 9 to Rocky Linux 10, a fresh install of the operating system is recommended.

Users of other Enterprise Linux 10 based distributions may convert their installations to Rocky Linux 10 using the [migrate2rocky](https://docs.rockylinux.org/guides/migrate2rocky/) utilities.

## Known Issues

See the [Rocky Linux 10.2 Release Notes](https://docs.rockylinux.org/release_notes/10_2/) for a complete list and explanation of known issues.

## Acknowledgements

We extend deepest thanks to the Rocky Linux project volunteers and leaders for their commitment to making this release possible through compiling, testing, and documenting this release. Our gratitude extends to our sponsors and partners for continuing to ensure we have the necessary resources for this task.

Special recognition to these contributors for their work on this release:

- Alan Marshall (@alangm)
- Alexey Melezhik (@melezhik)
- Arian Acabrera (@acabrera)
- Bob Robison (@grayeul)
- Boris Reisig (@boris)
- Brady Dibble (@bdibble-ciq)
- Brian Clemens (@brian)
- Bryan Zuelly (@codedude)
- Chris Stackpole (@stack)
- Fredrik Nystrom (@nscfreny)
- Jason Rodriguez (@jrod)
- Jim Baresich  (@jb2592)
- Jonathan Dieter (@jdieter)
- Joey Brinkman (@j0ey)
- Ken Carlile
- Howard Van Der Wal (@metalinux)
- Gabriel Graves (@nebraskacoder)
- Leigh Hennig (@leigh)
- Lukas Magauer (@lumarel)
- Michael Young (@elguero)
- Mike Renfro (@mikerenfro)
- Mustafa Gezen (@mustafa)
- Nathan B (@kemotaha)
- Ryan Smith (@rsmith)
- Sam Thornton (@sthornton)
- Scott Shinn (@atomicturtle)
- Sherif Nagy (@sherif)
- Skip Grube (@skip77)
- Stephen Simpson (@ssimpson)
- Steven Spencer (@sspencerwire)
- Taylor Goodwill (@tgo)
- Thomas Doczkal
- Tuan Hoang (@tqhoang)
- Trevor Cooper (@tcooper)
- Wale Soyinka (@wale)

Finally, we appreciate our Enterprise Linux ecosystem: the upstream development work of Fedora Linux, the curation work in CentOS Stream, and the many, many additional developers of projects that make up our distribution.
