const Bluebird = require('bluebird');

const mongerRequest = require('./monger');
const {handleError} = require('./utils');

const mongerFiltersRoute = `/api/filters/products.json`;

module.exports = {
	getFilters
};

function getFilters(req, res) {
	return Bluebird.resolve()
		.then(getMongerFilters)
		.then(d => {
			res.json({
				data: d
			});
		})
		.catch(err => {
			handleError(res, err);
		});
}

function getMongerFilters(data) {
	return mongerRequest(mongerFiltersRoute);
}
