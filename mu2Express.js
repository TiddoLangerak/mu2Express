var mu2 = require('mu2'),
	path = require('path');

/**
 * MU2 render function
 */
var mustacheEngine = function(filename, options, fn) {
	// Set mustache root dir, so it can find partials.
	if ((typeof options.settings === 'object') && options.settings.views) {
		// Use the views directory from Express.
		mu2.root = options.settings.views;
	}
	else {
		// Use the directory where current file is.
		mu2.root = path.dirname(filename);
	}

	var result = "";
	mu2.compileAndRender(filename, options).on('data', function(data) {
		result += data;
	}).on('end', function() {
		fn(null, result);
	}).on('error', function(e) {
		fn(e);
	});
};
exports.engine = mustacheEngine;