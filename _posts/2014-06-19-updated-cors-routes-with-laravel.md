---
title: Updated Cross-Origin Resource Sharing with Laravel
author: Andrew
layout: post
permalink: /2014/06/updated-cors-routes-with-laravel/
date: 2014-06-19
categories:
  - Development
  - Laravel
excerpt: A while ago I wrote a post about Cross-Origin Resource Sharing in Laravel 4. At the time of writing, Laravel 4 was still in beta and now, 18 months later, the landscape looks a little different.
---

A while ago I wrote a post about Cross-Origin Resource Sharing in Laravel 4.

At the time of writing, Laravel 4 was still in beta and now, 18 months later, the landscape looks a little different.

So, needing to sort out some headers in your response? The response object is your friend:

{% highlight php %}
$this->afterFilter(function ($route, $req, $resp) {
    $resp->headers->set('Access-Control-Allow-Origin', '*');
    return $resp;
});
{% endhighlight %}

Thanks to [@philsturgeon](https://twitter.com/philsturgeon) for letting me know the article was out-of-date and for sending an updated gist.
