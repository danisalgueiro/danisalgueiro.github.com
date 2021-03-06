// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());


// place any jQuery/helper plugins in here, instead of separate, slower script files.

/**
 * Load disqus comments when visitor scroll down page to comments
 *
 * Usage:
 * Add a div with id "disqus_thread" and data attributes for every disqus parameter:
 *
 * <div id="disqus_thread" data-disqus-shortname="username" data-disqus-url="http://example.com/post/post-name/"></div>
 *
 * @author: Murat Corlu
 * @link: https://gist.github.com/gists/2290198
 */
$(function() {
    var disqus_div = $("#disqus_thread");
    if (disqus_div.size() > 0 ) {
        var ds_loaded = false,
            top = disqus_div.offset().top, // WHERE TO START LOADING
            disqus_data = disqus_div.data(),
            check = function(){
                if ( !ds_loaded && $(window).scrollTop() + $(window).height() > top ) {
                    ds_loaded = true;
                    for (var key in disqus_data) {
                        if (key.substr(0,6) == 'disqus') {
                            window['disqus_' + key.replace('disqus','').toLowerCase()] = disqus_data[key];
                        }
                    }

                    var dsq = document.createElement('script');
                    dsq.type = 'text/javascript';
                    dsq.async = true;
                    dsq.src = 'http://' + window.disqus_shortname + '.disqus.com/embed.js';
                    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                }
            };

        $(window).scroll(check);
        check();
    }
});