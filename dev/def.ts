interface IDef {
	a: string
	b: number
	c: boolean
}

const Val = {
	a: '',
} as IDef

for (const key in Val) {
	console.log(key)
}

class Cl {
	constructor(vals: Cl) {
		this.a = vals.a ? vals.a : 'def'
	}

	a?: string
}

const ClObj: Cl = { a: '' }

console.log(ClObj)
