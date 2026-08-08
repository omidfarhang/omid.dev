---
date: 2026-08-08T23:44:00+03:30
url: notes/178622011772729005/
---
For about a week, every AUR check on Manjaro has looked like this:

```
:: Searching databases for updates...
 -> Flagged Out Of Date AUR Packages: cursor-bin  google-chrome  visual-studio-code-bin
 there is nothing to do
```

Not a local glitch. Arch disabled AUR package adoption (and later pushes) after a wave of malicious adoptions and follow-up commits. Orphaned packages that need a new maintainer — including popular `-bin` ones like Chrome, Cursor, and VS Code — stay flagged out of date until the freeze lifts.

Announcement: [AUR packages adoption disabled](https://lists.archlinux.org/archives/list/aur-general@lists.archlinux.org/message/YPJ3FQYJTJXXY3RUXCYLMHUKHLIUNVFF/) (aur-general, 30 Jul 2026). Stay vigilant with AUR builds in the meantime.
