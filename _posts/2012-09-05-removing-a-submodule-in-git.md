---
title: Removing a Submodule in Git
author: Andrew
layout: post
permalink: /2012/09/removing-a-submodule-in-git/
categories:
  - Tips
---
One of the main things that confuses me with Git is Submodules! Coming from an SVN background, it took me a while to get my head around what was going on. In particular, I can&#8217;t understand why there isn&#8217;t a command to remove a Submodule.

<!--more-->

Having looked up how to do this many times, I thought I would post the steps incase anyone was having the same problems:

> <li style="margin-bottom: 0.1em;">
>   Delete the relevant line from the <em>.gitmodules</em> file.
> </li>
> <li style="margin-bottom: 0.1em;">
>   Delete the relevant section from <em>.git/config</em>.
> </li>
> <li style="margin-bottom: 0.1em;">
>   Run <em>git rm &#8211;cached path_to_submodule</em> (no trailing slash).
> </li>
> <li style="margin-bottom: 0.1em;">
>   Commit the superproject.
> </li>
> <li style="margin-bottom: 0.1em;">
>   Delete the now untracked submodule files.
> </li>

Source: <a title="Git Submodule Tutorial" href="https://git.wiki.kernel.org/index.php/GitSubmoduleTutorial" target="_blank">https://git.wiki.kernel.org/index.php/GitSubmoduleTutorial</a>