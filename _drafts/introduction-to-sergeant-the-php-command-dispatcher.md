---
title: Introduction to Sergeant - The PHP Command Dispatcher
layout: post
date: 2014-08-11
categories:
  - Development
tags:
  - sergeant
---

[Sergeant](https://github.com/acairns/sergeant) provides a way to extract business logic into commands which can be run
using language spoken by the business. Similar to [`CQRS`](http://martinfowler.com/bliki/CQRS.html), instructions to run
a command are separated from the logic required to achieve the behavior.

This can sound confusing at first, but I will demonstrate how simple and powerful this pattern can be along with some
detail on how it can benefit your codebase.

Lets take a look at some example code we may wish to refactor into a command:

```php
$email = Input::get('email');
$gravatar = Gravatar::create($email);

$user = Auth::user();
$user->avatar = $gravatar;
$user->save();
```

This is a simple example of how an application may support updating a user's avatar using a service such as
[Gravatar](https://en.gravatar.com/). Perhaps this code lives as part of a controller method, possibly an endpoint to
satisfy an `AJAX` request. Lets take a look at how we could achieve this behavior using Sergeant to separate our command
from how it is handled.

First, our `Command` and our `CommandHandler` classes:

```php
class UpdateUserAvatarUsingGravatarCommand
{
    public $user;
    public $email;

    public function __construct($user, $email)
    {
        $this->user = $user;
        $this->email = $email;
    }
}
```

```php
class UpdateUserAvatarUsingGravatarCommandHandler
{
    public function execute($command)
    {
        $user = $command->user;
        $user->avatar = Gravatar::create($command->email);
        $user->save();
    }
}
```

As you can see above, we have separated the request for a command and the handling of that command into two separate
classes. The language used to name the classes closly match instructions what could have been requested by the business
when discussing the feature request. You will notice that the command itself is extreamly simple and contains nothing
more than what the handler requires to complete the task.

If this code was part of a `Controller`, we have also decouple the behavior from our framework. So, assuming Sergeant is
[mixed in using a Trait](https://github.com/acairns/sergeant#traits) providing `execute(...)`, our example code could
be refactored to look something like:

```php
class ExampleController extends BaseController
{
    use SergeantTrait;

    public function updateAvatar()
    {
        $user = Auth::user();
        $email = Input::get('email');

        $this->execute(
            new UpdateUserAvatarUsingGravatarCommand($user, $email)
        );
    }
}
```

We are now successfully executing our command, using business language to describe behavior and decoupling our logic
away from our framework and controllers.

This is a really simple introduction to Sergeant. I will be posting more detailed examples soon discussing other topics
such as "Beating Controller Fat with Sergeant" and "Advanced Configuration for Sergeant".
