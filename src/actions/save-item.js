import {SAVE_ITEM} from '../constants';

export default (id, newValue) => ({
	type: SAVE_ITEM,
	id,
	newValue
});
