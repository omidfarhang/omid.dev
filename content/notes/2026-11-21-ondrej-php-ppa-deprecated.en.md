---
date: 2026-11-21T23:00:21+03:30
url: notes/179528942936671199/
---
In 2026 Ondřej Surý started moving Ubuntu PHP packages off Launchpad to [packages.sury.org](https://packages.sury.org/php/), the same place Debian already used — one pipeline for both. Resolute (26.04) never got a live PPA; Jammy/Noble stayed frozen on Launchpad after the cutover. `apt update` then hit the deliberate label change:

```text
Error: Repository '…/ondrej/php/ubuntu noble InRelease' changed its 'Label'
value from 'PPA for PHP' to 'PPA for PHP (deprecated)'
Notice: This must be accepted explicitly before updates for this repository
can be applied.
Do you want to accept these changes and continue updating from this repository? [y/N]
```

**This is expected.** Answering **y** accepts the new label so `apt` can keep using the repo for now. The PPA itself is **frozen** and will not get further updates.

### Migrate (Jammy / Noble)

```bash
sudo apt update
sudo apt install debsuryorg-repository-php
sudo add-apt-repository --remove ppa:ondrej/php
sudo apt update
```

Installed PHP packages stay put; future updates come from the new source.

### Leftover PPA sources

`add-apt-repository --remove` may not clear everything. After an upgrade the suite in the filename can disagree with the running release — e.g. Resolute still had `ondrej-ubuntu-php-noble.sources` while the remove command talked about `Suites: resolute`. `apt update` kept hitting the noble InRelease.

Check and drop the leftover:

```bash
ls /etc/apt/sources.list.d/
# look for ondrej-ubuntu-php-*.sources (or *.list)
sudo rm /etc/apt/sources.list.d/ondrej-ubuntu-php-noble.sources
sudo apt update
```

Adjust the filename to match what you see. Once it is gone and `php.sources` (from `debsuryorg-repository-php`) is the only Surý entry, updates come only from packages.sury.org.

### After the first upgrade

The next `apt dist-upgrade` can look louder than “same PHP, new mirror.” On Resolute it rebuilt packages for the new suite (`…+ubuntu24.04…` → `…+debsuryorg26.04…`) and pulled a pile of upgrades at once.

Watch for these side effects:

- **Meta packages jump series.** Unversioned packages like `php-bcmath` / `php-mysql` / `php-mcrypt` may resolve to the newest PHP in the repo. Here they installed **PHP 8.6** alongside the existing 8.5 stack, and `update-alternatives` switched `/usr/bin/php` to 8.6.
- **Apache can appear as a dependency.** Pulling `libapache2-mod-php8.6` brought in the full `apache2` stack even on a machine that only ran nginx + php-fpm. Apache then failed to start with `Address already in use` on port 80 — expected if something else already binds it. If you do not need Apache, stop it and purge the pull-in:

```bash
sudo systemctl stop apache2
sudo systemctl disable apache2
sudo apt purge apache2 apache2-bin apache2-utils apache2-data libapache2-mod-php8.6
sudo apt autoremove --purge
```

That also drops the APR / Lua libs that came along. `dpkg` may leave `/var/www/html` and `/var/lib/apache2` if they are not empty — fine to ignore or clear by hand.
- **Shared libs get replaced.** Autoremove dropped older ImageMagick 6 / `libicu74` / `libzip4t64` / `libxml2` once Magick 7 and the Resolute counterparts were in place. Services that link those libs (e.g. nginx) may restart during the upgrade.
- **FPM is not re-enabled for Apache.** You may see notices about `a2enconf php8.5-fpm`; ignore them if you are not using Apache.

Pin versioned packages (`php8.5-*`) if you want to stay on a specific series; treat unversioned `php-*` metas as “whatever is current.”

**y** was the right short-term fix so the upgrade could finish. For ongoing PHP updates, migrate off the Launchpad PPA and confirm no `ondrej` source file is left behind.
