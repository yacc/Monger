const Express = require('express');
const Router = Express.Router(); // eslint-disable-line new-cap

const Product = require('./product');
const Filter = require('./filter');

Router.route('/products').get(Product.getProducts);
Router.route('/products/:id').get(Product.getProduct);
Router.route('/filters').get(Filter.getFilters);

module.exports = Router;
