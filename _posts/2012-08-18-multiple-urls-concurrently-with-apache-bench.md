---
title: 'Testing Multiple URL&#8217;s Concurrently with Apache Bench'
author: Andrew
layout: post
permalink: /2012/08/multiple-urls-concurrently-with-apache-bench/
categories:
  - Tips
tags:
  - apache
  - benchmarking
  - performance
---
I have a senario at the moment where two processors running at the same time is causing some concurrency problems. The first processor collects data from Twitter&#8217;s Streaming API and the second aggregates total counts based on the collected data.

<!--more-->

Trying to replicate this issue when developing locally was becoming a little troublesome.

I was finally able to expose the issue by concurrently requesting the processors with Apache Bench and collecting some debug to help fix the issue. To do this, I created the following script:

<pre class="brush: plain; title: ; notranslate" title="">#!/bin/sh

ab -n 300 -c 10 http://localhost/consume.php &gt; consumer.log &
ab -n 300 -c 10 http://localhost/aggregate.php &gt; aggregator.log &
</pre>

For those not familiar with shell scripting, what this is doing is making multiple calls to *ab* &#8211; the Apache Bench binary. Placing an *&* after a command forces that command to run in the background allowing the execution to continue to the next command without waiting. Using *>* places the results into a file, in our case two log files will be created within the current working directory.