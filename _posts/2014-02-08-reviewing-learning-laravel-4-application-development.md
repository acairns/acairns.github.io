---
title: Reviewing Learning Laravel 4 Application Development
author: Andrew
layout: post
permalink: /2014/01/becoming-a-writing-machine/
date: 2014-02-08
---

Early in the new year [Packt Publishing](http://www.packtpub.com/) got in touch and asked if I could write a review on Hardik Dangar's [Learning Laravel 4 Application Development](http://bit.ly/1gb8XNK). I was excited, I'm a huge fan of Laravel 4 and use it fairly regularly. I looked at this as an opportunity to delve deeper and couldn't wait to get started.

I always quickly scan through technical books at first - and this time was no different. Usually, I can get a good feel of the quality of the book by quickly inspecting something on each chapter. Being a code-related book, I skimmed some code first and I was pretty disappointed. Mid-way though the book there is a phenomenal amount of mistakes. Stupid stuff like:

{% highlight php %}
<?php
DB::table('users''')->insert(
{% endhighlight %}

Typos happen - it's no big deal, right? Sure, you can overlook the odd typo, but page after page I see code like this:

{% highlight html %}
<!doctype html>
   <html lang=""en">"
   <head>
     <meta charset=""utf-8">"
     <meta http-equiv=""X-UA-Compatible"" content=""IE=edge,chrome=1">"
     <title>{{ $title }}</title>
     <meta name=""viewport"" content=""width=device-width">"
     <link href=''//fonts.googleapis.com/css?family=Droid+Sans:400,700''
   rel='stylesheet''' type='text/css'''>
       {% raw %}{{ HTML::style('css'/bootstrap.css') }}
   {{ HTML::style('css'/style.css') }}
     {{ HTML::style('css'/slider.css') }}
     {{ HTML::script('js'/slider.js') }}s{% endraw %}
   </head>
   <body class = "{{" $class }}">"
{% endhighlight %}

I wish I could say that I chose the above snippet after hunting for hours for the worst example. Unfortunately, I can't. The reality is that I quickly selected a page at random. Looking again, it's probably not even the worst example from that page.

After putting the book down for a few weeks, I decided to revisit it to get my review done. I had hoped to say "errata is isolated to a processing issue with quotation marks" - but this isn't the case.

Dangar instructs us on page 29 to "generate a boilerplate controller" using the following artisan command:

{% highlight bash %}
$ php artisan controller make:user
{% endhighlight %}

This is incorrect. To generate a controller using artisan, the proper command would be:

{% highlight bash %}
$ php artisan controller:make user
{% endhighlight %}

He has a second bite at the cherry on page 39:

{% highlight bash %}
$ php artisan Usercontroller:make users
{% endhighlight %}

Again, this is incorrect. The correct command would be:

{% highlight bash %}
$ php artisan controller:make UserController
{% endhighlight %}

Back on page 35, we create a controller and setup some routes. Unfortunately if you follow Dangar's method, it will not work. When creating a controller with the class name of _PagesController_, the following won't work:

{% highlight php %}
<?php
Route::get('contact', 'Pages@contact');
{% endhighlight %}

What you are looking for is:

{% highlight php %}
<?php
Route::get('contact', 'PagesController@contact');
{% endhighlight %}

This was my braking point. Quickly scanning the chapter titles to see if anything looked interesting was fruitless. Knowing a slew of syntax errors awaited me if I continued, it was time for me to close the book.

But here's the deal - writing a book is hard. It truly is hard work. For me, this review is probably the most I've written since my final year dissertation at university. At the end of the day, the readers of this book are smart people and most will spot, and know how to fix, the PHP mistakes.

My main issue is with the vast amount of HTML syntax errors and general quality control. This book has 3 reviewers other than the author - these mistakes should have been caught prior to publication. If I were in charge of a publishing company - this is not the quality of work I would want to be putting on the shelves.
