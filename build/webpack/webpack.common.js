const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


const ROOT_DIR = path.resolve(__dirname, '../../');

module.exports = {
	entry: {
		app: [
			'./src/index.js'
		],
		print: [
			'./src/print.js'
		],
		polyfills: [
			'./src/polyfills.js'
		],
		vendor: [
			'lodash'
		]
	},
	output: {
		filename: '[name].[hash].js',
		path: path.resolve(ROOT_DIR, 'dist'),
	},
	resolve: {
		extensions: ['.js', '.json']
	},
	plugins: [
		new CleanWebpackPlugin(['dist'], {
			root: ROOT_DIR
		}),
		new HtmlWebpackPlugin({
				template: 'src/index.tpl.html',
				title: 'Laura Laura Laura',
				inject: 'body',
				//excludeChunks: ['polyfills'] would need html-webpack-exclude-assets-plugin as using hashes in our bundles names
			}
		),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest'
		}),
		new webpack.ProvidePlugin({
			_: 'lodash',
			join: ['lodash', 'join']
		})
	],
	module: {
		rules: [
			{
				test: require.resolve('../../src/globals.js'),
				use: 'exports-loader?file,parse=helpers.parse'
			},
			{
				test: /\.css$/,
				use: [
					'style-loader', // loads CSS files imported in JS files
					'css-loader' // loads images imported in CSS files
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader', // loads images imported in JS files
					{
						loader: 'image-webpack-loader', // image min
						options: {
							bypassOnDebug: false,
						}
					}
				]
			}
			,
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader'
				]
			}
		]
	}
};
