const Language = {
	dic: 'es_co',
	data: null,
	getDictionary: async function () {
		await fetch(`./${Language.dic}.json`)
			.then(res => res.text())
			.then(data => Language.data = JSON.parse(data))
			.catch(error => console.log(error))
	},
	viewData: async function () {
		await Language.getDictionary()
		for (let word in Language.data) {
			let k = word,
				v = Language.data[word]
			console.log(k, v)
		}
	}
}

window.Language = Language

export default Language
