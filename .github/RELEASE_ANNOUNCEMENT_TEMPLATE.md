# Release announcement template

Copy the template below into `news/rocky-linux-<major>-<minor>-ga-release.md` when
writing a GA release announcement, then fill in the bracketed values.

Keep this file out of `news/`. The website clones `news/` at build time and
publishes every Markdown file it finds there, so a template stored alongside the
posts would appear on the site as a post.

## Conventions

**Filename.** `rocky-linux-<major>-<minor>-ga-release.md`, all lowercase,
hyphen-separated. The validator in `scripts/validate-news-content.mjs` rejects
anything else. Do not put the date in the filename; it belongs in the
frontmatter.

**Frontmatter.** `title`, `date` (`YYYY-MM-DD`, quoted), and `author` are
required. Title is `Rocky Linux <version> Available Now`.

**Author.** Always `Rocky Linux Team`, never an individual. A release is the
work of many people across Release Engineering, Testing, Infrastructure,
Documentation, and the SIGs, and whoever writes the announcement is rarely the
person who did most of that work. A single byline on the post would misrepresent
who produced the release. Individual contributors are credited by name in the
Acknowledgements section instead.

This applies to the body as well as the frontmatter: no "By <name>" line under
the title and no personal sign-off at the end. Write in the first-person plural
throughout ("We are pleased to announce"), not the singular.

**Section order.** Use these headings, in this order, so readers can find the
same information in every release:

1. `## Highlights`
2. `## Important Changes`
3. `## Known Issues`
4. `## Testing`
5. `## Upgrade and Conversion Process`
6. `## Reporting Bugs`
7. `## Acknowledgements`

Include `## Known Issues` even when nothing is outstanding; say so explicitly.
An absent section reads as an oversight rather than a statement. Subsections
under `## Highlights` vary by release — group them by theme, not by upstream
chapter.

**Links.** Release notes live at
`https://docs.rockylinux.org/releases/release_notes/<major>_<minor>/`. The
shorter `/release_notes/<ver>/` path is from before the documentation migration
and now 404s. Link the release notes once in the intro rather than repeating
the link at the end of each section.

**Writing.** Prefer active voice: "`grub2` boots from NVMe over Fibre Channel,"
not "support for booting ... has been added." Cut openers that carry no
information, such as "As with any release, there are known issues." Within a
single list, keep every item the same grammatical shape — either all sentence
fragments or all full sentences, not a mix.

Bullets that only announce a version bump should stay short. Detail that runs
past about 25 words usually belongs in the release notes, not the announcement.
The announcement tells readers what changed and what they must act on; the
release notes carry the exhaustive list.

Do not use MkDocs admonitions (`!!! note`) or documentation-relative links
(`../../gemstones/...`). Neither renders on the website.

**Verify before publishing.** Check technical claims against the upstream Red
Hat release notes for the matching version. Confirm that every URL resolves,
especially the Testrarc book and the Mattermost playbook channel, which are
created per release. Run `npm run validate` before opening the pull request.

Four checks catch most errors:

1. *Does Rocky actually ship it?* Upstream release notes describe things
   delivered through Red Hat's registry and subscription streams alongside
   ordinary code changes, and not all of them have a Rocky counterpart.

   Rocky publishes base container images, including `ubi`, `ubi-init`, and
   `ubi-micro` variants, on the `rockylinux/rockylinux` Docker Hub repository.
   It does not publish the per-application images upstream ships for MySQL,
   Python, Node.js, PHP, and similar, so upstream notes announcing or
   deprecating those do not apply to us.

   Kernel live patching is a similar case: `kpatch` and `kpatch-dnf` are
   packaged, but the `kpatch-patch` RPMs that carry the actual patches come
   from a Red Hat subscription stream and are not in the Rocky repositories.

   Check the relevant repository or registry before announcing a feature.

2. *Are the versions the ones we ship?* Quote versions from the repositories at
   `https://dl.rockylinux.org/pub/rocky/<version>/`, not from upstream release
   notes. The kernel in particular is usually newer than the version upstream
   documents at GA, because z-stream updates land between the upstream freeze
   and our release. Rocky 9.9 shipped 5.14.0-741.22.1 where the upstream notes
   said 5.14.0-687.5.3.

3. *Is the source document complete and for the right release?* A truncated or
   mislabeled copy of the release notes will quietly carry the previous
   version's content. If a section header names a different minor version than
   the document cover, stop and re-fetch rather than assuming an upstream typo.

