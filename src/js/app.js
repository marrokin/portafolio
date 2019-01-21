import './dictionaries'
import Utils from './modules/utils'
import Settings from './modules/settings'
import Language from './modules/language'
import Router from './modules/router'
import Render from './modules/render'
import Menu from './modules/menu'

const App = {
	routes: document.querySelector('#routes'),
	main: document.querySelector('#main')
}

window.App = App

export default App


;
(() => {

	const cookie = require('tiny-cookie')

	var dicCookie = 'es_co'

	if (cookie.get('lang')) {
		dicCookie = cookie.get('lang')
	}
	const dic = require(`./dictionaries/${dicCookie}.json`)

	window.dic = dic

	Render.load(dic)
	Render.renderInit()
	Router.goinTo()

	window.addEventListener('load', async function () {
		await Router.getUrl()
	})

	window.addEventListener('hashchange', async function () {
		await Router.getUrl()
	})

	Render.parse(document)
})()
