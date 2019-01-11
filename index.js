const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const {normalizePort} = require('./src/utils');
const ipWhitelist = require('./ip-whitelist');

const port = normalizePort(process.env.PORT || '4000');

const app = express();
const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
	require('dotenv').config();
}

// CORS
const corsOption = {
	methods: 'GET'
};
app.use(cors(corsOption));

// Whitelisting
// app.use(ipWhitelist(ipWhitelist.array([process.env.SEACREST_WP_IP])));
app.use(ipWhitelist(ipWhitelist.array([process.env.seacrest_wp_ip,'157.230.132.162'])));

// Uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if (isDev) {
	app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/v1/', require('./src/routes'));
app.set('port', port);

const server = http.createServer(app);

var expressServerUtils = require('express-server-utils')(server, port);
expressServerUtils.listen();
expressServerUtils.handleOnError();
expressServerUtils.handleOnListening();

const exitActions = [server.close];
expressServerUtils.handleShutDown(exitActions);
