const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

process.env.NODE_ENV = "development";

module.exports = merge(common, {
	entry: {
		app: [
			'webpack-hot-middleware/client?noInfo=true&reload=true'
		],
		print: [
			'webpack-hot-middleware/client?noInfo=true&reload=true'
		],
	},
	devtool: 'inline-source-map',
	output: {
		publicPath: "/" // for middleware, used within our server script as well in order to make sure files are served correctly on http://localhost:3000
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		})
	]
});