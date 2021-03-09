import format from 'date-fns/format';

const initializer = function (init) { console.log("INIT", this, init) }

const logger = function (target) {
	return { ...target, initializer };
}




export class AdvancedUpdating extends Updating {

	@logger
	hello2 = "world 2"

	constructor() {
		super();
	}

}

