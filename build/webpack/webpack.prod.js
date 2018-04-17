const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const WorkboxPlugin = require('workbox-webpack-plugin');

process.env.NODE_ENV = "production";

module.exports = merge(common, {
	output: {
		filename: '[name].[chunkhash].js',
	},
	devtool: 'source-map',
	plugins: [
		new UglifyJSPlugin({
			sourceMap: true
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
        }),
		new WorkboxPlugin({ // must be declared last! this is for service workers for PWA
			globDirectory: 'dist',
			globPatterns: ['**/*.{html,js}'],
			swDest: path.join('dist', 'sw.js'),
			globIgnores: [],

			// these options encourage the ServiceWorkers to get in there fast
			// and not allow any straggling "old" SWs to hang around
			clientsClaim: true,
			skipWaiting: true
		}),
	]
});