---
title: Building Internal Web Tools on Windows
date: 2007-09-18T11:45:00+00:00
description: How small teams built internal web tools with PHP, MySQL, and classic Windows stacks before frameworks dominated — lessons from real IT support work.
layout: single
author_profile: true
url: 2007/09/18/building-internal-web-tools-on-windows/
tags:
  - Web Development
  - PHP
  - MySQL
  - Windows
  - IT Support

categories:
  - TechBlog
---
By late 2007, a lot of "enterprise" work still happens on **small internal web apps**: timesheets, inventory lookups, simple ticketing, phone directories. You do not always need Java or .NET. Sometimes you need **PHP, MySQL, and a Windows server** that the IT team can actually maintain.

That is common in broadcasting, education, and mid-size offices — anywhere IT support sits close to the users and budgets are tight.

## Why Internal Tools Matter

Desktop apps are expensive to deploy. Browser tools win when:

- Users already have **IE7 or Firefox** on every desk
- Data changes often — schedules, asset lists, weekly reports
- You want **central updates** without visiting every PC
- Access control maps to **Active Directory** or simple username/password logins

One PHP file change updates everyone on Monday morning. Try that with a VB6 desktop app.

## A Typical 2007 Stack

Nothing fancy:

- **Windows Server 2003** or a sturdy XP Pro box as host
- **IIS 6** or **Apache 2** with **PHP 5.2**
- **MySQL 5.0** for storage
- **phpMyAdmin** for emergency database edits
- **Dreamweaver** or hand-coded HTML for UI
- **Batch or AutoIt** for nightly backups and log rotation on the same machine

**XAMPP** and **WAMP** bundles make local development easy — install on a workstation, build the app, copy to the server when ready. No Linux required if your team lives on Windows.

## Keep the First Version Boring

Successful internal tools share traits:

1. **One primary workflow** — submit hours, search asset tag, print label
2. **Obvious validation** — bad dates rejected with plain language, not SQL errors
3. **Readable URLs** — `/timesheet.php`, not mystery routing
4. **Export to CSV** — managers love opening reports in Excel 2003/2007
5. **Audit trail** — who changed what, when

Resist feature creep. Version 1.0 should solve one problem completely.

## A Minimal Pattern That Works

```php
<?php
$host = 'localhost';
$user = 'timesheet_app';
$pass = 'change_me';
$db   = 'internal_tools';

$link = mysql_connect($host, $user, $pass);
mysql_select_db($db, $link);

$hours = (float) $_POST['hours'];
$date  = mysql_real_escape_string($_POST['work_date']);

if ($hours <= 0 || $hours > 24) {
    die('Invalid hours entered.');
}

mysql_query("INSERT INTO entries (work_date, hours, user_id) VALUES ('$date', $hours, 1)");
echo 'Saved.';
?>
```

This is 2007-era PHP — `mysql_*` functions, not PDO. It is also honest about what many internal tools looked like. Modernize the database layer when you can; ship the workflow first.

## Security Basics People Skip

Internal does not mean safe:

- **SQL injection** is everywhere in copy-paste tutorials — use parameterized queries or at minimum `mysql_real_escape_string`
- **Shared passwords** on admin pages are common and dangerous
- **Intranet apps** get ported to port 80 on the internet by mistake — firewall rules matter
- **Backups** are "we copy the folder sometimes" — automate mysqldump nightly

Treat internal apps like public ones: least-privilege database accounts, HTTPS when crossing subnets, no default credentials.

## Deployment and Maintenance

- Run PHP error logging to a file, not to the browser — users should not see stack traces
- Rotate Apache/IIS logs or disk fills silently
- Document the connection string, backup path, and restore procedure in one text file on the server
- Test in IE7 **and** Firefox — internal users run both

Version control with **Subversion** beats `final2_real.zip` on a shared drive. Even a single-branch SVN repo on the server helps when someone breaks the timesheet two hours before payroll.

## Ship the Useful Thing

Internal web tools are where many IT careers learn full-stack thinking: not from hype, but from a payroll clerk waiting on a fix.

Start small. Ship the useful workflow. Secure the database. Document the backup before the tool becomes business-critical.
