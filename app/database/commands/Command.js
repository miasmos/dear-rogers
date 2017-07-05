export default class Command {
	get(id) {
		return this.model.findAll({
			where: { id },
			raw: true
		})
	}

	delete(id) {
		return this.model.destroy({
			where: { id }
		})
	}
}
