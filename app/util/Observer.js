export default class Observer {
	constructor() {
		this.subjects = {}
	}

	on(event, fn, args): void {
		if (typeof event !== 'string' || !event || typeof fn !== 'function') {
			return
		}
		if (!(event in this.subjects)) {
			this.subjects[event] = []
		}
		this.subjects[event].push({ event, fn, args })
	}

	emit(event, args) {
		if (event in this.subjects) {
			for (var index in this.subjects[event]) {
				var subject = this.subjects[event][index]
				subject.fn.call(this, args)
			}
		}
	}

	off(event, fn) {
		if (!(event in this.subjects)) {
			return
		}
		if (typeof fn === 'function') {
			for (var index in this.subjects[event]) {
				var subject = this.subjects[event][index]
				if (subject.fn === fn) {
					this.subjects[event].splice(0, index)
				}
			}
		} else {
			delete this.subjects[event]
		}
	}
}
