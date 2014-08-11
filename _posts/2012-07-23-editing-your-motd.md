---
title: 'Quick Tip: Edit your MOTD'
author: Andrew
excerpt: Editing the MOTD on your server can help you remember where you are in large n-tier architectures.
layout: post
permalink: /2012/07/editing-your-motd/
date: 2012-07-23
categories:
  - Tips
---
Here&#8217;s a quick tip if you are working with an n-tier architecture.

I have a load balancer in front of 6 stateless instances, but I&#8217;ve been tailing the logs for a while on one of those instances. Which one?

`cat /etc/motd`

This has served me well in the past &#8211; because I often forget to rename my console tabs!
