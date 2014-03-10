---
title: Creating temporary data with Faker
author: Andrew
layout: post
permalink: /2014/01/creating-temporary-data-with-faker/
---


Basics:
$faker = Faker\Factory::create();
echo $faker->name;
echo $faker->address;
echo $faker->text;


Can be used in database seeders - like Laravel's.


More:
- https://github.com/fzaninotto/Faker
- http://philsturgeon.co.uk/blog/2013/11/build-apis-part-1-useful-database-seeding