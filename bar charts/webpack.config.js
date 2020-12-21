const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin')
const ImageminPlugin = require("imagemin-webpack");

const isDev = process.env.NODE_ENV === 'development';

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;
const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	}

	if(!isDev) {
		config.minimizer = [
			new OptimizeCssAssetWebpackPlugin(),
			new TerserWebpackPlugin()
		]
	}

	return config;
}

const plugins = () => {
	const config = [
	new HTMLWebpackPlugin({
			template: './index.html',
			filename: 'index.html',
			minify: {
				collapseWhitespace: !isDev
			}
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: `./scss/${filename('css')}`
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/favicon.ico'),
					to: path.resolve(__dirname, 'dist')
				}
			]
		})
	];

	if(!isDev) {
		config.push(new ImageminPlugin({
	      bail: false, 
	      cache: true,
	      imageminOptions: {
	        plugins: [
	          ["gifsicle", { interlaced: true }],
	          ["jpegtran", { progressive: true }],
	          ["optipng", { optimizationLevel: 5 }],
	          [
	            "svgo",
	            {
	              plugins: [
	                {
	                  removeViewBox: false
	                }
	              ]
	            }
	          ]
	        ]
	      }
	    }))
	}

	return config;
}

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: './js/index.js',
	output: {
		filename: `./js/${filename('js')}`,
		path: path.resolve(__dirname, 'dist'),
		publicPath: ''
	},
	devServer: {
		historyApiFallback: true,
		open: true,
		hot: true,
		port: 300,
		compress: true
	},
	optimization: optimization(),
	devtool: isDev ? 'source-map' : false,
	plugins: plugins(),
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [{
					loader: MiniCssExtractPlugin.loader,
					options: {
						hmr: isDev
					}
				}, 'css-loader']
			},
			{
				test: /\.s[ac]ss$/i,
				use: [{
					loader: MiniCssExtractPlugin.loader, 
					options: {
						publicPath: (resoursePath, context) => {
							return path.relative(path.dirname(resoursePath), context) + '/'
						}
					}
				}, 'css-loader', 'sass-loader']
			},
			{
				test: /\.html$/i,
				use: 'html-loader'
			},
			{
				test: /\.(?:png|jpg|jpeg|svg|webp|gif)$/i,
				use: [{
					loader: 'file-loader',
					options: {
						name: `./img/${filename('[ext]')}`
					} 
				}]
			},
			{
				test: /\.(?:woff2|woff|eot)$/i,
				use: [{
					loader: 'file-loader',
					options: {
						name: `./fonts/${filename('[ext]')}`
					} 
				}]
			},
			{
				test: /\.js$/i,
				use: ['babel-loader'],
				exclude: /node_modules/
			},
		]
	}
}