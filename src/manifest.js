const path = require('path')

module.exports = {
	name: 'Edwin Marroquin Frontend Developer',
	short_name: '@devemloop',
	description: 'Edwin Marroquin Curriculum',
	start_url: './index.html',
	scope:'./',
	lang: 'es-CO',
	background_color: '#2d3436',
	theme_color: '#19C692',
	display:'fullscreen',
	orientation: 'any',
	fingerprints:false,
  icons: [
    {
      src: path.resolve('./src/assets/img/icon.png'),
      sizes: [ 16, 32, 72, 96, 128, 144, 152, 192, 384, 512],
      destination: 'assets/img'
    }
  ]
}
