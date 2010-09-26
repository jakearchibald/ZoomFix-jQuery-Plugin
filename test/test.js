module("zoomfix");

test('css', 7, function() {
	var $test = $('#positionSizeTest');
	strictEqual( $test.css('left'), '100px', 'left' );
	strictEqual( $test.css('top'), '100px', 'top' );
	strictEqual( $test.css('width'), '100px', 'width' );
	strictEqual( $test.css('height'), '100px', 'height' );
	strictEqual( $test.css('margin-top'), '100px', 'margin' );
	strictEqual( $test.css('padding-top'), '100px', 'padding' );
	strictEqual( $test.css('border-top-width'), '100px', 'border' );
});

test('dimension', 2, function() {
	var $test = $('#positionSizeTest');
	strictEqual( $test.width(), 100, 'width' );
	strictEqual( $test.height(), 100, 'height' );
	
});