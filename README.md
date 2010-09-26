jQuery ZoomFix
==============

Some browsers give incorrect values for CSS and offset properties when the
browser size is zoomed. As a result, jQuery apperance methods can give incorrect
values.

This plugin aims to address that at the expense of performance.

This is very much a work-in-progress and currently only fixes:

* .css('top')
* .css('left')
* .css('width')
* .css('height')
* .css('padding-*')
* .css('margin-*')
* .css('border-*-width')
* .width()
* .height()

To Use
------

Simply include jquery.zoomfix.js after jQuery. It patches the normal jQuery
apperance methods.