const methodsMap = {
	save: 'write',
	read: 'read'
};

module.exports = function startRequestHandler(connect) {
	return function handleRequest(request) {
		if (!request.id) {
			return Promise.resolve({
				status: 400,
				payload: {
					error: 'id field is missing in the request'
				}
			});
		}
		const method = methodsMap[request.method];
		if (!method) {
			return Promise.resolve({
				status: 400,
				payload: {
					error: `menthod ${request.method} is not supported (supported methods are: ${
						Object.keys(methodsMap).join(', ')
					})`
				}
			});
		}
		return connect(request.id)
			.then((dbDriver) => dbDriver[method](request.payload))
			.then((payload) => ({status: 200, payload}));
	};
};
