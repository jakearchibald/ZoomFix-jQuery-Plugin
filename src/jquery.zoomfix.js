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
		if ( !/^(?:top|left|width|height)$/.test(prop) || (!force && element.style[prop]) ) {
			return oldCurCssFn.apply(this, arguments);
		}
		
		var testValue = oldCurCssFn( $testElm.prependTo(document.body)[0], prop, true ),
			errorCoefficient = testSize / parseFloat(testValue),
			calculatedValue = oldCurCssFn.apply($, arguments),
			unit = /[a-zA-Z%]*$/.exec(calculatedValue),
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