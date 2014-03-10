---
title: Truncating MySQL tables with foreign key restraints
author: Andrew
layout: post
permalink: /2014/01/truncating-mysql-tables-with-foreign-key-restraints/
---

When building software, it's best practice to write migrations so you can quickly update, set-up and tear-down your database. Sometimes though, you want to quickly clear down a single table without loosing the rest of your data without worrying about referential integrity.

This can be a pain in MySQL if you have foreign key restraints, and rightfully so. You'll get an error along the lines of: _"Integrity constraint violation: 1452 Cannot add or update a child row: a foreign key constraint fails"_.

In a production environment, enforcing foreign key checks are vital to ensure your data doesn't get in a bad state. When you are developing though, being able to ignore any referential integrity can speed things up. Here's how you can do it in MySQL:

{% highlight ruby %}
SET FOREIGN_KEY_CHECKS=0;
TRUNCATE users;
SET FOREIGN_KEY_CHECKS=1;
{% endhighlight %}

By disabling foreign key checks, you can quickly truncate your table. You can usually omit re-enabling the checks again as they  will only remain disabled for the current connection.

Oh, one more thing, please don't do this in a production environment!