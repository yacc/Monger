const axios = require('axios');

module.exports = route => {
	const base = process.env.MONGER_URL;
	const url = base + route;
	const config = {
		url,
		method: 'GET',
		headers: {
			Authorization: `${process.env.MONGER_TOKEN}|${process.env.MONGER_ID}`
		}
	};

	console.log('=====================');
	console.log('Monger Request:', url);
	console.log(JSON.stringify(config, null, 4));
	console.log('=====================');

	return axios(config).then(normalizeResponse);
};

function normalizeResponse(response) {
	return response.data;
}