4. *Is it new in this release?* Upstream relists deprecations, Technology
   Previews, and known issues in every subsequent release until they are
   removed or fixed, and the "Major changes" summary describes the release's
   current state rather than only what changed in it. Check which subsection an
   item sits under: a heading such as "Deprecated features identified in RHEL
   10.2" marks carry-over, and entry text often names the originating version
   outright. For known issues, compare the fix version against the kernel or
   package we actually ship; if we ship the fix, the issue is not ours.

---

```markdown
---
title: "Rocky Linux <version> Available Now"
date: "<YYYY-MM-DD>"
author: "Rocky Linux Team"
---

We are pleased to announce the general availability of Rocky Linux <version>.
Updated installation media, container images, cloud images, and live images are
available from the [Rocky Linux Downloads](https://rockylinux.org/download)
webpage. Please consult the [release notes](https://docs.rockylinux.org/releases/release_notes/<major>_<minor>/)
published in the [Rocky Linux Documentation](https://docs.rockylinux.org/) for
important information, such as known issues and detailed changes in this version.

Rocky Linux <version> ships with kernel <kernel version> and is available for
<architectures>.

## Highlights

### <Theme>

- **<Package or feature>**, <short description>
- **<Package or feature>**, <short description>

### <Theme>

- **<Package or feature>**, <short description>

## Important Changes

The following changes may affect existing workflows. Review them before upgrading.

- **<Change>.** <What changed, and what the reader should do about it.>
- **<Change>.** <What changed, and what the reader should do about it.>

Some Application Streams in the Rocky Linux <version> repositories will receive
no further updates. This happens with nearly every release, so check that you
are running the latest supported version of the software you depend on.

## Known Issues

- **<Issue>.** <Description, workaround, and a link to the upstream bug.>

For the complete list, see the [Rocky Linux <version> Release Notes](https://docs.rockylinux.org/releases/release_notes/<major>_<minor>/)
and the [upstream known issues](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/<major>/html/<major>.<minor>_release_notes/known-issues).

## Testing

The Rocky Linux testing process combines manual and automated checks across a
wide range of environments and configurations. We validated this release for
<duration> before approving it for availability.

Validation for this release is tracked in [Testrarc](https://testrarc.rockylinux.org).
The [RockyLinux-<version> <RC> book](https://testrarc.rockylinux.org/app/book/RockyLinux-<version>/<RC>)
records the status test by test and architecture by architecture, and needs no
login to read. Discussions and the release checklist live in the
[Rocky Release (v<version>) Playbook](https://chat.rockylinux.org/rocky-linux/channels/rocky-release-v<majorminor>).

To help test future releases, join the [~Testing channel](https://chat.rockylinux.org/rocky-linux/channels/testing)
on the [Rocky Linux Mattermost](https://chat.rockylinux.org/). Submitting results
requires a [Rocky account](https://accounts.rockylinux.org/), and Testrarc's
`community_testable` tag filters for tests that need no specialized hardware or
tooling.

## Upgrade and Conversion Process

You may upgrade from previous versions of Rocky Linux <major> to Rocky Linux
<version> on the CLI by running `sudo dnf -y upgrade`, or via desktop tools like
GNOME Software or KDE Discover.

Rocky Linux does not support upgrades between major releases. To upgrade from
Rocky Linux <previous major> to Rocky Linux <major>, a fresh install of the
operating system is recommended.

Users of other Enterprise Linux <major>-based distributions may convert their
installations to Rocky Linux <version> using the [migrate2rocky](https://docs.rockylinux.org/guides/migrate2rocky/)
utilities.

## Reporting Bugs

Please report any bugs you encounter to the [Rocky Linux Bug Tracker](https://bugs.rockylinux.org/).
We also welcome you to join our community in any way you want, be it on our
[Forums](https://forums.rockylinux.org), [Mattermost](https://chat.rockylinux.org),
[IRC on Libera.Chat](irc://irc.liberachat/rockylinux), [Reddit](https://reddit.com/r/rockylinux),
or any other way you want to participate!

## Acknowledgements

We extend our deepest thanks to the Rocky Linux project volunteers and leaders
for their commitment to making this release possible through compiling, testing,
and documenting it. Our gratitude goes as well to our sponsors and partners,
whose continued support ensures we have the resources for this work.

Special thanks to the following contributors for their efforts in this release:

- <Name> (@<handle>)

Finally, we appreciate our Enterprise Linux ecosystem: the upstream development
work of Fedora Linux, the curation work in CentOS Stream, Red Hat, and the many,
many additional developers of projects that make up our distribution.
```
