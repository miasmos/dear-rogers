import Database from './database/Database'

var credentials = require('database.json')

var db = new Database(credentials)

db.commands.logActions.create(Date.now(), Date.now())
	.then(result => console.log(result))
	.catch(error => console.error(error))