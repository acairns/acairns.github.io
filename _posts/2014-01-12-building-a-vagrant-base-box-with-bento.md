---
title: Building a Vagrant base box with Bento
author: Andrew
layout: post
permalink: /2014/01/building-a-vagrant-base-box-with-bento/
---

Vagrant is a tool which allows you to create a lightweight and portable development environment. Using virtual machines, a development team can build software using a consistent environment independent of their OS of choice. What's great about running a virtual machine locally is that you can match your production environment to prevent any "it works locally" issues.

When you run through the Vagrant [getting started guide](http://docs.vagrantup.com/v2/getting-started/index.html), you are guided through setting up using an Ubuntu box. Unfortunately, this is the only box provided by Vagrant. In order to get a local development environment which was closer to a production RHEL environment, I needed a CentOS box. You can use third-party boxes, and there is a nice list of boxes available at [vagrantbox.es](http://vagrantbox.es) however in this guide, I'll walk you though creating your own box using [Bento](https://github.com/opscode/bento).

Creating your own Vagrant box from scratch can be quite a lengthy process. There are [a lot of steps](http://www.skoblenick.com/vagrant/creating-a-custom-box-from-scratch/) and you would be forgiven for missing one out. By using templates from Bento, we can use [Packer](http://packer.io/) to automate the build process for a customised Vagrant box.

To get started, first you need to install Packer. I'm using Homebrew on OS X so installation of the binaries was quite straight forward:

{% highlight bash %}
$ brew tap homebrew/binary
$ brew install packer
{% endhighlight %}

You can find alternative installation instructions in the [Packer Documentation](http://www.packer.io/docs/installation.html).

The next step is to clone the Bento project:

{% highlight bash %}
$ git clone https://github.com/opscode/bento.git .
{% endhighlight %}

Within the packer directory of the project, you will find json files which can be used by packer to build a vagrant box of your choice.

Let's build our CentOS 6.5 64bit box:

{% highlight bash %}
$ cd packer
$ packer build -only=virtualbox-iso centos-6.5-x86_64.json
{% endhighlight %}

Note: It's important to change to the packer directory before building the box - otherwise common scripts used by Bento won't be found.  Also, while Vagrant ships with only VirtualBox support, however other providers can be used - such as VMWare. I'm only using VirtualBox at the moment, so I've supplied the _-only=virtualbox-iso_ param to tell Packer I only want that box.

It may be a good idea to grab a coffee at this point - it will likely take some time to download the ISO for your new VM. After the download is complete, Packer will launch the machine and the setup will be initiated. Just let it do it's thing, Bento will tear down the VM once it is complete.

If everything goes smoothly, you'll now have a brand new VirtualBox within the _/builds_ directory. To add this box to Vagrant:

{% highlight bash %}
$ vagrant box add <name> /path/to/bento/_builds/new.box
{% endhighlight %}

To use your new box in your project, update your _Vagrantfile_ with the name of your new box.
