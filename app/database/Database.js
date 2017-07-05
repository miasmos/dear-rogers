var Sequelize = require('sequelize')
import Commands from './commands'
import Observer from '../util/Observer'

let instance = undefined

export default class Database extends Observer {
	constructor(credentials, logging = false) {
		super()
		if (!instance) {
			instance = this
		} else {
			return instance
		}

		this.user = credentials.user
		this.password = credentials.password
		this.host = credentials.host
		this.port = credentials.port
		this.database = credentials.database
		this.logging = logging ? console.log : function() {}

		this.connect()
			.then(() => {
				this.commands = new Commands(this.connection)
				this.emit('connected')
			})
			.catch((error) => {
				console.error(error)
			});

		return instance;
	}

	connect() {
		this.connection = new Sequelize(this.database, this.user, this.password, {
			host: this.host,
			port: this.port,
			dialect: 'postgres',
			logging: this.logging,
			pool: {
				max: 5,
				min: 0,
				idle: 10000
			}
		})

		return this.connection.authenticate()
	}
}
