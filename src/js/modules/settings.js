import Cookie from 'tiny-cookie'

const Settings = {
	color: null,
	language: null,
	fontSize: null,

	setConfig: function (key, value) {

		Cookie.set(key, value, {
			expires: '1Y'
		})

		location.reload()

	},
	resetConfig: function () {

		Cookie.remove('lang', null)
		Cookie.remove('fontSize', null)

		location.reload()

	}
}

window.Settings = Settings

export default Settings
