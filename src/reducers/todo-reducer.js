import find from 'lodash/find';
import {
	ADD_TODO,
	TODO_INPUT,
	TOGGLE_RESOLVE,
	INBOX,
	TODO,
	WEEK,
	ONCE
} from '../constants';
import {replace} from '../lib/array-utils'

const defaultState = {
	currentInputs: {
		[INBOX]: '',
		[TODO]: '',
		[WEEK]: '',
		[ONCE]: ''
	},
	todos: []
}

const reducers = {
	[ADD_TODO]: (state, action) => Object.assign({}, state, {
		todos: state.todos.concat(action.todo),
		currentInputs: Object.assign({}, state.currentInputs, {
			[action.todo.type]: ''
		})
	}),
	[TODO_INPUT]: (state, action) => Object.assign({}, state, {
		currentInputs: Object.assign({}, state.currentInputs, {
			[action.todoType]: action.todoText
		})
	}),
	[TOGGLE_RESOLVE]: (state, action) => {
		const todo = find(state.todos, todo_ => todo_.id === action.id);
		return Object.assign({}, state, {
			todos: replace(
				state.todos,
				state.todos.indexOf(todo),
				Object.assign({}, todo, {resolved: !todo.resolved})
			)
		})
	}
}

const todoReducer = (state = defaultState, action) => {
	const reducer = reducers[action.type];
	return reducer ? reducer(state, action) : state;
};

export default todoReducer;
