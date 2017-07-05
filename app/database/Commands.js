import LogActionsCommands from './commands/LogActions'

export default class Commands {
	constructor(connection) {
		this.logActions = new LogActionsCommands(connection)
	}
}
