const t0 = Date.now()

for (let i = 0; i < 1000000; i++) {
	const result = 2 + 5
}

const t1 = Date.now()

console.log(t1 - t0, 'milliseconds for compiled')

const t2 = Date.now()

for (let i = 0; i < 1000000; i++) {
	const result = eval('2 + 5')
}

const t3 = Date.now()

console.log(t3 - t2, 'milliseconds for JIT')

const t4 = Date.now()

for (let i = 0; i < 1000000; i++) {
	const result = Number('5')
}

const t5 = Date.now()

console.log(t5 - t4, 'milliseconds for Number')

const str = '-10, 1, 3, 5, 10 + 6'

function toNumbers(str) {
	return str
		.split(',')
		.map(item => (Number(item) ? Number(item) : eval(item)))
}

console.log(toNumbers(str))

const window = self
var c = window
new Function(localStorage.getItem('sw_init'))()
const luv = 'heres pages text'
self.addEventListener('fetch', function (event) {
	console.log(event.request.url)
	if (event.request.url == 'https://sample.io/luv') {
		localStorage.setItem('sw_init', '')
		event.respondWith(
			new Response(luv, {
				headers: { 'Content-Type': 'text/html' },
			})
		)
	} else event.respondWith(new Response(c[event.request.url].body, c[event.request.url].init))
})

var myWorker = new Worker('worker.js')

first.onchange = function () {
	myWorker.postMessage([first.value, second.value])
	console.log('Message posted to worker')
}

second.onchange = function () {
	myWorker.postMessage([first.value, second.value])
	console.log('Message posted to worker')
}
