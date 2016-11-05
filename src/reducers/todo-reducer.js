import {
	ADD_TODO,
	SHOW_ADD_TODO
} from '../constants';

const defaultState = {
	addTo: null,
	todos: []
}

const reducers = {
	[ADD_TODO]: (state, action) => Object.assign({}, state, {
		addTo: null,
		todos: state.todos.concat(action.todo)
	}),
	[SHOW_ADD_TODO]: (state, action) => Object.assign({}, state, {
		addTo: action.addTo
	})
}

const todoReducer = (state = defaultState, action) => {
	const reducer = reducers[action.type];
	return reducer ? reducer(state, action) : state;
};

export default todoReducer;
