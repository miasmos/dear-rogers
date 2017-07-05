export default class Model {
	constructor(schema, title, connection) {
		this.connection = connection
		this.model = connection.define(title, schema, {
			freezeTableName: true
		})
		this.model.sync()
	}

	getModel() {
		return this.model
	}
}
