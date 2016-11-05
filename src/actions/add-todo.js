import {ADD_TODO} from '../constants';

export default (type, todo) => ({
	type: ADD_TODO,
	todo: {type: type, todo, resolved: false}
})
