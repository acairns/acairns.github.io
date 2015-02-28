---
title: Simple Example of Feature Envy
author: Andrew
layout: post
permalink: /2015/01/feature-envy/
date: 2015-01-22
---

Martin Fowler describes Feature Envy as:
> “a method that seems more interested in a class other than the one it is in. The most common focus of the envy is the data.”

Object Orientated Programming is all about grouping data and behaviour together.

When a method within a class is more interested in another class, then it is a safe bet the method belongs there.

Lets look at a simple example:

```php

class User extends ActiveRecord {}

class UpdateEmailAddress
{
    public $userId;

    public $updatedEmailAddress;
}

class UpdateEmailAddressHandler
{
    public function handle(UpdateEmailAddress $command)
    {
        if (! filter_var($command->updatedEmailAddress, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException('Invalid Email Address');
        }

        $user = User::find($command->userId);
        $user->email = $command->updatedEmailAddress;
        $user->save();
    }
}

```

Here we see a simple scenario where a `User` updates their email address updated.

If we ask ourselves the question _"which object knows how to update the email address?"_, the answer is definitly `UpdateEmailAddressHandler`. The handler clearly knows too much (actually, in this example it knows everything) about how the `User` updates and validates it's email address.

Imagine this problem is replicated multiple times throughout a large codebase. Now, we are tasked with building a `Profile` for users which will now contain their email address. As a developer, we will need to make sure we find all those places to make the change.

Imagine our software was part of an educational platform which only allowed students within their university to register and participate. Say, a new developer joins the team and is working on new functionalty - they forget about this business rule and allows an email address to be updated without ensuring it is valid.

Before things get out of control, lets refactor our code:

```php

class User extends ActiveRecord
{
    public function updateEmailAddress($email)
    {
        if (! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException('Invalid Email Address');
        }

        $this->email = $email
    }
}

class UpdateEmailAddress
{
    public $userId;

    public $updatedEmailAddress;
}

class UpdateEmailAddressHandler
{
    public function handle(UpdateEmailAddress $command)
    {
        $user = User::find($command->userId);
        $user->updateEmailAddress($command->updatedEmailAddress);
        $user->save();
    }
}

```

Wasn't that easy?

All we have done here is move the logic about updating an email address closer to the data it is manipulating. Now any time a user updates their email address the `updateEmailAddress` method can be called which encapsulates business rules along with the knowledge on how to perform the task.

If we ask ourselves the question again: _"which object knows how to update the email address?"_. The answer is now the `User` object!

Imagine now that we extract a `Profile` object, or our new developer on the scene starts hacking away at our codebase - we have much less code to worry about and our developer can't forget to validate those email addresses!

