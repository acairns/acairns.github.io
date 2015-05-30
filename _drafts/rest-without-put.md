---
title: REST without PUT
layout: post
date: 2015-03-28
---

During a recent API design discussion, I proposed that `PUT` support be dropped in favour of `POST`. Needless to say, suggesting the team retire the verb responsible for updating (and sometimes creating) a resource from their public interface was met with a great deal of uncertainty and lengthy discussions on the definition and intentions of _HTTP_ and _REST_ followed.

To explain the recommendation, some context is required. I am not advocating that `PUT` be abandoned from all API's - nor do I feel there is a findamental flaw with _REST_. However, I do believe that manipulating state with `POST` over `PUT` is more _RESTful_ in some situations.

Let's take a look at a simple example where `PUT` is used to update the name of a player.

## Simple PUT example

First, we'll need to take a look at the resource we want to update - let's `GET` our resource:

``` bash
GET /players/1337
```

Response:

``` bash
{
    name: "Frank de Boer"
}
```

Awesome, but Frank isn't his real first name, it's Franciscus... let's use `PUT` to fix that:


``` bash
PUT: /players/1337
{
    name: "Franciscus de Boer"
}
```

It's quite obvious what this request is doing. The `PUT` request being made to the `/players/1337` resource has an updated version of the player - containing the new _name_ property.


## Problems

Simple applications may require nothing more than CRUD operations. In our example, we are issuing a basic _update_ request using the `PUT` verb. Using `PUT` implies atomic consistency. After our `PUT` request is completed, the resource state is expected to have been updated and subsequent `GET` requests should contain the changes.

But what if our application was more than CRUD? Perhaps renaming a player has a complicated workflow and changes must be manually checked by a moderator.

What if the _name_ field was created for convienence from a read projection? Perhaps the schema for a player actually stores the name as a series of fields such as: `firstname`, `middlename` and `lastname`. Afterall, an API is more than a low-level database abstraction.

And what if renaming a player was an intensive operation? It's also possible that updating the name of a player could require communication with other APIs. The operation could get queued to be completed later by a dedicated worker.

Is `PUT` still an appropriate method for changing state in these scenarios?


## POST Intention

If an app has scaled and embraced _Eventual Consistency_, uses a _CQRS_ architecture with multiple read projections - and possibly event sourced, an alternative to `PUT` is needed to allow manipulating state.

To reduce the expectency of atomic consistency, we can design our API interface to accept `POST`ing of intention - instead of direct mutation of a resource:

``` bash
POST: /players/1337/rename
{
    first_name: "Franciscus",
    last_name: "de Boer"
}
```

By dropping `PUT` in favour of `POST`, we can finally break free from the confines of CRUD. Clients integrating with our system now need to know less about the sequence of events which make up a particular behavior. We are now free to change a particular feature entirely - as long as we maintain a consistent interface.

Our interface now has separate endpoints for Commands and Queries allowing us to better support a CQRS architecture. If we wish to _Query_ the current state of a resource, we can make a `GET` request. If we wish to issue a _Command_, we can `POST` to a different endpoint. Our Commands and Queries are separate.

It is also clearer the operation may not be atomic. Clients of the API know they may need to wait for changes to propogate throughout the system.


## The mother of invention

Designing state change using `POST` will not work for every API. If this sounds like a bad idea for your app, then you probably don't need it.

Exposing nouns as endpoints encapsulate behavior with

commands only become beneficial if your system has the need. As stated before, a CQRS architecture is probably the most likely beneficiary of this interface - however any API that needs to design an endpoint with _eventual consistency_ could consider this appraoch.



