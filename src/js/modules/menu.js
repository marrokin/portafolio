const Menu = {
	routes: $('#routes'),
	removeActive: function () {
		for (let child of Menu.routes.children) {
			let childIconClass = child.querySelector('a .icon').classList

			child.classList.remove('active')
			childIconClass.remove('color')
			childIconClass.add('acent')
		}
	}
}

window.Menu = Menu

export default Menu
