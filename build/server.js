const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-hot-middleware");

const app = express();
const config = require('./webpack/webpack.dev.js');

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const compiler = webpack(smp.wrap(config));

// Tell express to use the webpack-dev-middleware and use the webpack.config.js configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath,
	stats: {
		colors: true,
		hash: false,
		timings: true,
		chunks: false,
		chunkModules: false,
		modules: false
	}
}));

app.use(webpackHotMiddleware(compiler, {
	log: console.log
}));

const port = 3000;
app.listen(port, function (err) {
	if (err) {
		console.log(err)
	}
	console.info('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
