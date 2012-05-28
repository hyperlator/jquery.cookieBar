/*!
 * jQuery Cookiebar Plugin
 * link
 *
 * Copyright 2012, Carl Woodhouse
 *
 * ---------------------------------------------
 * Dependancy:
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function($) {
    $.cookie = function(key, value, options) {
		console.log("cook call");
        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };
})(jQuery);

/* cookiebar */
 
(function( $ ){
  $.fn.cookieBar = function( options ) {  
    var settings = $.extend( {
      'closeButton' : 'none'
    }, options);

    return this.each(function() {        
		var cookiebar = $(this);
		cookiebar.hide(); // just in case they didnt hide it by default.
		
		// if close button not defined. define it!
		if(settings.closeButton == 'none')
		{
			cookiebar.append('<a href class="ui-cookiebar-close">Close</a>');
			settings = $.extend( {
				'closeButtonClass' : '.ui-cookiebar-close'
			}, options);
		}
		
		if ($.cookie('cookiebar') != 'hide')
		{
		console.log("showing");
			cookiebar.show();
		}
	  
		cookiebar.find(settings.closeButtonClass).click(function() {
			cookiebar.hide();
			$.cookie('cookiebar', 'hide', { path: '/' });
			return false;
		});
    });

  };
})( jQuery );
 
 
