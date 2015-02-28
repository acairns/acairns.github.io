---
title: Don't publish auto-incrementing IDs
layout: post
date: 2015-02-28
---

... talk about all the bad things, but don't go as far as talking about id-generation up-front.
Just talk about competitors knowing how many resources you have, or ass hats +1'ing endpoints to try and hack your data.

Then talk about something like this: https://github.com/zackkitzmiller/tiny-php

Easily reversable hash and things.

Can even talk about something like Fractal - where you can format your ID's on that layer when the data is on it's way out.
... but then talk about the other end too, where you get your hashed ID back and you need to decode it.
