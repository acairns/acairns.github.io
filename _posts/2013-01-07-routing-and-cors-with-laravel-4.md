---
title: Routing and CORS with Laravel 4
author: Andrew
layout: post
permalink: /2013/01/routing-and-cors-with-laravel-4/
categories:
  - Development
  - Tips
---



I've been trying to keep up with the latest Laravel developments. The syntax is just beautiful and it's use of design patters is just Object-Orientated porn. The main turn-on for me with Laravel is the IoC container and how testable components are. This sits well with my TDD nature and I haven't even mentioned it's use of Composer to leverage the PHP community.

So, a few months ago I started a little app. Nothing fancy, but it was in Laravel 3. I've decided to rewrite it in Laravel 4 so I can get some experience before it's officially released. The app has a widget that will be used on remote sites. It will request some javascript from a remote server which may also make an API call.

Yep! I had some problems with Cross-Origin-Resource-Sharing, but I also encountered a few Laravel 4 things to boot ; so here they are.

First, I had some problems with routes. I wanted to pass a URI segment as a parameter from a GET request. Imagine a URL like: /user/1. I copied my old route as a starting point, but no joy! That's fine, I'm learning new stuff here ; good old Google will save me. I found a <a title="Laravel 4 Routes" href="http://net.tutsplus.com/tutorials/php/what-to-expect-from-laravel-4/" target="_blank">Laravel 4 Routes Video</a> but that didn't quite have what I was looking for.

Here's what I was doing wrong. The old documentation has the following <a title="Laravel 3 Wildcards" href="http://laravel.com/docs/routing#wildcards" target="_blank">example for wildcards</a>:

{% highlight php %}
Route::get('user/(:num)', function ($id) {
    //
});
{% endhighlight %}

In Laravel 4 there are some really nice new routing features along with a few minor tweaks to the wildcards. The *(:num)* wildcard is now represented as *{num}*. Here's the same example again, but fixed to work with L4:

{% highlight php %}
Route::get('user/{num}', function ($id) {
    //
});
{% endhighlight %}

Thanks to <a title="Phil Sturgeon" href="http://philsturgeon.co.uk/" target="_blank">Phil Sturgeon</a> (<a title="Phil Sturgeon" href="https://twitter.com/philsturgeon" target="_blank">@philsturgeon</a>) for <a title="Help with Laravel 4 Routes" href="http://stackoverflow.com/questions/14195652/cant-pass-uri-segment" target="_blank">helping me out again on Stack Overflow</a> to solve my problem.

Dandy, I'm hitting my app and passing through an id. I'm cooking with gas. Whats this? Cross-Origin… aaargh. Ok, we've all been here before so lets start getting these headers set correctly!

I've never handled CORS with any version of Laravel. The old app I was moving over actually used an *&lt;iframe&gt;* and didn't need this to call the API. I was really interested in a nice elegant way to do this in L4 because I know I'm going to need this. I hunted, but I couldn't even find any posts out there that suggest a nice solution in L3. Maybe I didn't look hard enough!

I started pasting the usual header in places I thought it should go. Here's an interesting one that didn't work:

{% highlight php %}Route::get('user', function () {
    header('Access-Control-Allow-Origin: *');
    return 'Heya';
});
{% endhighlight %}

That's interesting right? I examined the response from this and the Access-Control-Allow-Origin header wasn't set! Guess what did work however:

{% highlight php %}header('Access-Control-Allow-Origin: *');
Route::get('user', function () {
    return 'Heya';
});
{% endhighlight %}

Nice, it works! But this is such a bad idea. This means that the Access-Control-Allow-Origin header is outside a route and will be set with every request ; even requests made by Artisan via the cli! Very nasty and not a good thing at all! So, for the giggles, I tried Artisan scaffolding ; give it a go if you want to see what happened!

I couldn't believe when the next evening <a title="Dan Horrigan, DanDoesCode" href="http://dandoescode.com/" target="_blank">Dan Dorrigan</a> (<a title="Dan Horrigan" href="https://twitter.com/DanDoesCode" target="_blank">@DanDoesCode</a>) tweeted about <a title="Laravel 4 CORS Tweet" href="https://twitter.com/DanDoesCode/status/288385113442623489" target="_blank">CORS with Laravel</a>. The evening before I got very close to his solution, but the challenge of CORS just couldn't defeat the temptation of watching the new episode of The Walking Dead (thanks for recommending it <a title="Nathan Payne" href="https://twitter.com/natepay" target="_blank">@natepay</a>, it's freaking awesome!).

So, with thanks to Dan, here's how you handle CORS in L4:

{% highlight php %}
$response->headers->set('Access-Control-Allow-Origin', '*');
{% endhighlight %}

That's sexy right? Leveraging the Symfony response object.

Now, in my case, I'm going to be using a Controller. So how do we set this header from an after filter from within the Controller in L4? Those that watched the YouTube video I linked earlier will know this!

{% highlight php %}
public function __construct()
{
    $this->afterFilter(function ($response) {
        $response->headers->set('Access-Control-Allow-Origin', '*');
        return $response;
    });
}
{% endhighlight %}

That's some pretty looking code, right?

Thanks to <a title="Dan Horrigan" href="https://twitter.com/DanDoesCode" target="_blank">@DanDoesCode</a> and <a title="Phil Sturgeon" href="https://twitter.com/philsturgeon" target="_blank">@philsturgeon</a> for helping out ; and a huge shout out to <a title="Taylor Otwell" href="https://twitter.com/taylorotwell" target="_blank">@taylorotwell</a> for building such a lovely framework to work with!
