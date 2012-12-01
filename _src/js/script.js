(function($) {

    $(function() {
        $('[rel=tooltip]').tooltip();
    });

})(jQuery);

function trackOutboundLink(link, category, action, label, value)
{
    try {
        var myTracker = _gat._getTrackerByName();
        _gaq.push(['myTracker._trackEvent', category, action, label, value]);
        setTimeout('document.location = "' + link.href + '"', 100);
    } catch(err) {}
}