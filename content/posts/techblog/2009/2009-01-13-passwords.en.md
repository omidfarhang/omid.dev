---
title: Passwords
date: 2009-01-13T23:55:43+03:30
lastmod: 2026-08-08T01:30:00+03:30
description: What makes a password strong — length, randomness, and passphrases — plus why a password manager, 2FA, and passkeys beat clever schemes.
layout: single
author_profile: true
url: 2009/01/13/passwords/
shortlink: https://g.omid.dev/txruZTG
tags:
  - Safety Tips
  - Password
  - Security

categories:
  - TechBlog

seeAlso:
  - /2009/01/14/tips-to-help-keep-your-passwords-secret/
  - /2010/03/04/too-many-passwords-here-is-a-solution/
  - /2009/01/15/passwords-used-by-the-conficker-worm/
  - /2009/01/13/phishing/
---
Strong passwords still matter, but the way we handle them has changed since this post first ran in 2009. The default today is simple: let a **password manager** create a unique random password for every site, turn on **two-factor authentication (2FA)** wherever it is offered, and use a **passkey** when a service supports one.

## What actually makes a password strong

Attackers guess and crack passwords with dictionaries, leaked lists, and raw computing power. Strength comes from:

- **Length** — longer is better. Aim for at least 14 characters; 20+ is easy when a manager generates it for you.
- **Randomness** — unpredictable beats clever. A random string wins over a pattern you invent.
- **Uniqueness** — one password per account. Reuse turns a single breach into many.

A **passphrase** — several random words strung together, such as `correct-horse-battery-staple` — is a good choice for the few secrets you must memorize (especially your password-manager master password). Long and random still beats short and “complex-looking.”

## Use a password manager (and 2FA)

You should not try to invent and remember a unique strong password for every account. A reputable manager — **Bitwarden** (free, open source), **1Password**, or **KeePass** — generates and stores them for you. You only memorize one strong master passphrase, and you protect the vault with 2FA.

When a site offers a **passkey**, prefer it: you authenticate with your device (biometrics or a local PIN) instead of typing a reusable secret. Passkeys do not replace a manager overnight, but they remove phishing-friendly password entry for the accounts that support them.

For the full “too many accounts” problem, see [Too many passwords? Here is a solution!](/2010/03/04/too-many-passwords-here-is-a-solution/).

## If you must invent a password by hand

Only if you cannot use a manager yet: pick a long passphrase of unrelated words, or start from a private sentence and mix in numbers and punctuation. Do not rely on leetspeak, reversed dictionary words, or keyboard walks — crackers know those tricks.

Example passphrase shape: four or more random words, optionally separated by hyphens or spaces if the site allows it. That is easier to type than a 14-character mnemonic soup, and usually stronger.

## Common password pitfalls to avoid

Cyber criminals use tools that rapidly try weak and recycled passwords. The old [Conficker worm password list](/2009/01/15/passwords-used-by-the-conficker-worm/) is still a useful reminder of how predictable people can be.

Avoid:

- **Dictionary words in any language**, alone or lightly modified.
- **Words spelled backwards**, common misspellings, and abbreviations.
- **Sequences or repeated characters** — `12345678`, `222222`, `abcdefg`, `qwerty`.
- **Personal information** — name, birthday, license or passport numbers, pet names from your social profiles.
- **Reuse** across email, banking, shopping, and social accounts.

## Protect how you handle passwords

Even a strong password fails if you hand it to a phishing site or leave it in a plaintext file. For day-to-day hygiene — email requests, shared computers, writing secrets down — see [5 tips to help keep your passwords secret](/2009/01/14/tips-to-help-keep-your-passwords-secret/).

## Enable two-factor authentication

A strong password can still leak in a breach. 2FA adds a second step — an authenticator app, a push prompt, or a hardware security key — so the password alone is not enough. Turn it on for email, banking, social media, your password manager, and any other account that offers it.
