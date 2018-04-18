const phantomjs = require('phantomjs');
const {spawn} = require('child_process');
const http = require('http');
const url = require('url');
const server = http.createServer();
const path = require('path');
const base64 = require('base64-stream');

server.on('request', (req, res) => {
	let siteUrl = url.parse(req.url, true).query.site;
	if (!siteUrl) {
		res.end("site param is missing");
	} else {
		let child = spawn(phantomjs.path, [
			path.join(__dirname, 'downloader.js'),
			siteUrl
		]);
		child.stdout.pipe(base64.decode()).pipe(res);
		child.stderr.pipe(res);
	}
});

server.listen(3000, (err) => {
	if (err) { throw err; }

	console.log("Server up and running on http://localhost:3000");
});
		
