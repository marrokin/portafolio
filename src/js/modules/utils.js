const $ = (el) => document.querySelector(el)
const $all = (el) => document.querySelectorAll(el)

window.$ = $
window.$all = $all

export default {
	$,
	$all
}
