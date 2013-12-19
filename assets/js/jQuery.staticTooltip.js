/**
 * Name:		Static Tooltip jQuery Plugin
 * Author:	Adrian Thomas-Prestemon
 * Website:	adriantp.com
 * Created:	2013-12-18
 * Updated:	2013-12-18
 * 
 * Description:
 *		This plugin was written for allegorypens.com
 *		It provides the means to display tooltips in a statically-defined container on the page.
 * Expectations:
 * +	Each item with a tooltip must have a populated "data-tooltip" attribute
 * Example Usage:
 *		$("a.tooltip").staticTooltip("#tooltipContainer");
 */
(function($) {
	"use strict";
	var settings = {};
	
	var handler = function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();
		settings.$container.html($(e.target).data("tooltip"));
	};
	
	$.fn.staticTooltip = function(containerSelector) {
		settings = $.extend(settings, {
			$container: $(containerSelector)
		});
		
		$(this).each(function() {
			$(this).on("click.tooltip", handler);
		});
	};
}(jQuery));