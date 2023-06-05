---
title: Security issue in Website Optimizer
date: 2010-12-07T12:49:00+00:00
layout: single
author_profile: true
url: 2010/12/07/security-issue-in-website-optimizer/
tags:
  - Google
  - Google website optimizer
  - Mail
  - privacy
  - security
lang: en
category: 
  - techblog
---
Take a look in the Email I got from Google a few minutes ago:

[![website_optimizer_logo_sm](http://lh3.ggpht.com/_vaUVXcmC3OI/TP4mTOCIvlI/AAAAAAAADZk/ZdPdNLXmLvc/website_optimizer_logo_sm_thumb.gif?imgmax=800 "website_optimizer_logo_sm")](http://lh6.ggpht.com/_vaUVXcmC3OI/TP4mR6AImVI/AAAAAAAADZg/NuIjBac0rnM/s1600-h/website_optimizer_logo_sm%5B2%5D.gif)Dear Website Optimizer user,

We are writing to inform you of a potential security issue with Website Optimizer. By exploiting a vulnerability in the Website Optimizer Control Script, an attacker might be able to execute malicious code on your site using a Cross-Site Scripting (XSS) attack. This attack can only take place if a website or browser has already been compromised by a separate attack. While the immediate probability of this attack is low, we urge you to take action to protect your site.

We have fixed the bug, and all new experiments are not susceptible. However, any experiments you are currently running need to be updated to fix the bug on your site. Additionally, if you have any Website Optimizer scripts from paused or stopped experiments created before December 3, 2010, you will need to remove or update that code as well.

There are two ways to update your code. You can either stop current experiments, remove the old scripts, and create a new experiment, or you can update the code on your site directly. We strongly recommend creating a new experiment as it is the simpler method.
