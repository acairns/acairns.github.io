---
title: "Error: Header size too large. Phil Sturgeon's cURL Library"
author: Andrew
layout: post
permalink: /2011/06/header-size-too-large/
categories:
  - Development
tags:
  - codeigniter
---
When inheriting an app utilising an old version of [Phil Sturgeon's REST Implementation for CodeIgniter][1], I uncovered a bug with a strange error - &#8220;Request header is too large&#8221; in my Apache log!

Since CodeIgniter stores loaded resources within the singleton super object, reusing classes require a small amount of garbage collection. While debugging the requests I found that the *$headers* member array wasn't being cleared between requests. At the time, I wasn&#8217;t aware Phil had [fixed the issue][2], so I started to dignose the symptoms.

Headers usually communicate information about the requesting client. This can be common things like encoding or cache-control, however some platforms may require additional headers to be set for things such as auth tokens. If your app does a large number of requests with headers, you may find a build up can quickly exceed some of Apache&#8217;s default limits.

Apache directive [*LimitRequestFields*][3] is set to *100* by default and limits the number of headers that can be present within a request. [*LimitRequestFieldsize*][4] limits the field size of a header. The [*LimitRequestLine*][5] directive limits the length of the request-line which includes the HTTP method, URI and the protocol version.

The fix is really simple. Either update to Phil's newest version or open up *Curl.php*, scroll down to the *execute()* method and find both occurrences of :

{% highlight php %}
curl_close($this->session);
$this->session = NULL;
{% endhighlight %}

After clearing the session, clear the headers array:

{% highlight php %}
curl_close($this->session);
$this->session = NULL;
$this->headers = array();
{% endhighlight %}

The headers passed with each request should now be cleared.

I have since updated the app and have found Phil's REST implementation to be quite solid. If anyone is making HTTP requests with CodeIgniter and has yet to check out [Phil's cURL library][6], I suggest they take a look.

Phil regularly maintains his public code and is very active on Twitter ([@philsturgeon][7]). Should you need to ask him a question, I'm sure he can point you in the right direction!

 [1]: http://philsturgeon.co.uk/blog/2009/06/REST-implementation-for-CodeIgniter
 [2]: https://github.com/philsturgeon/codeigniter-curl/commit/0b8afb608a2dceb39359193c483f5cccc6cbfe06#comments
 [3]: http://httpd.apache.org/docs/1.3/mod/core.html#limitrequestfields
 [4]: http://httpd.apache.org/docs/1.3/mod/core.html#limitrequestfieldsize
 [5]: http://httpd.apache.org/docs/1.3/mod/core.html#limitrequestline
 [6]: https://github.com/philsturgeon/codeigniter-curl
 [7]: http://twitter.com/#!/philsturgeon/
