const fs = require('fs');
const path = require('path');


function createFsConnection(folder) {
	return function connect(id) {
		const filename = path.join(folder, id);
		return Promise.resolve(createDriver(filename));
	};
}

function createDriver(filename) {
	let cache = null;
	return {
		read() {
			if (cache) {
				return Promise.resolve(cache);
			}
			return read(filename)
				.then((data) => {
					cache = data;
					return cache;
				});
		},
		write(newData) {
			return write(filename, newData)
				.then(() => {
					cache = newData;
					return newData;
				});
		}
	};
}

function read(filename) {
	return new Promise((resolve, reject) => {
		fs.readFile(filename, 'utf8', (err, data) => {
			if (err) {
				reject(err);
				return;
			}
			if (data === '') {
				write(filename, {})
					.then(resolve);
				return;
			}
			try {
				resolve(JSON.parse(data));
			} catch (e) {
				reject(e);
			}
		});
	});
}

function write(filename, newData) {
	return new Promise((resolve, reject) => {
		fs.writeFile(filename, JSON.stringify(newData), (err) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(newData);
		});
	});
}

module.exports = createFsConnection;
