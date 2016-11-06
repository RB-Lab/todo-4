import {ADD_ITEM} from '../constants';

export default (type, todo) => ({
	type: ADD_ITEM,
	todo: {id: Date.now(), type: type, todo, resolved: false}
})
