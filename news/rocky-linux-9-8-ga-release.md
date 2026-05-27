---
title: Rocky Linux 9.8 Available Now
date: "2026-05-27"
author: "Brian Clemens"
---

We are pleased to announce the general availability of Rocky Linux 9.8. Updated installation media, container images, cloud images, and live images are available from the [Rocky Linux Downloads](https://rockylinux.org/download) webpage. Please consult the [release notes](https://docs.rockylinux.org/release_notes/9_8/) published in the [Rocky Linux Documentation](https://docs.rockylinux.org/) for important information, such as known issues and detailed changes in this version.

## Highlights

### Notable New Features and Changes

- **Security**
  - OpenSSH 9.9, introducing many fixes and improvements over OpenSSH 8.7
  - GnuTLS 3.8.10 with ML-KEM hybrid key exchange and ML-DSA post-quantum (PQ) algorithms
  - p11-kit 0.26.1 with post-quantum cryptography (PQC) definitions in PKCS #11 headers
  - fapolicyd 1.4.3 with rule filtering support
- **Dynamic programming languages, web, and database servers**
  - MariaDB 11.8
  - PostgreSQL 18
  - Ruby 4.0
  - Node.js 24
- **System toolchain components**
  - GCC 11.5
  - glibc 2.39
  - Annobin 12.98
  - Binutils 2.35.2
- **Performance tools and debuggers**
  - GDB 16.3
  - Valgrind 3.26.0
  - SystemTap 5.4
  - Dyninst 13.0.0
  - elfutils 0.194
  - libabigail 2.9
- **Performance monitoring tools**
  - PCP 6.3.7
  - Grafana 10.2.6
- **Compiler toolsets**
  - GCC Toolset 15, including:
    - GCC 15.2
    - Binutils 2.44
  - LLVM Toolset 21.1.8
  - Rust Toolset 1.92.0
  - Go Toolset 1.26.2

### Image Builder

Image Builder now supports advanced disk partitioning for custom images, Kickstart file injection when building ISO images, and WSL2 image creation. System images such as AWS or KVM formats no longer include a separate `/boot` partition.

For a more complete explanation of updates and changes, please see the [Rocky Linux 9.8 Release Notes](https://docs.rockylinux.org/release_notes/9_8/).

## Testing

Every Rocky Linux release undergoes thorough testing for accuracy and stability, and Rocky Linux 9.8 is no exception. The Rocky Linux testing process includes manual and automated checks across a wide range of environments and configurations. We have validated this release for a week before approving it for availability. Testing artifacts, discussions, and the release checklist are available in the [Rocky Release (v9.8) Playbook](https://chat.rockylinux.org/rocky-linux/channels/rocky-release-v98).

To participate in this testing process for future releases, join the [~Testing channel](https://chat.rockylinux.org/rocky-linux/channels/testing) on the [Rocky Linux Mattermost](https://chat.rockylinux.org/).

## Upgrade and Conversion Process

You may upgrade from previous versions of Rocky Linux 9 to Rocky Linux 9.8 on the CLI by running `sudo dnf -y upgrade`, or via desktop tools like GNOME Software or KDE Discover.

Rocky Linux does not support upgrades between major releases. To upgrade from Rocky Linux 8 to Rocky Linux 9, a fresh install of the operating system is recommended.

Users of other Enterprise Linux 9-based distributions may convert their installations to Rocky Linux 9.8 using the [migrate2rocky](https://docs.rockylinux.org/guides/migrate2rocky/) utilities.

## Acknowledgements

We extend our deepest thanks to the Rocky Linux project volunteers and leaders for their commitment to making this release possible through compiling, testing, and documenting this release. Our gratitude extends to our sponsors and partners for continuing to ensure we have the necessary resources for this task.

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
