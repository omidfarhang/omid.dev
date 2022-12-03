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
category: techblog
---
Take a look in the Email I got from Google a few minutes ago:

[<img title="website_optimizer_logo_sm" border="0" alt="website_optimizer_logo_sm" align="right" src="http://lh3.ggpht.com/_vaUVXcmC3OI/TP4mTOCIvlI/AAAAAAAADZk/ZdPdNLXmLvc/website_optimizer_logo_sm_thumb.gif?imgmax=800" width="232" height="30" />](http://lh6.ggpht.com/_vaUVXcmC3OI/TP4mR6AImVI/AAAAAAAADZg/NuIjBac0rnM/s1600-h/website_optimizer_logo_sm%5B2%5D.gif)Dear Website Optimizer user,

We are writing to inform you of a potential security issue with Website Optimizer. By exploiting a vulnerability in the Website Optimizer Control Script, an attacker might be able to execute malicious code on your site using a Cross-Site Scripting (XSS) attack. This attack can only take place if a website or browser has already been compromised by a separate attack. While the immediate probability of this attack is low, we urge you to take action to protect your site.

We have fixed the bug, and all new experiments are not susceptible. However, any experiments you are currently running need to be updated to fix the bug on your site. Additionally, if you have any Website Optimizer scripts from paused or stopped experiments created before December 3, 2010, you will need to remove or update that code as well.

There are two ways to update your code. You can either stop current experiments, remove the old scripts, and create a new experiment, or you can update the code on your site directly. We strongly recommend creating a new experiment as it is the simpler method.

**Creating a New Experiment**

  1. Stop any currently running Website Optimizer experiments 
  2. Remove all the Website Optimizer scripts from your site 
  3. Create a new experiment as normal. New experiments are not vulnerable. 

**Updating the Website Optimizer Control Script Directly**

  1. Locate the Control Script on your site. It looks like this: 

> A/B Test Control Script  
> `<!-- Google Website Optimizer Control Script -->      <br />         <br />
> 
> <!-- End of Google Website Optimizer Control Script --></p>
<p>` 

> Multivariate Test Control Script  
> `<!-- Google Website Optimizer Control Script -->      <br />         <br />
> 
> <!-- End of Google Website Optimizer Control Script --></p>
<p>` 

  1. Locate the following in the Control Script: `return c.substring(...` 
  2. Modify the following line as shown:  
    BEFORE: `return c.substring(i+n.length+1,j<0?c.length:j)`  
    FIXED: `return escape(c.substring(i+n.length+1,j<0?c.length:j))`  
    Make sure to include the final closing parenthesis “)” 

> Fixed A/B Control Script  
> `<!-- Google Website Optimizer Control Script -->      <br />         <br />
> 
> <!-- End of Google Website Optimizer Control Script --></p>
<p>` 

> Fixed Multivariate Control Script  
> `<!-- Google Website Optimizer Control Script -->        <br />       <br />
> 
> <!-- End of Google Website Optimizer Control Script --></p>
</blockquote>
<p>Note that the <code>k=XXXXXXXXX` line in the above Control Script examples is a placeholder.
> 
> Your experiment will continue as normal after you’ve made this update. There’s no need to pause or restart the experiment.
> 
> We’re committed to keeping Website Optimizer secure, and we’re deeply sorry for this issue. We will continue to work hard to prevent future vulnerabilities.
> 
> Sincerely,  
> Trevor  
> Google Website Optimizer Team