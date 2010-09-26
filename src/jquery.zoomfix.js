(function($) {
	var oldCurCssFn = $.curCSS,
		testSize = 1000,
		$testElm = $('<div/>').css({
			position: 'absolute',
			top: testSize,
			left: testSize,
			width: testSize,
			height: testSize,
			overflow: 'hidden',
			margin: 0,
			padding: 0
		});
	
	// Some browsers mis-report computedStyle when the browser is zoomed
	$.curCSS = function(element, prop, force) {
		// only supports certain properties at the moment
		// If force isn't true, the value may come straight from the style object which doesn't have zoom bugs
		if ( !/^(?:top|left|width|height)$/.test(prop) || (!force && element.style[prop]) ) {
			return oldCurCssFn.apply(this, arguments);
		}
		
		// get value from test element
		var testValue = oldCurCssFn( $testElm.prependTo(document.body)[0], prop, true ),
			// how far is it off what we expect?
			errorCoefficient = testSize / parseFloat(testValue),
			// get value from jquery
			calculatedValue = oldCurCssFn.apply($, arguments),
			// get unit
			unit = /[a-zA-Z%]*$/.exec(calculatedValue),
			// get number value
			parsedValue = parseFloat(calculatedValue);
		
		$testElm.detach();

		if ( !isNaN(parsedValue) ) {
			return parsedValue * errorCoefficient + unit[0];
		}
		else {
			return calculatedValue;
		}
	};
})(jQuery);