const Router = {
	status: 200,
	data: null,
	options: {
		method: 'GET'
	},
	configCssScoped: function () {

		let css = $('main [scope-css]')

		if (css !== null) {
			let cssArray = $all('head [scope-css]')
			if (cssArray !== null) {
				for (let cssItem of cssArray) {
					document.head.removeChild(cssItem)
				}
			}

			App.main.removeChild(css)
			document.head.appendChild(css)
		}
	},
	evalScriptScoped: function () {

		let scripts = $('main [scope-script]')

		if (scripts !== null) {
			eval(scripts.text)
		}
	},
	loadError: function () {

		if (Router.status === 404) {

			fetch('./pages/404.html')
				.then(res => res.text())
				.then(data => App.main.innerHTML = data)
			console.info({
				'status': 404,
				'mesagge': 'pagina no encontrada'
			})
		}

	},
	load: function (route) {

		fetch(`./pages/${route}.html`, Router.options)
			.then(res => {
				Router.status = res.status
				return res.text()
			})
			.then(data => {
				App.main.innerHTML = data
			})
			.then(status => {
				Router.loadError()
				setTimeout(function () {
					Render.parse($('main'))
				}, 100)

			})
			.then((e) => {
				Router.configCssScoped()
				Router.evalScriptScoped()
				Render.parse(document)
			})
	},
	getUrl: async function () {

		await Menu.removeActive()

		let hash,
			arrayHash = document.location.hash.split('/')

		if (arrayHash != "") {
			hash = arrayHash[1]
		} else {
			hash = 'home'
		}

		let iconRoute = $(`#routes li>a[href="#/${hash}"]>.icon`)

		await Router.load(hash)

		iconRoute.parentNode.parentNode.classList.add('active')
		iconRoute.classList.remove('acent')
		iconRoute.classList.add('color')

	},
	goinTo: function () {
		App.routes.addEventListener('click', function (e) {

			let el = e.target,
				node,
				nodeIcons,
				arrayRoute

			Menu.removeActive()

			if (el.tagName == 'I' || el.tagName == 'SPAN') {
				node = el.parentNode.parentNode
			} else if (el.tagName == 'A') {
				node = el.parentNode
			}

			node.classList.add('active')
			nodeIcons = node.querySelector('.icon').classList
			nodeIcons.remove('acent')
			nodeIcons.add('color')

			arrayRoute = node.querySelector('a').href.split('/')
			Router.load(arrayRoute[arrayRoute.length - 1])
		})
	}
}

window.Router = Router

export default Router
