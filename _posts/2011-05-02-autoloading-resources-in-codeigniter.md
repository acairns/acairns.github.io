---
title: Autoloading Resources in Codeigniter
author: Andrew
layout: post
permalink: /2011/05/autoloading-resources-in-codeigniter/
categories:
  - Development
tags:
  - codeigniter
---
I have personal *&#8216;beef&#8217;* with the CodeIgniter loader &#8211; I just dont like it. Personally, I may not want every class I load to be instantiated, nor may I want every loaded class to be added as a member.

The CI Loader also maintains an array of singleton classes, but this logic shouldn&#8217;t be determined by a loader.

This is where <a title="PHP spl_autoload_register" href="http://php.net/manual/en/function.spl-autoload-register.php" target="_blank">spl_autoload_register</a> comes in handly. With very little effort, we can remove most of the dependency on CI&#8217;s loader and create new instances of

There are several ways to add an autoloader to CodeIgniter. Typically, a library item would be created and added to the *autoload.php* configuration.  
Alternatively, a hook can be created to add support at an earlier stage of execution.

In this example, I&#8217;ll walk through the steps required to create the library-based autoloader. First, lets create a new file in the libraries folder called *autoload_register.php*

{% highlight php %}
spl_autoload_register( 'Autoload_Register::register' );

class Autoload_Register {

	public static function register( $insClass ) {
		var_dump( $insClass );
	}

}
{% endhighlight %}

Next, add &#8216;autoload_register&#8217; to the libraries array within the autoload.php config file.

{% highlight php %}
$autoload['libraries'] = array( 'autoload_register' );
{% endhighlight %}

Once this has been added, refresh your browser. You should see something like:

<small>string</small> <span style="color: #cc0000;">&#8216;CI_Autoload_register&#8217;</span> *(length=20)*  
<small>string</small> <span style="color: #cc0000;">&#8216;MY_Autoload_register&#8217;</span> *(length=20)*

Checking for these classes is part of CodeIgniter checking if the requested class is an extension of the CI Core.

Before we move on, create a *tester.php* library item you wish to automatically load. Once this has been created, open up the welcome controller and just before the view is loaded add:

{% highlight php %}
$oTester = new Tester();
{% endhighlight %}

When you refresh your browser, you should be presented with a nice *Fatal Error* saying the class *Tester* could not be found.

Now, lets update our autoloader to do a little more than output some information.

{% highlight php %}
spl_autoload_register( 'Autoload_Register::register' );

class Autoload_Register {

	const CI_PREFIX		= "CI_";

    public static function register( $insClass ) {
		$sPrefix = substr( $insClass, 0, 3 );

		if ( $sPrefix == self::CI_PREFIX ) {
			return;
		}

		$sFile = APPPATH . 'libraries' . DIRECTORY_SEPARATOR . strtolower( $insClass ) . EXT;

		if ( file_exists( $sFile ) ) {
			require_once $sFile;
		}
    }

}
{% endhighlight %}

Creat, now we can directly instantiate any item within the libraries folder. Lets extend this a little to include our models.

{% highlight php %}
spl_autoload_register( 'Autoload_Register::register' );

class Autoload_Register {

    const CI_PREFIX     = "CI_";

    public static function register( $insClass ) {
        $sPrefix = substr( $insClass, 0, 3 );

		$sSuffix = strrchr( strtolower( $insClass ), '_' );

		switch( $sSuffix ) {
			case '_model':
				$sDir = 'models';
				break;
			default:
				$sDir = 'libraries';
				break;
		}

        $sFile = APPPATH . $sDir . DIRECTORY_SEPARATOR . strtolower( $insClass ) . EXT;

        if ( file_exists( $sFile ) ) {
            require_once $sFile;
        }
    }

}
{% endhighlight %}

Excellent, now we are checking if the class ends with *&#8216;_Model&#8217;* and changing the path. So can we directly load our models now without using CodeIgniter&#8217;s loader? &#8211; Well, not yet. If your model extends CodeIgniter&#8217;s *CI_Model* class, you will get an error saying the class *CI_Model* can&#8217;t be found.

The simplest way to solve this issue is to use *require_once* when the suffix &#8216;_model&#8217; is detected.

{% highlight php %}
spl_autoload_register( 'Autoload_Register::register' );

class Autoload_Register {

    const CI_PREFIX     = "CI_";

    public static function register( $insClass ) {
        $sPrefix = substr( $insClass, 0, 3 );

		$sSuffix = strrchr( strtolower( $insClass ), '_' );

		switch( $sSuffix ) {
			case '_model':
				require_once BASEPATH . 'core/Model' . EXT;
				$sDir = 'models';
				break;
			default:
				$sDir = 'libraries';
				break;
		}

        $sFile = APPPATH . $sDir . DIRECTORY_SEPARATOR . strtolower( $insClass ) . EXT;

        if ( file_exists( $sFile ) ) {
            require_once $sFile;
        }
    }

}
{% endhighlight %}

And there we go!

Granted, this is a simple implementation of an autoloader however it will serve as a good starting point for anyone that also feels the constraints of CodeIgniter&#8217;s loader.
