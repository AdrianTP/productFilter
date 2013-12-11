/**
 * Name:	Product Filter jQuery Plugin
 * Author:	Adrian Thomas-Prestemon
 * Website:	adriantp.com
 * Created:	2013-12-09
 * Updated:	2013-12-10
 * 
 * Description:
 *		This plugin was written for allegorypens.com
 *		It takes a list of products and a list of tags and links them together as a filterable product list	
 * Expectations:
 * +	List of tags must be a collection of elements, each containing one <input type="checkbox" /> and one appropriately-targeted <label></label> tag
 * +	Each tag checkbox must have a data-tag="" attribute containing its tag value
 * +	List of products must be a collection of elements
 * +	Each product list item must have a data-tags="" attribute containing a list of tags applicable to the product; the list may be space-separated or comma-separated
 * Example Usage:
 *		$(".product").productFilter(".tag", { operator: "OR" })
 * Explanation:
 * 1.	Apply the plugin to the list of products
 * 2.	Tell the plugin where to look for the filter tags
 * 3.	Provide the plugin with an settings object
 * 4.	There are three possible settings to supply:
 *		a.	operator {string, options: ["AND", "OR"], default: "AND"} - the boolean operator to use when matching products to selected tags
 *		b.	products {jQuery Collection} - you may override the product list you specified when you called the plugin
 *		c.	filters {jQuery Collection} - you may override the filter list you specified when you called the plugin
 */
(function($) {
	var settings = {};
	
	function getActiveFilters() {
		var active = [];
		settings.filters.each(function() {
			var filter = $(this).children('input[type="checkbox"]');

			if (filter.is(":checked")) {
				active.push(filter.data("tag"));
			}
		});
		return active;
	}
	
	function updateVisibleProducts(active) {
		if (active.length > 0) {
			settings.products.each(function() {
				var $prod = $(this),
					tags = $prod.data("tags"),
					matches = 0,
					operator = settings.operator.toLowerCase();
				$prod.hide();
				for (var i = 0; i < active.length; i ++) {
					if (tags.indexOf(active[i]) > -1) {
						matches ++;
					}
				}
				if ((operator === "and" && matches === active.length) || (operator === "or" && matches > 0)) {
					$prod.show();
				}
			});
		} else {
			settings.products.each(function() {
				$(this).show();
			});
		}
	}
	
	function change(e) {
		var $input = $(e.target),
			$label = $input.siblings("label"),
			checked = ($input.is(":checked"));
		
		updateVisibleProducts(getActiveFilters());
	}
	
	$.fn.productFilter = function(filterSelector, opts) {
		settings = $.extend(settings, {
			operator: "AND",
			products: $(this),
			filters: $(filterSelector)
		}, opts);
		
		settings.filters.each(function() {
			$(this).on("change.tag", change);
		});
	};
}(jQuery));