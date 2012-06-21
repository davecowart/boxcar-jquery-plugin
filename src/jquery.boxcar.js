/*
	Copyright (c) 2012 Dave Cowart, davecowart.wordpress.com
	
	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:
	
	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function($) {
	var box = $('<div class="highlightbox" style="position:absolute;background-color:#00CCFF;border:solid 2px #0099FF;opacity:0.4;filter:alpha(opacity=40);"></div>');
	var methods = {
		startBox: function(x, y) {
			box.css('width', '0px');
			box.css('height', '0px');
			box.css('left', x + 'px');
			box.css('top', y + 'px');
		},
		loadStyles: function(element) {
			element.css('cursor', 'crosshair');
			element.css('-webkit-touch-callout', 'none');
			element.css('-webkit-user-select', 'none');
			element.css('-khtml-user-select', 'none');
			element.css('-moz-user-select', 'none');
			element.css('-ms-user-select', 'none');
			element.css('user-select', 'none');
		},
		init: function(options) {
			this.mousedown(function(e) {
				methods.startBox(e.clientX, e.clientY);
				box.show();
			});
			this.mouseup(function(e) {
				var boxpos = box.position();
				var result = {
					topleft: {
						X: boxpos.left,
						Y: boxpos.top
					},
					bottomRight: {
						X: e.clientX,
						Y: e.clientY
					}
				};
				if (options !== undefined && options.onStop !== undefined) {
					options.onStop(result);
				}
			});
			this.mousemove(function(e) {
				//check if mouse is down
				if (e.which == 1) {
					//recalculate box dimensions. for now, only draw box down and right
					var position = box.position();
					box.css('width', (e.clientX - position.left) + 'px');
					box.css('height', (e.clientY - position.top) + 'px');
				}
			});
			methods.loadStyles(this);
			box.hide();
			this.append(box);
		}
	};

	$.fn.boxcar = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.boxcar');
		}
	};
})(jQuery);