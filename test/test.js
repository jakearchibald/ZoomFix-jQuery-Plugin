module("zoomfix");

test('css', 4, function() {
	$test = $('#positionSizeTest');
	
	strictEqual( $test.css('left'), '100px', 'left' );
	strictEqual( $test.css('top'), '100px', 'top' );
	strictEqual( $test.css('width'), '100px', 'css width' );
	strictEqual( $test.css('height'), '100px', 'css height' );
});