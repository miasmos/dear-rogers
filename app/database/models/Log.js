import * as Sequelize from 'sequelize'
import Model from './Model'

export default class LogModel extends Model {
	constructor(connection) {
		super({
			startTime: {
				type: Sequelize.DATE,
				field: 'startTime',
				allowNull: false,
			},
			endTime: {
				type: Sequelize.DATE,
				field: 'endTime',
				allowNull: false,
			}
		}, 'Log', connection);
	}
}
