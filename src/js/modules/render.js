import cookie from 'tiny-cookie'

const regExp = /\{\{+(.*)+(\.?)+(.*?)+\}\}/

const Render = {
	status: 200,
	data: {},
	counter: 0,
	optionsFech: {
		method: 'GET'
	},
	load: (file) => {
		fetch(file)
			.then(r => r.text())
			.then(d => Render.data = JSON.parse(d))
			.catch(e => console.log(e))
	},
	printListItems: function (contanier, context, template) {

		let content = $(contanier),
			items = Render.data[context],
			str = ''
		items.map(item => {
			str = str + eval(template)
		})

		let tpl = `<ul class=list>${str}</ul>`
		content.innerHTML = tpl

	},
	printListItemsArray: function (contanier, array, template) {

		let content = $(contanier),
			items = array,
			str = ''
		console.log(items)
		items.map(item => {
			str = str + eval(template)
		})

		let tpl = `${str}`
		content.innerHTML = tpl

	},
	renderInit: function () {
		let body = $('body')
		let fontSize = cookie.get('fontSize')

		let lang = cookie.get('lang')

		fontSize != undefined ? body.style.fontSize = `${fontSize}px` : body.style.fontSize = `16px`
		lang != undefined ? $('html').setAttribute('lang', lang.substr(0, 2)) : $('html').setAttribute('lang', 'es')
	},
	parse: function (el) {

		let childs = el.children

		for (var child of childs) {
			if (regExp.test(child.textContent)) {
				let str = regExp.exec(child.textContent)
				var tpl = regExp.exec(child.textContent)[0]
				var key = regExp.exec(child.textContent)[1]

				if (child.children.length === 0) {
					child.innerHTML = eval(`Render.data.${key}`)
				}
			}
			Render.parse(child)
		}
	}

}

window.Render = Render

export default Render
