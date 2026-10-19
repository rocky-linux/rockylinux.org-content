---
title: "OpenCourant Becomes the First RESF Incubator Project"
date: "2026-10-19"
author: "Brian Clemens"
image: "/images/content/opencourant.png"
imageDark: "/images/content/opencourant-dark.png"
imageAlt: "OpenCourant Logo"
imageWidth: 526
---

The Rocky Enterprise Software Foundation (RESF) is proud to announce [OpenCourant](https://opencourant.org) as an RESF Incubator Project. OpenCourant is an open source finite element solver for crash, impact, and highly nonlinear dynamic simulation, and it continues the code base previously released as OpenRadioss. It is the first project to join the RESF through incubation, so this post also explains what that status means.

## **Background**

On October 1, 2026, Siemens discontinued OpenRadioss, the open source release of the Radioss solver that Altair first published in 2022. The project website was taken offline, and the GitHub repository, which held four years of community development, was removed without an archive.

OpenRadioss was released under the GNU Affero General Public License v3 (AGPLv3), so the code can still be used, studied, modified, and shared. OpenCourant starts from the last publicly available OpenRadioss code base. The full commit history was carried over, so earlier contributors' work keeps its attribution. OpenCourant is licensed under the AGPLv3 and will remain so.

Since the fork, the project has moved its continuous integration onto its own infrastructure and has started publishing stable packages.

The RESF charter was written in response to open source projects changing their license or direction in ways their users had no say in. Rocky Linux itself was started after the change to CentOS Linux. Joining the RESF gives OpenCourant a vendor-neutral home, governed under the same charter as Rocky Linux.

## **What incubation means**

An RESF Incubator Project is an open source project that the RESF has accepted with the goal of it becoming a full RESF Project. Incubating projects have the Foundation's support, but they have not yet been fully accepted as RESF Projects. Their project members are RESF members, but the project does not yet have a seat on the RESF Board of Directors.

Incubation status describes a project's community, governance, and processes. It is not an assessment of the software itself. OpenCourant's code has years of production use behind it. The project still needs to grow its contributor community, agree on a governance model, and settle its release practices.

During incubation, the RESF will provide support, mentorship from experienced RESF contributors, and guidance on governance, licensing, and trademarks. The project is expected to work in public and to report on its progress toward graduation.

## **Graduation**

To graduate and become a full RESF Project, OpenCourant will need to show the following:

- A community governance model, ideally with former OpenRadioss maintainers and community leaders involved, and enough people in place to form a Project Board under the RESF bylaws.  
- Active committers from more than one organization, so that no single company or individual has controlling influence over the project, as the RESF charter requires.  
- A documented, repeatable release process that runs on infrastructure the project controls.  
- Tracked code provenance, compliance with the AGPLv3, and resolution of any naming or trademark questions.

Graduation will be decided by a vote of the RESF Board of Directors following a review of the project. Incubator projects will report to the RESF Board at least quarterly.


## **Initial Members**

- [Brian Clemens](https://tiuxo.com), Founder, RESF Project Mentor
- [Patrick Penner](https://orcid.org/0000-0003-4988-6183), Founder, Maintainer
- [David Russell](https://uk.linkedin.com/in/david-russell-vortex-cae), Maintainer

## **Getting involved**

Anyone who used, contributed to, or maintained OpenRadioss, or who works with crash and impact simulation, is welcome to join. We would especially like to hear from former OpenRadioss maintainers.

- Website and downloads: [opencourant.org](https://opencourant.org)  
- Source code: [github.com/OpenCourant/OpenCourant](https://github.com/OpenCourant/OpenCourant)  
- Forum: [GitHub Discussions](https://github.com/orgs/OpenCourant/discussions)  
- Chat: [\#opencourant on the Rocky Linux Mattermost](https://chat.rockylinux.org/rocky-linux/channels/opencourant)  
- Email: [hello@opencourant.org](mailto:hello@opencourant.org)

Organizations that rely on the solver and would like to support the project can contact the RESF about sponsorship at sponsor@resf.org.

---

*Radioss is a trademark of its respective owner. OpenCourant is an independent community project and is not affiliated with or endorsed by Siemens or Altair.*
