---
title: REST without PUT
layout: post
date: 2015-03-28
---

Recently I proposed that support for `PUT`, the verb used to indecate a request should update (and sometimes create) a resource, be removed from an API. Needless to say, this suggesting was met with a great deal of uncertainty and was followed by lengthy discussions on the definition of REST.

Recommending an alternative way to update resources was not because I feel `PUT` is flawed, nor do I feel there is a problem with _REST_.
In fact, I feel the opposite - avoiding `PUT` can be more restful in some contexts.

Let's take a look at a simple example where `PUT` can be used to update a persons name.

## Simple Example of PUT

First, we'll need to have a look at what we'll be updating - let's make a `GET` for our resource:

``` bash
GET /footballers/1337
```

Response:

``` bash
{
    name: "Frank de Boer"
}
```

Awesome, but Frank isn't his real first name, it's Franciscus... let's use `PUT` to fix that:


``` bash
PUT: /footballers/1337
{
    name: "Franciscus de Boer"
}
```

Is it obvious what this request is asking?

Well, a `PUT` request is being made to the `/footballers/1337` resource with a value for the _name_ property.

I'm pretty sure we can assume we need to rename the player. Let's store the new name and go home?


## The Problem

An _API_ is more than a low-level abstraction of your database.
Resources are not a collection of proprties and values that expose a database structure.

What if we stored _footballers_ like this?

``` js
{
    id: 1337,
    first_name: "Frank",
    middle_name: "",
    last_name: "de Boer"
}
```

How would we satisfy a `PUT` request with a _name_ field in this scenario?
Maybe we need to make a different request with more specific information?

And what if updating a footballer's name was also an intensive operation?
Perhaps it involved communicating with other APIs and was queued to be completed by worker servers?
Is using `PUT` still an appropriate method to update the name?

An _API_ is also more than a collection of resources - it's an interface to your application.
Simple CRUD applications don't need to about complex behaviour spanning multiple resources.
However for more complex applications, this is a very real concern and a method is required to apply these business rules ubiquitously across all accessable ports.


## POST Intention

Using `PUT` implies an atomic operation is being requested by the API consumer.
It is not clear if the request was queued and if the state of the resource has been updated.

Complex applications involving more than just CRUD operations may employ techniques requiring them to embrace _Eventual Consistency_.
This is often the case with systems that are _Event Sourced_, using _CQRS_ with _Read Projections_ or just some basic queueing system.

Instead of direct mutation of a resource, we can `POST` commands which describe the required behaviour:

``` bash
POST: /footballers/1337/rename
{
    first_name: "Franciscus"
}
```

Is it obvious what this request is asking?

Well, a `POST` request is being made to the `/footballers/1337/rename`, so it's clear we are renaming the player.
Our job allows us to post up individual fields, so we're able to only change the first name of the player.

Depending upon the response code, we will be able to tell if this request was atomic, or was queued.


## Todo...

Decent start so far - wording needs tweaked.

I'm also not crazy about the example.
I don't want to convey this is over-engineering because the resource doesn't match the database schema.




















