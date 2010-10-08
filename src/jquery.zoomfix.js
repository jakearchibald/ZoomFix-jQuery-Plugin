(function($) {
	var oldCurCssFn = $.curCSS,
		testSize = 1000,
		cache = {},
		$testElm = $('<div/>').css({
			position: 'absolute',
			top: testSize,
			left: testSize,
			width: testSize,
			height: testSize,
			border: testSize + 'px solid #000',
			padding: testSize,
			margin: testSize,
			overflow: 'hidden'
		});
	
	// when zoom values changes a resize event is fired, invalidate the cache
	$(window).resize(function() {
		cache = {};
	});
	
	// Some browsers mis-report computedStyle when the browser is zoomed
	$.curCSS = function(element, prop, force) {
		// only supports certain properties at the moment
		// If force isn't true, the value may come straight from the style object which doesn't have zoom bugs
		if ( !/^(?:(?:top|left|width|height)$)|(?:margin|border|padding)/.test(prop) || (!force && element.style[prop]) ) {
			return oldCurCssFn.apply(this, arguments);
		}
		
		// try and get the value from the cache
		var errorCoefficient = cache[prop],
			// get value from jquery
			calculatedValue = oldCurCssFn.apply($, arguments),
			// get unit
			unit = /[a-zA-Z%]*$/.exec(calculatedValue),
			// get number value
			parsedValue = parseFloat(calculatedValue),
			testValue;
		
		if ( !errorCoefficient ) {
			// get value from test element
			testValue = oldCurCssFn( $testElm.prependTo(document.body)[0], prop, true );
			// how far is it off what we expect?
			errorCoefficient = cache[prop] = testSize / parseFloat(testValue);
		}
		
		$testElm.detach();

		if ( !isNaN(parsedValue) ) {
			return parsedValue * errorCoefficient + unit[0];
		}
		else {
			return calculatedValue;
		}
	};
})(jQuery);