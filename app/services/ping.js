var ping = require('ping')
import Observer from '../util/Observer'

export default class Ping extends Observer {
	constructor() {
		super()
		this.host = 'google.com'
		this.interval = undefined
		this.callback = function(){}
	}

	Interval(callback, timeout) {
		clearInterval(this.interval)
		if (typeof callback === 'function') this.callback = callback
		this.interval = setInterval(this._tick.bind(this), timeout)
	}

	_tick() {
		ping.sys.probe(this.host, (isAlive) => {
			if (typeof isAlive === 'boolean') this.callback.call(this, isAlive)
		})
	}
}