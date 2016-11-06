import {CHANGE_CURRENT_INPUT} from '../constants';

export default (inputId, value) => ({
	type: CHANGE_CURRENT_INPUT,
	inputId,
	value
})
