(function($) {
	var oldCssFn = $.css,
		$testElm = $('<div style="position:absolute;top:1000px;left:1000px;margin:0;padding:0;overflow:hidden;zoom:1"></div>');
	
	// Some browsers mis-report computedStyle when the browser is zoomed
	$.css = function(element, prop, force) {
		if ( !/^(?:top|left)$/.test(prop) || (!force && element.style[prop]) ) {
			return oldCssFn.apply(this, arguments);
		}

		var testValue = oldCssFn( $testElm.prependTo(document.body)[0], prop, force ),
			errorCoefficient = 1000 / parseFloat(testValue),
			calculatedValue = oldCssFn.apply($, arguments),
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