var system = require('system');
var webpage = require('webpage');

var site = system.args[1];
var page = webpage.create();

page.open(site, function(status) {
	if (status === 'fail') {
		console.error("Failed to fetch the page");
	} else {
		var base64 = page.renderBase64("PNG");
		console.log(base64);
	}
	phantom.exit();
});
