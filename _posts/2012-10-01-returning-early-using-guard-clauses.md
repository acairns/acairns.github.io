---
title: Returning Early using Guard Clauses
author: Andrew
layout: post
permalink: /2012/10/returning-early-using-guard-clauses/
date: 2012-10-01
categories:
  - Development
---
I've been reading a lot recently about the use of guard clauses. Guard clauses can be used early within a method to handle special cases leaving the following code clear. Each method should have a clear execution path however when multiple conditional statements and loops are introduced, this purpose of the method can become lost.

This is something I've been doing for a long time. It's a simple concept and greatly improves readability. Once I handle all my special cases at the beginning of the method, I know the current state of the request is able to continue the execution of the method.<!--more-->

Let's take a look at a simple example where we check if a user is logged in:

{% highlight php %}public function welcome()
{
    if ( $this->user->logged_in() )
    {
        $this->user->update_last_login();
        $this->template->content = \View::forge( 'welcome' );
    }
    else
    {
        \Response::redirect();
        return false;
    }
}
{% endhighlight %}

This is a simple example of a method within a controller which checks if the user is logged in or not. If the user is logged in, a welcome view is loaded and if they are not logged in - they are redirected.

If this function was to use a guard clause, it would look something like:

{% highlight php %}public function welcome()
{
    if ( !$this->user->logged_in() )
    {
        \Response::redirect();
        return false;
    }

    $this->user->update_last_login();
    $this->template->content = \View::forge( 'welcome' );
}
{% endhighlight %}

In this example, the condition is reversed so we can guard the method from the possibility that the user is not logged in and allow the rest of the code to follow the normal execution required to serve the purpose of the method. The primary purpose of this method is to display the welcome view, so we handle the case of the user not having access first leaving us safe to render the view.

Even though this is a simple example, I hope it is clear that the amount of nested conditionals and indenting can be reduced and cleaned up by a few simple steps.

Before posting this article I reached out to some developers within the industry I'm in contact with regularly to get to know their thoughts on the issue. I found that it is quite a common issue within teams and can often be a result of rushing to meeting a deadline.

I had an interesting conversation with <a title="Phil Sturgeon" href="http://philsturgeon.co.uk/" target="_blank">Phil Sturgeon</a> where he said:

> Generally making flat logic for your controller methods is a long-standing thing. It's something devs learn as they mature.

I thought this was a great way to look at refactoring as a whole - a distinguishing characteristic or quality that experienced developers should demonstrate.

If you would like to read more about returning early and loop exiting, there is a <a title="Loop Exits and Structured Programming" href="http://www.cis.temple.edu/~giorgio/cis71/software/roberts/documents/loopexit.txt" target="_blank">good paper by Eric Roberts</a> from Stanford University. I would also suggest the work by Martin Fowler on <a title="Martin Fowler - Refactoring" href="http://refactoring.com/" target="_blank">Refactoring</a> and a great article on <a title="Flattening Arrow Code" href="http://www.codinghorror.com/blog/2006/01/flattening-arrow-code.html" target="_blank">flattening arrow code</a> (thanks Phil).
