const path = require('path')

const merge = require('webpack-merge')
const common = require('./common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, argv) => merge( common( env, {
	...argv,
	sourceMap: true
}), {
	mode: 'development',
	devtool: 'source-map',

	plugins: [
		new MiniCssExtractPlugin ({filename: './css/[name].css'})
	]
})
