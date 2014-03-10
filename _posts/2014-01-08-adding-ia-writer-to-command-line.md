---
title: Adding iA Writer to command line
author: Andrew
layout: post
permalink: /2014/01/adding-ia-writer-to-command-line/
---


Since this blog uses Jekyll, I get to write my posts using Markdown and use a great editor. My choice being iA Writer.

I use a few scripts to speed things up, so it's important for me to be able to open iA Writer quickly from the command line. It's easy to set this up.

To add iA Writer to the command line, add the following to _~/.bash___profile_:

{% highlight bash %}
alias ia="open $1 -a /Applications/iA\ Writer.app"
{% endhighlight %}

Don't forget to reload your scripts:

{% highlight bash %}
$ source ~/.bash_profile
{% endhighlight %}

Now, to launch iA Writer:

{% highlight bash %}
$ ia _drafts/adding-ia-writer-to-command-line.md
{% endhighlight %}