---
title: Using VirtualDocumentRoot to quickly setup projects
author: Andrew
layout: post
permalink: /2014/01/using-virtualdocumentroot-to-quickly-setup-projects/
---


A neat trick to speed the setup of a project locally when using Apache is to use the _VirtualDocumentRoot_ directive. There are however, a few caveats to be aware off but when you are setup - starting a new project is just a matter of updating your /etc/hosts file.

Let's start with an example vHost:

{% highlight apache %}
<VirtualHost *:80>
    ServerAlias *.dev
    UseCanonicalName Off
    VirtualDocumentRoot "/var/www/projects/%0/"

    php_admin_value auto_prepend_file /var/www/prepend.php
</VirtualHost>
{% endhighlight %}

This vHost assumes you are using the _.dev_ LTD for local development. Within your hosts file, you can redirect _project.dev_ to _127.0.0.1_ and have Apache serve requests.

_VirtualDocumentRoot_ allows us to take the host, for example _project.dev_, and use it as the name of our projects folder. 

Pretty great so far, yeah? We have _project.dev_ pointing to our local development environment and storing our project in _/var/www/projects/project.dev/_. Remember those caveats I mentioned?

As you can see from the vHost, we're not quite done. We're setting a _php_admin_value_ property. That's because we need to prepend a file to fix an issue with the value of _$_SERVER['DOCUMENT_ROOT']_ being incorrect.

Contents of _/var/www/prepend.php_:

{% highlight php %}
<?php
$_SERVER['DOCUMENT_ROOT'] = str_replace($_SERVER['SCRIPT_NAME'], '', $_SERVER['SCRIPT_FILENAME']);
{% endhighlight %}

Great, we've sorted our Document Root... we're good to go? Well, yes and no. Here's another problem - public folders.

I use a lot of frameworks. A custom framework for a client, Wordpress for simple sites, Jekyll for blogs and other frameworks like Laravel, FuelPHP and CodeIgniter. Projects that utilise these frameworks would all need a different document root - having the root as the main project folder just doesn't work for us.

How I handle this is really simple: symlinks. The contents of my _/var/www/projects_ only contains symlinks to the projects public folder.

Let's say I'm doing some work for a client - let's call him Barry. The project is built in Laravel so I need to point Apache to the /public folder of the project instead of the root. Simple, I store the project code at /var/www/clients/barry/project1/, then, I symlink the public folder:

{% highlight bash %}
$ cd /var/www/projects
$ ln -s /var/www/clients/barry/project1/public project1.dev
{% endhighlight %}

Excellent - now all we need to do when starting a new project is to create a hosts record and symlink the development folder!