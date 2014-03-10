---
title: CodeIgniter Logging-Overload
author: Andrew
layout: post
permalink: /2011/09/codeigniter-logging-overload/
categories:
  - Development
---
I&#8217;m a firm believer that comments and &#8216;permanent debug&#8217; ruins code readability. Code should be clean, simple and contain descriptive variables and methods to help developers understand whats going on. With the use of design patterns, it is easy to establish a vocabulary between the development team without the need for lengthy comments.

I have recently worked with a codebase which also takes logging too far. With frameworks such as CodeIgniter, ensure your production environment has the correct log threshold configured. In this particular project &#8211; it was not.

This was leading to a lot of writes to the disk and generating huge files &#8211; which were taking longer and longer to write. Combined with the aforementioned over-use of logging, the API started grinding to a halt in a matter of moments.

Always ensure any point you write to the disc is checked for issues such as these. It is easy for an API to start lagging due to IO and disc performance. In my case, our app tended to respond a lot slower towards the end of the day. If this is the case for you &#8211; check your log files!

I am by no means saying that an API or an app of any kind shouldn&#8217;t have a level of logging. However, logging things like a variable is being set or that a method was entered should never make it into your version control system!