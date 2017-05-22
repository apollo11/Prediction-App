Modernizr.load([
	{
		test: Modernizr.mq('only all'),
		nope: [
			'assets/js/polyfills/respond.min.js',
			'assets/js/polyfills/classList.js', 
		]
	},
	{
		test: Modernizr.input.placeholder,
		nope: 'assets/js/polyfills/jquery.placeholder.js',
		callback: function() {
			$('input[placeholder], textarea[placeholder]').placeholder();
		}
	},
	{
		test: window.matchMedia,
		nope: [
				'assets/js/polyfills/matchMedia.js', 
				'assets/js/polyfills/matchMedia.addListener.js'
		]
	},

	'assets/js/script.js'
]);
