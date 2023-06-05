---
title: PostgreSQL patches XML flaws
date: 2012-08-19T08:51:00+00:00
layout: single
author_profile: true
url: 2012/08/19/postgresql-patches-xml-flaws/
tags:
  - flaw
  - PostgreSQL
  - SQL
  - Updates
  - Vulnerability
lang: en
category: 
  - techblog
---
<a href="http://lh5.ggpht.com/-_CvERcVioNM/UDCiAjUuQUI/AAAAAAAAG_k/BhHqmScL6wQ/s1600-h/PostgreSQL_Logo%25255B2%25255D.png" target="_blank"><img title="PostgreSQL_Logo" border="0" alt="PostgreSQL_Logo" align="right" src="http://lh6.ggpht.com/-NQBd0Fjk1dQ/UDCiCi6_FMI/AAAAAAAAG_s/wB-EwOeaYfE/PostgreSQL_Logo_thumb.png?imgmax=800" width="150" height="117" /></a>h-online: A flaw in the built-in XML functionality of [PostgreSQL](http://www.postgresql.org/) (CVE-2012-3488) and another in its optional XSLT handling (CVE-2012-3489) have been patched, and the developers have [released updated versions](http://www.postgresql.org/about/news/1407/) of the open source database with relevant fixes. The holes being patched are related to insecure use of the widely used libxml2 and libxslt open source libraries and the PostgreSQL developers advise anyone using those libraries to check their systems for similar problems. 

Both problems in PostgreSQL allow authenticated users of the database to read arbitrary files on the system, and the XSLT flaw allows writing of files. Details are limited, but the [release notes for 9.1.5](http://www.postgresql.org/docs/9.1/static/release-9-1-5.html) note how `xml_parse()` and `xslt_process()` could be used to access information about files or parts of those files. 

To fix the problem, the PostgreSQL developers have released versions [9.1.5](http://www.postgresql.org/docs/9.1/static/release-9-1-5.html), [9.0.9](http://www.postgresql.org/docs/9.0/static/release-9-0-9.html), [8.4.13](http://www.postgresql.org/docs/8.4/static/release-8-4-13.html) and [8.3.20](http://www.postgresql.org/docs/8.3/static/release-8-3-20.html) and urge users to “update their installations at the first available opportunity”. The updates do break some backward compatibility though: users who rely on the built-in XML functionality to validate external DTDs will have to implement a workaround and users who use `xslt_process()` to fetch documents from external URLs will no longer be able to do so. The developers say they regret having to disable this functionality, but have to do so “to maintain our security standards”. 

They also note that these fixes are “substantially similar” to issues in WebKit ([CVE-2011-1774](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2011-1774)), XMLsec ([CVE-2011-1425](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2011-1425)) and PHP5 ([CVE-2012-0057](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2012-0057%3ACVE-2012-0057%7C_blank)). Developers who use libxml2 and libxslt should probably take note of this and check to see if they are exposed to any issues through their use of the libraries. 

The update to PostgreSQL also includes several fixes for version 9.1 of the open source database and a number of fixes for older versions. These include corrections to time zone data, documentation corrections, Python/Unicode fixes, a correction to log rotation and reduced data loss when replication failovers among others. As the update is a minor update, users need only shutdown the database, install the new binaries and restart.

<a title="-1669853" href="http://h-online.com/-1669853" target="_blank">http://h-online.com/-1669853</a>