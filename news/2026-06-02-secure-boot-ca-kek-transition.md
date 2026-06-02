title: "Rocky Linux and the changing Secure Boot landscape: what you need to know"
date: "2026-06-02"
author: "Eric 'the IT Guy' Hendricks"
The Secure Boot ecosystem is going through a significant transition, and Rocky Linux is right there with it. This post covers the new Microsoft Certificate Authorities (CAs), why they matter, what a new Key Exchange Key (KEK) means for your systems, and what you need to do (or watch out for) as this rollout continues through 2026 and beyond.
Why new CAs?
The existing Microsoft 3rd Party UEFI CA that has signed third-party bootloaders, including shims for Linux distributions, expires in 2026. Microsoft has issued new CAs to replace it, and as part of that transition, they're also updating the UEFI Key Exchange Key (KEK) used in the Secure Boot chain of trust.
This isn't Rocky-specific. Every Linux distribution relying on a signed shim is affected. Red Hat has documented their side of this in their support article, and the Microsoft support article on Windows Secure Boot certificate expiration and CA updates covers the broader picture. Old certificates are going away, and the infrastructure that validates bootloaders needs to be updated.
What changes, and when
Microsoft is not replacing the old CA with a single new one. They're splitting responsibilities across multiple new CAs:

Windows UEFI CA 2023 for signing bootloaders and shims
Microsoft Option ROM UEFI CA 2023 for signing firmware on hardware like NICs and GPU cards that carry signed firmware of their own

This split matters. Systems with hardware that contains signed Option ROMs (certain network cards, storage controllers, or GPU cards) need the Option ROM CA enrolled as well, or that hardware's firmware may not validate correctly under Secure Boot.
The new KEK is Microsoft's updated Microsoft Corporation KEK 2K CA 2023. The KEK sits above the db in the Secure Boot trust hierarchy and is used to update the signature databases themselves. Without the new KEK, systems won't be able to apply db updates from Microsoft going forward.
Starting around June 2026 (October 2025 or even earlier for some vendors), OEM firmware updates delivered through tools like fwupd or vendor-specific utilities will begin enrolling the new CAs and KEK into hardware. New hardware from OEMs will ship with only the new CAs pre-enrolled. This rollout will happen gradually; it's not a single cutover date but an ongoing transition that will unfold over months as vendors ship updates. On systems where the old CA has been removed before the new one is enrolled, a shim signed only by the old CA will fail to boot.
Rocky Linux: dual-signed shims
Rocky Linux is shipping dual-signed shims, signed by both the old CA and the new CA. The same shim binary carries signatures from both, and whether it boots successfully depends on your firmware being able to parse and validate multiple signatures in a PE EFI binary, which is the expected behavior on hardware that supports it.
This approach covers the transition period and handles both older hardware with only the 2011 CA and newer hardware with only the 2023 CA enrolled. As the ecosystem stabilizes, we'll evaluate when it makes sense to move to single-signing against the new CA.
How to check your enrolled CAs
Before the transition reaches your systems, it's worth verifying what your firmware actually has enrolled. On a running Linux system:
# List the current Secure Boot Authorized Signature Database
mokutil --db | grep -i "subject\|issuer"
If mokutil isn't installed:
sudo dnf install mokutil
On Enterprise Linux-based systems, efi-readvar provides more detail:
efi-readvar -v db
efi-readvar -v KEK
You can also inspect the UEFI firmware setup screen directly under Secure Boot configuration, looking for the db (Authorized Signatures) and KEK entries.
What you're looking for:

Old CA: Microsoft Corporation UEFI CA 2011 (present on most systems today)
New bootloader CA: Windows UEFI CA 2023 (required for shims signed and issued after June 2026)
New Option ROM CA: Microsoft Option ROM UEFI CA 2023 (required for hardware with signed Option ROM firmware)
New KEK: Microsoft Corporation KEK 2K CA 2023 (required for future db updates from Microsoft)

If your system only shows the 2011 CA, you're not yet ready for shims signed exclusively by the new CA. Rocky's dual-signed shim will still work for now, but you'll want to track your vendor's firmware update availability.
Updating the CA and KEK: proceed with care
Many systems will receive the new CAs and KEK automatically through OEM firmware updates via fwupd or vendor utilities. On Linux-managed systems, the path depends entirely on your hardware vendor.
Do not attempt to manually enroll the new KEK or CAs unless you know exactly what you're doing and have a tested recovery path.
Modifying UEFI Secure Boot variables (especially the KEK and Platform Key (PK)) carries real risk. An incorrect enrollment, a corrupted variable, or unexpected firmware behavior can leave a system that will not boot at all. Some firmware implementations handle this gracefully. Many do not.
If you do need to enroll the new CAs or KEK yourself, check your hardware vendor's documentation first. Some vendors provide tooling or firmware updates that handle this safely. Verify you have physical access to the machine and can reach the UEFI setup screen to recover if something goes wrong. This can brick your system. Don't do it on production hardware without a tested recovery procedure.
What to expect as the transition rolls out
As OEM firmware updates enroll the new CAs and KEK:

Systems updated by their OEM will begin to rely on the new CAs for Secure Boot validation
Shims signed only by the old CA will fail to boot on systems where the old CA has been removed
Rocky's dual-signed shim carries both signatures; whether your firmware validates it depends on your hardware's ability to parse multiple PE signatures
New hardware from OEMs will ship with only the new CAs pre-enrolled

This rollout will not happen overnight. Different hardware vendors will ship firmware updates on their own schedules, and some hardware may take longer to receive updates than others. Monitor your vendor's firmware release notes and track fwupd updates accordingly.
Summary

Microsoft is rolling out new CAs (Windows UEFI CA 2023 and Microsoft Option ROM UEFI CA 2023) and a new KEK to replace certificates expiring in 2026
Rocky Linux is shipping dual-signed shims covering both the old and new CA; whether your firmware validates them depends on your hardware's PE multi-signature support
Check your enrolled CAs with mokutil --db or efi-readvar -v db before OEM firmware updates reach your systems
Do not manually enroll the new KEK or CAs without a vendor-supported path and a tested recovery plan
OEM firmware updates will roll out gradually through 2026 and beyond via tools like fwupd; this is not a single cutover event

Questions or issues? The Rocky Linux community is active on Mattermost and the forums. If you run into firmware behavior that seems wrong, document it and bring it to the mailing list. This is an ecosystem-wide transition, and the more data we have from real hardware in the wild, the better.
