import Database from './database/Database'
import Twitter from './services/twitter'
import Ping from './services/ping'
var moment = require('moment')

let credentials = {
		database: require('./database.json'),
		twitter: require('./twitter.json')
	},
	handle = '@Rogers',
	db = new Database(credentials.database),
	ping = new Ping(),
	twitter = new Twitter(credentials.twitter);

class App {
	constructor() {
		this.startTime = undefined
		this.online = true

		db.on('connected', () => {
			ping.Interval((isAlive) => {
				this.log(`ping ${!!isAlive ? 'success' : 'failure'}`)
				if (this.online && !isAlive) {
					this.SetOffline()
					return
				}
				if (!this.online && isAlive) {
					let endTime = Date.now()
					this.SendTweet(this.startTime, endTime)
						.catch(error => console.error(error))
					this.Save(this.startTime, endTime)
						.catch(error => console.error(error))
					this.SetOnline()
				}
			}, 1000)
		})
	}

	SetOffline() {
		this.online = false
		this.startTime = Date.now()
		this.log('offline')
	}

	SetOnline() {
		this.online = true
		this.startTime = undefined
		this.log('online')
	}

	SendTweet(startTime, endTime) {
		let startMoment = moment(startTime),	
			endMoment = moment(endTime),
			diff = moment.duration(startMoment.diff(endMoment)),
			days = Math.abs(parseInt(diff.asDays())),
			hours = parseInt(diff.asHours());

		hours = Math.abs(hours - days*24)
		let minutes = parseInt(diff.asMinutes())
		minutes = Math.abs(minutes - (days*24*60 + hours*60))
		let seconds = parseInt(Math.abs(diff.asSeconds()))

		let status = `Dear ${handle}, my internet has been offline for `;
		if (days > 0) {
			status += `${days} days.`
		} else if (hours > 0) {
			status += `${hours} hours.`
		} else if (minutes > 0) {
			status += `${minutes} minutes.`
		} else if (seconds > 3) {
			status += `${seconds} seconds.`
		} else {
			return
		}

		this.log(status)
		return twitter.Tweet(status)
	}

	Save(startTime, endTime) {
		return db.commands.logActions.create(startTime, endTime)
	}

	log(text) {
		let time = moment().format('hh:mm:ssA')
		console.log(`[${time}]: ${text}`)
	}
}

let app = new App()