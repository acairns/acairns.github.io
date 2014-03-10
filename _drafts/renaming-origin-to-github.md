---
title: Renaming Git Remotes
author: Andrew
layout: post
permalink: /2014/02/renaming-git-remotes/
---

I love GitHub, it's pretty awesome for collaborating on Open Source projects. I have some things on BitBucket because they offer free private repositories - that's kinda cool. I have a client with their own Git hosting and another that uses BeanStalk. You see where this is going right?

Keeping track of where projects are hosted can be frustrating. A neat trick is to rename your _remotes_ so you can easily check. Renaming your current remotes is really simple. First, check your current _remotes_:

{% highlight bash %}
$ git remote
origin
{% endhighlight %}

This doesn't tell you much - but you can get a little more information by passing the verbose flag:

{% highlight bash %}
$ git remote -v
origin	git@github.com:acairns/acairns.github.io.git (fetch)
origin	git@github.com:acairns/acairns.github.io.git (push)
{% endhighlight %}

Here we can see our project is on GitHub - great, so let's rename our origin remote to _github_:

{% highlight bash %}
$ git remote rename origin github
{% endhighlight %}

... and that's it.

{% highlight bash %}
$ git remote
github
{% endhighlight %}

Sure, it's stupidly simple - but I've found this to be quite a useful productivity hack. It's so easy to forget stupidly simple things when hopping around on lots of projects.

There is also a nice article on the GitHub help articles regarding [remote renaming](https://help.github.com/articles/renaming-a-remote).