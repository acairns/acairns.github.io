---
title: Draft and Publish with poole for Jekyll
author: Andrew
layout: post
permalink: /2014/02/scripts-for-drafts-with-jekyll/
date: 2014-02-01
---

*** mention something here about "poole" being confusing because of http://getpoole.com/ ***

I'm still relatively new to Jekyll - I've been aware of it for quite a long time but never, until a few months ago, had the chance to play with it.

While writing a previous post, I wrote some really simple scripts to help me quickly create drafts and publish posts. For example:

{% gist 8267431 %}

I thought this was something that Jekyll was missing - a generator of sorts to speed up and automate simple tasks. This is where [mr_poole](https://github.com/mmcclimon/mr_poole) comes in - an easily installable gem which helps to automate the creation and publication of drafts.

Let's install the gem:

{% highlight bash %}
$ sudo gem install mr_poole
{% endhighlight %}

Now, next time you wish to create a draft post, you can use poole:

{% highlight bash %}
$ poole draft "The empire strikes back"
./_drafts/the_empire_strikes_back.md
{% endhighlight %}

Excellent, now the draft has been created with auto-generated front matter.

I'm not a huge fan of using underscores for filenames in Jekyll posts. Well that's not entirely true - it's just that Jekyll uses hyphens by default and if you are starting to use mr_poole on an existing post, you want your naming convention to continue. Well, we can do something about that!

Within your _config.yml:
{% highlight yaml %}
poole:
    word_separator: "-"
{% endhighlight %}

Now let's create our new post:

{% highlight bash %}
$ poole draft "The empire strikes back"
./_drafts/the-empire-strikes-back.md
{% endhighlight %}

Sweet!


... add something about publishing drafts
