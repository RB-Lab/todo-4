import {
	ADD_TODO,
	TODO_INPUT,
	INBOX,
	TODO,
	WEEK,
	ONCE
} from '../constants';

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
}

const todoReducer = (state = defaultState, action) => {
	const reducer = reducers[action.type];
	return reducer ? reducer(state, action) : state;
};

export default todoReducer;
