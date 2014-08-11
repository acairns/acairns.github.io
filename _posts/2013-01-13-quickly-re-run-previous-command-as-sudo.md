---
title: Quickly re-run previous command as sudo
author: Andrew
layout: post
permalink: /2013/01/quickly-re-run-previous-command-as-sudo/
date: 2013-01-13
categories:
  - Tips
---
I've lost count how many times I've forgot to *sudo* something:

<pre class="brush: bash; title: ; notranslate" title="">$ cp ../default.conf new.conf
cp: new.conf: Permission denied

</pre>

Instead of re-typing this or using the *up* arrow and prefixing sudo, you can do:

<pre class="brush: bash; title: ; notranslate" title="">$ sudo !!

</pre>

This will re-run the previous command as sudo. In my example above:

<pre class="brush: bash; title: ; notranslate" title="">$ sudo !!
sudo cp ../default.conf new.conf

</pre>

A handy little time-saver!
