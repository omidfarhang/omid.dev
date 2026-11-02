---
date: 2026-11-02T22:33:00+03:30
url: notes/179364624898448408/
relatedPost: /2026/08/10/aur-freeze-supply-chain-attack/
---
AUR publishing appears to be blocked again. Several packages I track are locally newer than their published AUR versions, which is consistent with Git/SSH pushes being disabled or failing.

This follows the mid-October discovery of typosquatted AUR packages impersonating `yay` and `paru`. One package, `yyay`, shipped legitimate upstream code but added an install scriptlet that downloaded and executed a remote shell script with root privileges. The AUR team banned the account and removed the packages.

I have not yet found an official announcement confirming a new repository-wide push freeze, but the local version mismatch strongly suggests writes are restricted again. The last officially confirmed freeze ended on August 11, when pushes and adoption were restored under review gates while registration remained closed.
