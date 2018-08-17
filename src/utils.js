module.exports = {
	normalizePort,
	handleError
};

function normalizePort(val) {
	var port = parseInt(val, 10);

	if (isNaN(port)) {
		// Named pipe
		return val;
	}

	if (port >= 0) {
		// Port number
		return port;
	}

	return false;
}

function handleError(res, error) {
	if (error.response) {
		// The request was made and the server responded with a status code
		// that falls out of the range of 2xx
		// console.log(error.response.data);
		// console.log(error.response.status);
		// console.log(error.response.headers);
		res.status(error.response.status);
	} else if (error.request) {
		// The request was made but no response was received
		// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
		// http.ClientRequest in node.js
		console.log('error.request');
		console.log(error.request);
	} else {
		// Something happened in setting up the request that triggered an Error
		console.log('Error', error.message);
	}
	console.log('Unknown error');
	console.log(error.config ? error.config : error);
	res.status(500).json({
		success: false,
		error: 'Uknown error'
	});
}
