---
title: Protect Hosts File
date: 2009-01-13T23:50:43+03:30
description: Lock the Windows hosts file so malware cannot hijack DNS mappings — historically via Avira Firewall, after immunizing known bad domains.
layout: single
author_profile: true
url: 2009/01/13/protect-hosts-file/
tags:
  - Safety Tips
  - Guide
  - Security

categories:
  - TechBlog

seeAlso:
  - /2009/01/13/hosts-file/
  - /2009/01/13/antivirus/
  - /2009/01/13/site-advisor/
---
![](/images/2009/01/protect-hosts-file/02.jpg)

Malware sometimes rewrites the [hosts file](/2009/01/13/hosts-file/) to redirect you to malicious sites or to cut you off from update and security vendors. **Locking** the hosts file makes unauthorized edits harder.

This note was written when **Avira Premium Security Suite** could lock the hosts file from its firewall settings. Product UIs change; the idea remains: immunize known malware domains first, then prevent silent rewrites.

## Before you lock

1. Review how the [hosts file](/2009/01/13/hosts-file/) works.
2. Immunize by blocking known malware domains (for example with a hosts manager such as HostsMan).
3. Then lock the file. Unlock periodically if you want to refresh blocked domains (weekly or monthly).

## Locking with Avira (historical steps)

Assuming you have Avira Premium Security Suite:

1. Open Avira and open the configuration window.
2. Go to **[+]** Firewall → Settings → click **Lock now** (see the image above) → **Apply** → **OK**.

If you no longer use Avira, look for an equivalent “protect hosts file” option in your security suite, or set the hosts file read-only after editing it carefully as an administrator. Keep a real [antivirus](/2009/01/13/antivirus/) in the mix either way.
