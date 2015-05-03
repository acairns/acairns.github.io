---
title: Creating Final Abstract classes in PHP
layout: post
date: 2015-05-03 21:32

---

An _abstract_ class which is also _final_ can be extreamly useful in Object Orientated Programming.
It allows us to define a class which cannot be extended, nor can it be instantiated.

This can be useful for many reasons, such as defining a collection of properties:

``` php
<?php
namespace Acme\Settings;

final abstract class Defaults
{
    const PROJECT_NAME = 'Acme';

    const PAGE_COUNT = 3;
}
```

Unfortunatly, this is not possible in PHP:

> Parse error: syntax error, unexpected 'abstract' (T\_ABSTRACT), expecting class (T\_CLASS)

So how can we define a class and ensure it cant be extended or instantiated?

Well, there is a way:

``` php
<?php
namespace Acme\Settings;

final class Defaults
{
    private function __construct()
    {

    }
    
    const PROJECT_NAME = 'Acme';

    const PAGE_COUNT = 3;
}
```

By adding a private constructor, we prevent object creation and retain the ability to set the class as final.
While this is a little more verbose - it does get the job done.
