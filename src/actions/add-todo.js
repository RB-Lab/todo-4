import {ADD_TODO} from '../constants';

export default (type, todo) => ({
	type: ADD_TODO,
	todo: {id: Date.now(), type: type, todo, resolved: false}
})
