import Command from './Command'
import LogModel from '../models/Log'

export default class LogActionsCommands extends Command {
	constructor(connection) {
		super()
		this.model = new LogModel(connection).getModel()
	}

	create(startTime, endTime) {
		console.log(this.model)
		return this.model.create(
			{ startTime, endTime }
		)
	}
}
