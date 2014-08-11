---
title: Accessing CodeIgniter Resources from Library Items
author: Andrew
layout: post
permalink: /2011/08/accessing-codeigniter-resources/
date: 2011-08-11
categories:
  - Development
tags:
  - codeigniter
---
Everything loaded in CodeIgniter is accessable from the CI super object. This is great to keep syntax consistent between Models and Controllers. From within these classes, you can use *$this* to access loaded resources.

CodeIgniter's [userguide][1] states:

> <kbd>$this</kbd>, however, only works directly within your controllers, your models, or your views.

Have a look at the code within CI\_Model though - or the lack of code! CI\_Model only contains one although very *magic*, method:

{% highlight php %}
function __get($key)
{
	$CI =& get_instance();
	return $CI->$key;
}
{% endhighlight %}

PHP's [__get() magic method][2] is called whenever a property is accessed which does not exist. CI_Model directs this request to the CI super object and returns the response.

To allow this behaviour within your custom libraries, create the file *CI_Library.php* within your application's */libraries/* folder. Once created, add the following code:

{% highlight php %}
class CI_Library {
	public function __get( $insKey ) {
		return get_instance()->$insKey;
	}
}
{% endhighlight %}

The above class is exactly the same as CI_Model (with a few personal preferences) and can be extended in the same way by adding *&#8216;ci_library'* to the *libraries* config array in *autoload.php*.

Example:

{% highlight php %}
class Sheep extends CI_Library {
	public function baa() {
		$this->load->model( 'animal_model' );
	}
}
{% endhighlight %}

Note: You can move CI_Library into your application's */core/* folder and remove it from autoload.php by autoloading the class when requested using [resource autoloading][3].

 [1]: http://codeigniter.com/user_guide/general/creating_libraries.html
 [2]: http://www.php.net/manual/en/language.oop5.overloading.php#language.oop5.overloading.members
 [3]: http://www.acairns.co.uk/articles/codeigniter/autoloading-resources/
