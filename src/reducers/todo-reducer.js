import findIndex from 'lodash/findIndex';
import omit from 'lodash/omit';
import {
	ADD_ITEM,
	CHANGE_CURRENT_INPUT,
	TOGGLE_RESOLVE,
	REMOVE_ITEM,
	INBOX,
	TODO,
	WEEK,
	ONCE
} from '../constants';
import {replace, splice} from '../lib/array-utils'

const defaultState = {
	currentInputs: {},
	todos: []
}

const reducers = {
	[ADD_ITEM]: (state, action) => Object.assign({}, state, {
		todos: state.todos.concat(action.todo),
		currentInputs: omit(state.currentInputs, action.todo.type)
	}),
	[CHANGE_CURRENT_INPUT]: (state, action) => Object.assign({}, state, {
		currentInputs: Object.assign({}, state.currentInputs, {
			[action.inputId]: action.value
		})
	}),
	[TOGGLE_RESOLVE]: (state, action) => {
		const index = findIndex(state.todos, todo_ => todo_.id === action.id);
		const todo = state.todos[index];
		return Object.assign({}, state, {
			todos: replace(
				state.todos,
				index,
				Object.assign({}, todo, {resolved: !todo.resolved})
			)
		});
	},
	[REMOVE_ITEM]: (state, action) => {
		const index = findIndex(state.todos, todo_ => todo_.id === action.id);
		return Object.assign({}, state, {
			todos: splice(state.todos, index, 1)
		});
	}
}

const todoReducer = (state = defaultState, action) => {
	const reducer = reducers[action.type];
	return reducer ? reducer(state, action) : state;
};

export default todoReducer;
