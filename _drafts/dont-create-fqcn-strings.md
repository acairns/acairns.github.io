---
title: Don't create FQCN Strings
layout: post
date: 2015-02-21
---

Sometimes your code needs to reference a class by it's name as a string. You may be asking a Factory to create an instance of the class, or perhaps you are configuring an IoC container.

A perfect example of this is how [Laravel](http://laravel.com) loads Service Providers:

```php
'providers' => array(

    'Illuminate\Foundation\Providers\ArtisanServiceProvider',
    'Illuminate\Auth\AuthServiceProvider',
    'Illuminate\Cache\CacheServiceProvider',
    'Illuminate\Session\CommandsServiceProvider',
```

Now imagine we wish to rename the class to better reflect it's responsibilities - how would you ensure you refactor every instance of this string within your codebase - incluing production code, and tests?

The reality is: mistakes happen. That's why, as developers, we use tooling to make the task of these types of changes easier. When doing a 'rename refactor', it is easy to miss an instance of a Fully Qualified Class Name string or to forget the need to rename the file so our autoloader can find the class.

This is where an IDE can really help out. Many IDE's provide a simple way to change the name of a class along with all references to it - but they need your help! An IDE will not manipulate strings when refactoring the name of a class. Why should it? It's just a string.

Since PHP 5.5, a FQCN can be generated using the ::class keyword:

```php
$fqcn = Illuminate\Auth\AuthServiceProvider::class;
```

Why does this matter?

Because we are not creating the string and instead directly referencing the class, our IDE now knows that during a refactor the reference needs to be updated.

The next time you find yourself doing this:

```php
$fqcn = 'Acme\Some\Thing';
```

Stop.

Do this instead:

```php
$fqcn = Acme\Some\Thing::class;
```
