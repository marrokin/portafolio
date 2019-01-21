const path = require('path')

const merge = require('webpack-merge')
const common = require('./common')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, argv) => merge( common( env, {
	...argv,
	sourceMap: false
}), {
	mode: 'production',
	bail: true,

	plugins: [
		new MiniCssExtractPlugin({filename: './css/[name].[hash].css'})
	],
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true
			}),
			new OptimizeCssAssetsPlugin({})
		]
	}
})

