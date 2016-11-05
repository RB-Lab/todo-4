import {TODO_INPUT} from '../constants';

export default (todoType, value) => ({
	type: TODO_INPUT,
	todoType,
	todoText: value
})
