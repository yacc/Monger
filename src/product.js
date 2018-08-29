const Bluebird = require('bluebird');
const Joi = require('joi');
const qs = require('qs');

const mongerRequest = require('./monger');
const {handleError} = require('./utils');

const mongerProductsRoute = `/api/search/products.json`;
const mongerProductRoute = `/api/products/`;

module.exports = {
	getProducts,
	getProduct
};

const ProductJoi = Joi.object().keys({
	id: Joi.number().required()
});

const ProductsJoi = Joi.object().keys({
	per_page: Joi.number().default(21), // eslint-disable-line camelcase,
	page: Joi.number().default(1),
	category_ids: Joi.array(), // eslint-disable-line camelcase
	make_detail_ids: Joi.array(), // eslint-disable-line camelcase
	certification_ids: Joi.array(), // eslint-disable-line camelcase
	query: Joi.string(),
	location: Joi.string()
});

function getProducts(req, res) {
	return Bluebird.resolve(req.query)
		.then(validateRequest(ProductsJoi))
		.then(getMongerProducts)
		.then(d => {
			res.json({
				data: d
			});
		})
		.catch(err => {
			handleError(res, err);
		});
}

function getProduct(req, res) {
	return Bluebird.resolve(req.params)
		.then(validateRequest(ProductJoi))
		.then(getMongerProduct)
		.then(d => {
			res.json({
				data: d
			});
		})
		.catch(err => {
			handleError(res, err);
		});
}

function validateRequest(joiModel) {
	return obj => {
		return Joi.validate(obj, joiModel).then(res => {
			// The new monger API does not support searching by location, it needs to be provided in
			// the search query parameter of the get request
			if (res.location) {
				res.query = res.location;
				delete res.location;
			}

			res.business_id = 905; // eslint-disable-line camelcase

			return res;
		});
	};
}

function getMongerProduct(data) {
	const url = `${mongerProductRoute}${data.id}`;
	return mongerRequest(url);
}

function getMongerProducts(data) {
	const url = `${mongerProductsRoute}?${qs.stringify(data)}`;
	return mongerRequest(url);
}
