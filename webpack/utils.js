const fs = require('fs')
const path = require('path')
const HtmlWabpackPlugin = require('html-webpack-plugin')

module.exports = function generateHtmlPlugins (tplDir) {
	const tplFiles = fs.readdirSync(path.resolve(__dirname, tplDir))

	return tplFiles.map((file)=>{
		let parts = file.split('.')
		let name = parts[0]
		let ext = parts[1]
		return new HtmlWabpackPlugin({
			filename: `./pages/${name}.html`,
			template: path.resolve(__dirname, `${tplDir}/${name}.${ext}`),
			inject: false
		})
	})
}
