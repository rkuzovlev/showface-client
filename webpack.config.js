var path = require('path');
var webpack = require('webpack');

var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	context: __dirname + '/src',

	entry: {
		bundle: './main',
		styles: './styles'
	},
	
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},

	resolve: {
		extensions: ['.js', '.ts', '.html', '.scss']
	},

	module: {
		rules: [
			{
				test: /\.ts$/, 
				use: [
					'awesome-typescript-loader',
					'angular2-template-loader',
					'angular-router-loader'
				]
			}, {
				test: /\.html$/,
				use: 'raw-loader'
			}, {
				test: /\.css$/,
				use: ['to-string-loader', 'css-loader']
			}, {
				test: /\.scss$/,
				use: [{
					loader: "style-loader"
				}, {
					loader: "css-loader"
				}, {
					loader: "sass-loader"
				}]
			}
		]
	},

	plugins:[
		new webpack.ContextReplacementPlugin(
			/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
			__dirname
		),
		new CopyWebpackPlugin([
			{ from: 'assets', to: '../dist' }
		])
	]
};