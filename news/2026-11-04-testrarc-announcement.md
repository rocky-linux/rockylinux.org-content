---
title: "Rocky Linux is pleased to announce Testrarc"
date: "2026-11-04"
author: "Chris Stackpole (@Stack)"
---

# Introducing [Testrarc](https://testrarc.rockylinux.org)

The goal of each Rocky Linux release is to be a binary compatible enterprise operating system that delivers a trusted platform for our users. The process from source to release goes through many volunteer community teams, undergoing meticulous checking and validation for each release candidate. 

Since 2022, Rocky Linux has utilized Mattermost Playbooks as the primary method for tracking tests, validations, and contributions. Playbooks served Rocky well but as the requirements expanded, a need for clearer transparency and better management grew. The Testing team considered and evaluated what other Linux distros used, then decided to take the best ideas that would work for Rocky Linux and incorporate them into a new tool.

Testrarc (TEST tRAcking for Rocky Candidates) is a dedicated, web-based platform tailored specifically for managing and monitoring the testing process of Rocky releases. It is a specialized, [open source](https://git.resf.org/testing/testrarc) Python application built using the Rio web development environment and designed to be a centralized dashboard to track a release across each potential stage, from a pre-release or beta through each release candidate. It tracks each applicable test on all supported hardware architectures (x86_64, aarch64, riscv64, ppc64le, s390x), keeping record of who validated the test, the result status (pass, fail, partial), and the type of environment tested (bare metal, KVM, container, VM, cloud).

# Get involved
Designed for the community, anyone is welcome to join! No login is required to view the status of testing, however, a [Rocky account](https://accounts.rockylinux.org/) is required to submit a test as we want to ensure that credit is properly given for each volunteer contribution. 

While some tests require access to tooling (eg: OpenQA or Sparrow/Sparky), many of the tests can be done by anyone. An intentional “community_testable” tag filter allows contributors to quickly identify tests that can be performed without specialized hardware, deep domain expertise, or specialized tools. 

Regardless if the community volunteer is a hobbyist running a home lab or a seasoned systems administrator, any volunteer can easily jump into Testrarc, find a test criteria they are comfortable performing, and contribute directly to the validation status.

Please join the Testing Team channel on [Mattermost](https://chat.rockylinux.org) to share your feedback.

## The production instance is now live. 

[Results](https://testrarc.rockylinux.org) from the Rocky Linux beta testing for 10.3 and 9.9 are ready for exploration and contribution.

Feedback, issues, and code can all be given and explored at the [Git page](https://git.resf.org/testing/testrarc).

Release criteria, test cases, and additional information can be found on the Testing team's [documentation](https://docs.rockylinux.org/teams/testing/documentation/qa_test_cases/) page.

## Special thanks
We're grateful to the Rocky members, volunteers, and teams that made this happen. 

Testrarc is developed by Bob Robison ([@grayeul](https://github.com/grayeul)) and Howard Van Der Wal ([@metalinux](https://github.com/metalllinux)). Transitioning from years of past experience and updating all relevant release criteria and documentation was an extensive undertaking that stretched across the Release Engineering, Infrastructure, Testing, and the Documentation teams. Thank you for providing the foundation that ensures Rocky Linux remains rock-solid for years to come.
