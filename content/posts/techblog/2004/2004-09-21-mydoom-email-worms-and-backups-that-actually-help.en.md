---
title: Mydoom, Email Worms, and Backups That Actually Help
date: 2004-09-21T19:15:00+00:00
description: The Mydoom era reminded everyone that email worms spread fast. Here is a practical recovery and prevention checklist for Windows users in 2004.
layout: single
author_profile: true
url: 2004/09/21/mydoom-email-worms-and-backups-that-actually-help/
tags:
  - Security
  - Malware
  - Email
  - Windows
  - Backup

categories:
  - TechBlog
---
If you run support for a home network or a small office, 2004 has been a constant lesson in how fast email malware spreads once one person clicks the wrong attachment.

**Mydoom** was the headline name, but it lived in the same noisy ecosystem as Bagle and Netsky. Different family, same outcome: crowded mail queues, angry contacts, and half a day lost to cleanup.

## What We Saw in Early 2004

**Mydoom.A** appeared in January and spread faster than most AV vendors could ship signatures. Variants targeted high-profile domains — including **SCO** and **Microsoft** — with DDoS traffic from infected bots. **Mydoom.B** followed within days with tweaked behavior. By spring, IT forums were full of the same question: "Why is our mail server queueing ten thousand outbound messages?"

The worm did not need a vulnerability in Outlook itself. It needed a user, an attachment, and a desktop configured to hide dangerous file types.

## What Mydoom-Style Infections Actually Did

The common pattern was simple:

1. Arrive as a believable attachment (`.zip`, `.scr`, double-extension file names)
2. Execute under the current Windows user
3. Harvest addresses from local files and mail clients
4. Send itself aggressively through SMTP

Some variants also opened backdoor behavior and increased network noise enough to affect normal business traffic.

## Why Users Kept Falling for It

The lures were ordinary business language:

- “Mail delivery failed”
- “Invoice attached”
- “Please read this document”

On Outlook Express-heavy desktops, one click was enough to convert a workstation into an email cannon.

## Outlook and Client Settings Worth Checking

On infected machines we often find the same configuration mistakes:

- **Hide extensions for known file types** enabled — `report.zip.exe` displays as `report.zip`
- Preview pane open on messages that should never be previewed
- Address books stored in default locations that worms harvest first
- No outbound SMTP authentication — compromised PCs relay freely through the ISP

Fix the extension setting on every desktop before the next outbreak. It takes thirty seconds per machine and prevents the most common trick.

## Incident Response That Works

When you suspect infection, speed matters more than heroics:

1. Disconnect the system from network immediately
2. Stop outbound mail on local relay/gateway if available
3. Update AV signatures from a known-clean machine
4. Scan in safe mode or with rescue media
5. Rotate passwords after cleanup
6. Notify contacts briefly and clearly

Do not start with reinstall unless cleanup fails or system integrity is uncertain.

## Recovery Timeline That Works for Small Offices

Hour 0: isolate the PC, stop the mail flood. Hour 1: scan with updated definitions, check `%WINDIR%\System32` for dropped files and suspicious run keys. Hour 2–4: verify SMTP queues are draining, rotate mail passwords from a clean machine. Same day: send one short apology to contacts if your domain spammed them — explain it was malware, not you.

If documents are encrypted or system files are replaced, restore from last week's CD-R backup and patch before reconnecting. A tested backup turns a panic reinstall into a scheduled maintenance window.

## Backups That Actually Save You in 2004

Backup advice needs to match real hardware:

- Weekly **CD-R/DVD-R** archive of documents and accounting files
- Secondary copy on USB 2.0 external disk if available
- Printed list of product keys, ISP settings, and mail server settings
- Monthly restore test for at least one folder

A stack of blank discs is not a backup plan. A labeled, verified disc set is.

## Preventive Controls for Small Teams

- Show full file extensions in Windows Explorer
- Block executable attachments at mail gateway when possible
- Disable automatic preview behavior for risky attachment types
- Patch Windows and Office on a fixed schedule
- Keep AV email scanning enabled, even if it slows mail slightly

The tiny inconvenience of controls is cheaper than a week of infected mail.

## Train the Human Firewall

Technical controls reduce volume; user habits stop the final click:

- Unexpected attachment: verify by phone
- Urgent tone: pause and inspect sender/domain
- Security warning: never click through just to close the popup

One trained receptionist can prevent more outbreaks than one extra scanner license.

## The Boring Work Wins

Mydoom makes email feel like an attack surface, not just a productivity tool. The answer is not dramatic: show file extensions, patch on schedule, block dangerous attachments, and keep backups you have actually restored once.

That is the work nobody wants to do until a mail queue fills with worm traffic. Do it before the next outbreak.
