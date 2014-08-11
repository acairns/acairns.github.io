---
title: Using Sergeant within a Controller
layout: post
date: 2014-08-12
---

Continuing from our introduction....


---




First, let's evaluate what a `Controller` is. It is a class to handle the fulfulling of a request and is typically
coupled with a framework. In most cases, you would extend a base controller which implements a contract allowing the
system complete routed requests. Because of this, adding our example code to a controller method couples our business
logic to complete the behavior with our framework. That's not great.

This is one of the problems Sergeant aims to solve - with a Domain-Driven Design.

Let's take a look at the above example translated into a `Command` and a `CommandHandler` class.

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

As you can see above, we have separated the request for a command and the handling of a command into two separate
classes. The language used when naming the command classes match closly what could be requested by the business when
discussing the feature request. You will notice that the command itself is extreamly simple and contains everything the
handler requires to complete the task.

These are best practices when designing commands, however Sergeant itself will not restrict you in your design. Lets
take a look at how the pieces above change our inital example:

```php
$email = Input::get('email');
$user = Auth::user();

$command = new UpdateUserAvatarUsingGravatarCommand($user, $email);

$sergeant = new Cairns\Sergeant;
$sergeant->execute($command);
```

We can see here that we have decoupled the logic for updating a users avatar away from our controller and how have a 1:1
