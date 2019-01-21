const path = require('path')

const HtmlWabpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const CssUrlRelativePlugin = require('css-url-relative-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')
const generateHtmlPlugins = require('./utils')

const htmlPlugins = generateHtmlPlugins(path.resolve('./src/pug/pages'))
const srcDir = path.resolve('./src')
const distDir = path.resolve('./docs')

const manifest = require(path.join(srcDir, 'manifest'))

module.exports = (env, {
	sourceMap
}) => {

	const STYLE_LOADER = [
		{
			test: /\.css$/,
			use:[
				{
					loader: MiniCssExtractPlugin.loader
				},
				{
					loader: 'css-loader',
					options: {
						sourceMap
					}
				}
			]
		},
		{
			test: /\.scss$/,
			use: [
				{
					loader: MiniCssExtractPlugin.loader
				},
				{
					loader: 'css-loader',
					options: {
						sourceMap
					}
				},
				{
					loader: 'resolve-url-loader',
					options: {
						engine: 'rework'
					}
				},
				{
					loader: 'sass-loader',
					options: {
						sourceMap: true
					}
				}
			]
		}
	];

	const TEMPLATE_LOADER = [
		{
			test: /\.html$/,
			exclude: /node_modules/,
			use: [
				{
					loader: 'html-loader',
					options: {
						interpolate: 'require',
						attrs: ['img:src', 'source:srcset']
					}
				}
			]
		},
		{
			test: /\.pug$/,
			exclude: /node_modules/,
			use: [
				{
					loader: 'html-loader',
					options: {
						interpolate: 'require',
						attrs: ['img:src', 'source:srcset']
					}
				},
				{
					loader: 'pug-html-loader',
					options: {
						pretty: true,
						exports: false
					}
				}
			]
		}
	];

	const DATA_LOADER = [
		{
			type: 'javascript/auto',
			test: /\.json$/,
			exclude: /node_modules/,
			use: [
				{
					loader: 'file-loader',
					options: {
						name:'[name].[ext]'
					}
				}
			]
		}
	];

	const COMPILER_LOADER = [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [
				{
					loader: 'babel-loader'
				}
			]
		}
	];

	const ASSETS_LOADER = [
		{
			test: /\.(jpe?g|png|gif|ico)$/,
			use:[
				{
					loader: 'url-loader',
					options: {
						limit: 16384,
						name: 'assets/img/[name].[ext]',
						fallback: 'file-loader'
					}
				}
			]
		},
		{
			test: /\.(woff(2)?|ttf|eot|otf|svg)(\?v=\d+\.\d+\.\d+)$/,
			use: [
				{
					loader: 'file-loader',
					options: {
						name:'[name].[ext]',
						outputPath: 'assets/fonts/'
					}
				}
			]
		},
		{
			test: /\.svg$/,
			use: [
				{
					loader: 'svg-sprite-loader',
					options: {
						extract: true,
						spriteFilename: svgPath => `assets/img/sprite${svgPath.substr(-4)}`
					}
				}
			]
		}
	];

	return {
		devServer: {
			compress: false,
			host: '0.0.0.0',
			port:8888,
			watchContentBase: true
		},

		entry: {
			app: path.join(srcDir, 'index.js')
		},

		output: {
			path: path.join(distDir),
			filename: './js/[name].[hash].js'
		},

		resolve: {
			alias: {
				assets: path.join(srcDir, 'assets')
			},
			extensions: ['.js']
		},

		node: {
			fs: 'empty'
		},

		plugins: [
			new HtmlWabpackPlugin({
				template: './src/index.pug',
				filename: './index.html'
			}),
			// Require parse-import
			// new CssUrlRelativePlugin(),
			new SpriteLoaderPlugin(),
			new WebpackPwaManifest(manifest)
		]
		.concat(htmlPlugins),

		module: {
			rules: [
				...STYLE_LOADER,
				...TEMPLATE_LOADER,
				...COMPILER_LOADER,
				...DATA_LOADER,
				...ASSETS_LOADER
			]
		}
	}
}
