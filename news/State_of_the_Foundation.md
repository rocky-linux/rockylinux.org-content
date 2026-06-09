---
title: "State of the Foundation"
date: "2026-06-10"
author: "R. Leigh Hennig"
---

# State of the Foundation

To the Rocky Linux Community, Sponsors, and Partners,

With the release of Rocky Linux 9.8 and 10.2, we wanted to provide an update to the community on the state of the Rocky Enterprise Software Foundation, reviewing what we've accomplished recently, what's in flight, and what's planned for the future. There are a number of organizational changes within the RESF and technical efforts underway that we're excited to share.

TL;DR:

- **New Leadership Roles**: The RESF is introducing Operations, Architect, and Engineering Leads to improve operational accountability while preserving contributor autonomy.
- **Infrastructure & Security**: We are launching "Infrastructure v2" (focused on automation and reproducibility), introduced a new security repository, and updated our Secure Boot processes.
- **Community Expansion**: To deepen engagement, we are centralizing documentation, publishing public project boards, and actively recruiting new contributors.

## Organizational Structure

Historically, the Rocky project has been organized into a flat structure, with each team functioning as peers and with no form of hierarchical leadership. This allowed each to operate with a high degree of autonomy, empowering contributors to operate according to the best interests of their team. This flexibility allowed us to move with the rapidity required to organize, build, and deploy early infrastructure and produce builds as quickly as possible.

Over time as we've transitioned from our earlier 'start up' phase to one of a more sustained, operational phase, we've encountered some challenges with this model, primarily around accountability, operational consolidation, and human resource constraint. Rather than being able to function independently to get their work done, some teams became overly reliant upon others, producing bottlenecks and overburdening different parts of the project. Progress slowed, and movement toward goals became challenging as intentions accumulated more quickly than successful executions.

While we look to retain the element of independence and contributor equality that empowered us at the beginning, it's important to recognize structures that no longer fully serve us, or the community. To that end, alongside the existing President and Vice President roles that will not be changing, we are introducing three new positions and appointees:

### Operations Lead

R. Leigh Hennig is responsible for the organizational health and operational integrity of the RESF. In this capacity, he oversees our legal, administrative, and compliance foundations, ensuring long-term financial sustainability through robust sponsorship management. His mandate also includes the mitigation of organizational risk, the fostering of cross-team alignment, and the continued cultivation of our people and talent development programs.

### Lead Architect

Mustafa Gezen is tasked with the stewardship of our overarching technical vision and "inside-the-OS" strategy. In this role, he directs the architecture of our build systems, manages critical upstream relationships, and provides strategic oversight for SIG direction and the formulation of long-term release roadmaps.

### Engineering Lead

Jonathan Dieter holds accountability for the infrastructure and tooling that enable Rocky Linux to be assembled, tested, and released. His responsibilities span managing our packaging platforms, our security posture, testing infrastructure, and coordinating with technical teams to ensure our delivery targets are met.

As co-founders of Rocky Linux, Leigh and Mustafa bring deep familiarity with and understanding of the Rocky Linux vision, objectives, and project spirit. Jonathan is a twenty-year veteran of the Fedora project, and along with a wealth of experience in distributions brings exceptional technical expertise required to shepherd the build of Rocky Linux.

In short, Mustafa sets the technical vision, Jonathan is responsible for its execution, and Leigh's role ensures structural cohesion and foundational stability and growth.

Our objective in implementing this framework is not a reorganization for its own sake, but rather to mitigate the over-concentration of responsibility on any single individual while unblocking our teams, expanding community involvement, and enabling meaningful paths for those with an interest in contributing to the project. Team leads and deputies retain their roles and day-to-day responsibilities, with Operations Lead, Lead Architect, and Engineering Lead functioning as escalation paths.

## Technical Goals and Enhancements

There have already been a number of improvements the team has made this year, such as improving the accuracy of and automating the publication of errata. We also deployed new aarch64 hardware for the Testing team, reducing test runs from hours to minutes, significantly increasing the velocity of tests we can run--but this is just the beginning.

### Infrastructure v2

We've learned a lot over the last several years as we built Rocky Linux. Reviewing our infrastructure and the decisions we made along the way, we've identified a number of things that work well for us, and other areas that need refinement. The first iteration of our infrastructure has served us well, but we think we can do better.

