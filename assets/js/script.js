var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-26616650-1']);
_gaq.push(['_trackPageview']);

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

jQuery(document).ready(function(){
    jQuery("body > header > .scroll > span").click(function() {
        jQuery('html, body').animate({
            scrollTop: jQuery("body > section:first").offset().top
        }, 1000);
    });
});
