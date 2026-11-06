---
title: "Migrating Wiki to Docs"
date: "2026-11-05"
author: "R. Leigh Hennig"
---
# Achievement Unlocked: Consolidating and Migrating Our Documentation

Like all projects, Rocky Linux relies on good documentation. It’s the key to easing adoption of Rocky as an operating system for users, and for onboarding new contributors and maintainers. 
Since our founding, the documentation each of our teams produces has been split between [Wiki](https://wiki.rockylinux.org) and [Docs](https://docs.rockylinux.org).

The Rocky Linux Wiki served us well as a place for our contributors to store documentation on everything from team membership and initiatives to Special Interest Groups and contributing. 

Separately, the Documentation team has long managed Docs as the repository for public documentation. Primarily focused on getting things done such as setting up [bind](https://docs.rockylinux.org/guides/dns/private_dns_server_using_bind/), [migrating to Rocky](https://docs.rockylinux.org/guides/migrate2rocky/), and other user-oriented guides, our Docs site is an excellent source of curated, translated, high quality information. 

While each site was intended to serve a different purpose, we’ve found that maintaining two repositories of information has not scaled well as the project has grown. Often users had confusion about where to store or search for information. Over time, it became apparent that we needed to simplify our process for accessing, creating, and working with our documentation. 
After considering the user and contributor experience for both English and non-native speakers alike, we began the effort to deprecate Wiki in favor of Docs.

When evaluating how to reconcile our different documentation platforms, a top priority was making it as easy as possible for people to contribute. Easing the friction of creating and maintaining documentation is critical to this effort, and removing as many barriers to this as possible is what helps to ensure the highest quality documentation is easy to both produce and consume. User feedback made it apparent that working with the Docs platform was easier than working with underpinned Wiki.

Used by millions of people around the world, one of the fantastic strengths of Rocky Linux is our community, including all the many non-English speaking users and contributors. Localization has long been a cornerstone of our build effort, and we are proud to have an incredibly diverse and dedicated group of translators helping to make using Rocky possible for everyone around the world. 

Critically, Wiki lacked the integration with [Crowdin](https://crowdin.com/), the translation engine that allows contributors to translate English-sourced documents to other languages.

> It's easier to build community when you speak the language of the user--whatever that is. 
- Steven Spencer, Documentation Team Lead

By migrating everything to Docs, we enable each document created to be made available for translation to over a dozen languages. 

This was a massive undertaking that has been months in the making, involving every team within the project, an army of volunteers, and hours upon hours of work to re-write, edit, and ensure everything ported cleanly to Docs with no broken links or malformed structure. 

By consolidating our public-facing documentation to a single site, we've simplified the process of creating and finding docs, enabled new translation options from English to supported languages, and eased the contribution process by supporting a more user-friendly platform. Adding new documentation is now faster, easier, and our Documentation team and the many contributors who help in that area are able to bring a higher level of quality to our docs than ever before. 

Special thanks is owed to the Documentation team and to the leads Wale Soyinka and Steven Spencer, without which this enormous undertaking would not have been possible.
 
Contributors are welcome to join the [~Documentation](https://chat.rockylinux.org/rocky-linux/channels/documentation) team channel on our Mattermost server, and those interested in translation can participate in our [~Localization](https://chat.rockylinux.org/rocky-linux/channels/l10n) channel.
