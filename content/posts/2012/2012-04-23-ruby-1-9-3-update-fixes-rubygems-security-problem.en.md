---
title: Ruby 1.9.3 update fixes RubyGems security problem
date: 2012-04-23T18:54:00+00:00
layout: single
author_profile: true
url: 2012/04/23/ruby-1-9-3-update-fixes-rubygems-security-problem/
tags:
  - security
  - software
  - Updates
lang: en
categories: 
  - techblog
---
[<img title="Ruby_Logo_200" border="0" alt="Ruby_Logo_200" align="right" src="http://lh6.ggpht.com/-XjuMkY0_fdE/T5WeZPk8aeI/AAAAAAAAFnA/3WmBOsJbfKE/Ruby_Logo_200_thumb%25255B1%25255D.png?imgmax=800" width="200" height="105" />](http://lh5.ggpht.com/-Y4Of9qy8VeM/T5WeW01MjaI/AAAAAAAAFm4/oZYy1Tn6XpU/s1600-h/Ruby_Logo_200%25255B3%25255D.png)The H-Security: The [Ruby](http://www.ruby-lang.org/en/) development team has published an update to the 1.9.3 series of its open source programming language to fix a vulnerability found in the [RubyGems](http://rubygems.org/) package management framework. 

The maintenance release of the scripting language, labelled 1.9.3-p194, updates RubyGems to close a security hole that caused SSL server verification to fail for remote repositories. This has been addressed by disallowing redirects from https to http connections and by enabling the verification of server SSL certificates in an updated version of RubyGems, 1.8.23; more details on these issues are provided in the latest [RubyGems History file](https://github.com/rubygems/rubygems/blob/1.8/History.txt). The developers encourage those who use https source in `.gemrc` or `/etc/gemrc` to upgrade as soon as possible. 

Further information about the update, including a full list of bug fixes, can be found in the [official release announcement](http://www.ruby-lang.org/en/news/2012/04/20/ruby-1-9-3-p194-is-released/) and in the [change log](http://svn.ruby-lang.org/repos/ruby/tags/v1_9_3_194/ChangeLog). Ruby 1.9.3-p194 is available to [download](http://www.ruby-lang.org/en/downloads/) from the project's site, and is distributed under either the [Ruby Licence or the GPL](http://www.ruby-lang.org/en/LICENSE.txt). 

The developers have also [released](http://www.ruby-lang.org/en/news/2012/04/21/ruby-1-9-2-p320-is-released/) an update to the 1.9.2 branch of Ruby (1.9.2-p320) to correct the RubyGems security problem.