We're taking a look at our infrastructure, which covers everything from access, accounting, and authentication, to storage, transport, and packaging, and designing a new, greenfield deployment with certain principles in mind from day one:

- **Automation**: using infrastructure-as-code, every part of our environment should be deployed using standard, open source toolsets, such as Terraform, and Ansible
- **Reproducibility**: the community should be able to replicate our environment as closely as possible with minimal effort
- **Simplicity**: our infrastructure should not be needlessly complicated, and allow for many hands to possess expertise over each part of it

### New Secure Boot Environment

As a sponsor, Equinix Metal has graciously donated the bare metal resources necessary for the signing of our Secure Boot shims. We are deeply grateful for their support and generosity. With the deprecation of this service however, we have identified Fibertown, an independent colocation provider with facilities in Houston and Bryan, Texas, to host our own equipment that will facilitate package signing. Independently owned and operated, Fibertown provides the security, compliance, connectivity, and reliability necessary to host such a critical part of our infrastructure. Acquiring and deploying our own hardware enables us to have greater control over the environment, while reducing our operational expenditure and saving cost.

### Updated Signing Shim

In response to Microsoft retiring its 2011 third-party UEFI CA and rolling out replacement CAs and a new KEK through 2026, Rocky Linux is shipping dual-signed shims, signed by both the old CA and the new CA, so a single shim binary works across both older hardware that only trusts the 2011 certificate and newer hardware enrolled with the 2023 one. For further reading, see our [write-up](https://rockylinux.org/news/2026-06-02-secure-boot-ca-kek-transition).

### Security Repo

The last few weeks have seen a rash of critical CVEs being published that expose users to exploitation (CopyFail, DirtyFrag). Typically, Rocky Linux incorporates patches and fixes when they are made available by our upstream distribution. At times however when a patch is critically needed but has not yet been made available for us to incorporate into our builds, we still want to offer users protection. To that end we introduced [a new security repo](https://rockylinux.org/news/2026-05-14-introducing-security-repository), disabled by default, and designed to be superseded automatically by upstream patches when those are made available.

### Team Enablement

Currently contributors and team members are limited in the virtual environments they can spin up to work on testing and builds. Provisioning resources is slow, manual, and requires team coordination. We're changing that to enable our teams to self-serve and deploy necessary resources in a responsible, safe, and repeatable manner.

Other improvements on our roadmap for the year include consolidating our various Git services, expanding and improving our image testing, publishing errata more rapidly, and publishing new images quickly to various cloud services, such as Docker, Quay, AWS, and Microsoft Azure.

## Community Engagement, Team Expansion, and Documentation

A project of this scale cannot thrive without a vibrant, empowered community. As we prepare for upcoming point releases, we are heavily focused on team expansion and making it easier for new contributors to get involved and make meaningful contributions from day one. To further community engagement and increase operational transparency, we are focusing efforts on public visibility in several important areas.

### Community Survey

Earlier this year we conducted a community survey, something we intend to do annually moving forward. You can read the details of that [here](https://rockylinux.org/news/2026-05-11-community-survey-2026-results), but what we saw showed we had gaps in our ability to onboard new contributors.

We're working on a number of ways to address this, such as migrating and consolidating our documentation to [docs.rockylinux.org](https://docs.rockylinux.org), with a plan to deprecate the existing [wiki.rockylinux.org](https://wiki.rockylinux.org). This includes establishing new, comprehensive documentation for getting started, standardized contribution guidelines, and defining clear coding standards.

### Project Management Boards

Each team has a new, publicly visible project board, tracking high-level issues that we're working on (the Security team is the exception to this–their board remains private), and you can find each of them [here](https://github.com/orgs/rocky-linux/projects).

Issues may still be submitted to [https://git.resf.org](https://git.resf.org), the project boards track higher level efforts.

### Mattermost Channel Consolidation

Old channels have been archived, extra channels have been pruned, and we're emphasizing moving as much discussion as possible from internal channels to public ones.

We want you to see what we're working on, where we're tracking things, and understand how you can get involved, with clear paths to meaningful contribution to whatever team that interests you.

### Event Attendance & Sponsorship

Engaging the community in online spaces is vital, but we're always eager to meet with folks in person as well. Building friendships and developing camaraderie over a meal or in-between talks or at booths is a great way to connect. Events we've already attended or sponsored or that are coming up include:

- FOSDEM, Brussels (January 31 - February 1)
- Southern California Linux Expo (SCALE), Pasadena (March 5 - 8)
- Open Source Summit, Minneapolis (May 18 - 20)
- Southeast Linuxfest (SELF), Charlotte (June 12 - 14)
- Flock, Prague (June 14 - 16)
- Linux Plumber's Conference, Prague (October 5 - 7)
- Ekoparty, Buenos Aires (October 7 - 9)
- All Things Open, Raleigh (October 19 - 20)
- Supercompute, Chicago (November 15 - 20)
- Open Source Experience, Paris (December 9 - 10)

In addition to these, our Vice President, Brian Clemens, attends numerous conferences small and large all around Japan. If you make it to one, there's a good chance you'll see him there.

### Contributor Spotlight

Our contributors are what have made, and continue to make, Rocky Linux a success. Every day people graciously donate their time, effort, and energy to everything from testing and community to security, release engineering, and documentation. That deserves recognition. Each month we're going to be featuring on our website and socials a contributor spotlight, highlighting an individual and their effort. June starts with [Michael Young](https://rockylinux.org/news/2026-06-03-contributor-spotlight-michael-young), with additional highlights to follow.

### Call for Contributors

Over the coming days and weeks, we will be asking for contributors across our various social channels, forums, and Mattermost chat. If you've ever felt like you had an interest in contributing but either didn't have the time, knowledge, or weren't sure where to begin, we hear you. If you want to help, there's room for you on each team. A few specific needs currently include:

- **Community**: Team deputies, Mattermost and IRC moderators, blog writers, and in-person event coordinators
- **Documentation**: creating new guides, assisting each team in migrating from wiki.rockylinux to docs.rockylinux
- **Design**: we're looking for everything from new designs for t-shirts and stickers to upcoming wallpaper submissions and event banners
- **Testing**: assist in building out Sparky and Kickstart tests for new builds, testing images on physical hardware, and expertise with OpenQA and cloud testing
- **Release Engineering**: fixes and patches for packaging as new builds are released and work with alternate architectures, such as RISC-V 

We encourage you to review the open issues on each team's project board and contact us if you have an interest in contributing. Additional information on contributing and current efforts can be found [here](https://rockylinux.org/news/2026-06-08-get-involved-where-rocky-linux-needs-you).

## Sponsor Engagement

The RESF would not be where it is today without the generous support of our sponsors. We are building, after all, a community *enterprise* operating system, and we recognize the important needs and contributions of our sponsors, partners, and users in government, academia, research, industry, and enterprise. We're grateful for the support we receive. While we maintain our independence, our sponsors, partners, and supporting organizations are an integral part of our community--and that support goes both ways. Over the coming weeks, we will be reaching out to new and existing sponsors to recognize their contributions and demonstrate our commitment to our community members in these spaces. If your organization is interested in supporting Rocky Linux, we'd love to hear from you: please reach out to sponsor@resf.org.

## Special Thanks and Recognition

Rocky Linux owes an immeasurable debt of gratitude to Louis Abel, whose vision, dedication, and technical leadership helped transform an ambitious idea into one of the most trusted enterprise Linux distributions in the world. As a co-founder of Rocky Linux and the driving force behind the Release Engineering team, Louis built the foundational systems and processes that made Rocky Linux possible — from the ground up, under extraordinary pressure, and with a standard of quality that set the tone for everything that followed. His tireless commitment to the project, the community, and the mission of keeping enterprise Linux free and open ensured that Rocky didn't just launch, but thrived. While Louis has moved on to new endeavors, his fingerprints are on every release, every build, and every milestone the project has achieved. We are profoundly grateful for everything he gave to Rocky Linux, and the foundation he leaves behind will continue to serve this community for years to come.

In closing, we'd like to thank everyone involved in the Rocky Linux project for making it such a success. We're grateful for your support, and we look forward to the exciting progress we have planned.
