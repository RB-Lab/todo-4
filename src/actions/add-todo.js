import {ADD_TODO} from '../constants';

export default (addTo, todo) => ({
	type: ADD_TODO,
	todo: {type: addTo, todo, resolved: false}
})
