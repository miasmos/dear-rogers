var twitterapi = require('twitter')
import 'bluebird'

export default class Twitter {
	constructor(credentials) {
		this.client = new twitterapi(credentials)
	}

	Tweet(status) {
		return this.client.post('/statuses/update', { status: status })
	}
}