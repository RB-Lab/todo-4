const http = require('http');
const fs = require('fs');

const createRequestHandler = require('./handle-request.js');
const createDbConnector = require('./fs-driver.js');

const port = process.env.MS_PORT;
const host = process.env.MS_HOST;
const allowedOriginsFile = process.env.ORIGINS;
const folder = process.env.FOLDER;

if (port === undefined) throw new Error('MS_PORT environment variable is not set');
if (host === undefined) throw new Error('MS_HOST environment variable is not set');
if (folder === undefined) throw new Error('MS_HOST environment variable is not set');

let origins = [];
try {
	origins = fs
		.readFileSync(allowedOriginsFile, {encoding: 'utf-8'})
		.split('\n')
		.filter((o) => o);
} catch (ignore) {}

const handleRequest = createRequestHandler(createDbConnector(folder));

const server = http.createServer((req, res) => {
	if (isOriginInList(req.headers.origin)) {
		res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
	}
	if (req.method === 'POST' && req.url === '/') {
		if (req.headers['content-type'] !== 'application/json') {
			sendErr(res, 400, `Wrong content-type: ${
				req.headers['content-type']
			}. Only application/json suported`);
			return;
		}
		const body = [];
		req.on('data', (chunk) => {
			body.push(chunk);
		}).on('end', () => {
			let requestData;
			try {
				requestData = JSON.parse(Buffer.concat(body).toString());
			} catch (err) {
				sendErr(res, 400, err);
				return;
			}
			handleRequest(requestData)
				.then((responseData) => {
					res.writeHead(responseData.status, {'Content-Type': 'application/json'});
					res.end(JSON.stringify(responseData.payload));
				})
				.catch((err) => {
					sendErr(res, 500, err);
				});
		});
		return;
	}
	sendErr(res, 404, '404: Resourse not found');
});

server.listen(port, host, () => {
	console.log(`Server running at http://${host}:${port}/`);  // eslint-disable-line no-console
});


function sendErr(res, status, err) {
	if (status === 500) {
		console.error(err); // eslint-disable-line no-console
	}
	res.writeHead(status, {'Content-Type': 'application/json'});
	res.end(JSON.stringify({error: err.payload ? err.payload : err.toString()}));
}

function isOriginInList(origin = '') {
	return (origins || []).indexOf(origin.replace(/^https?:\/\//, '')) > -1;
}
