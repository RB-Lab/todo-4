import findIndex from 'lodash/findIndex';
import omit from 'lodash/omit';
import find from 'lodash/find';
import {
	ADD_ITEM,
	SAVE_ITEM,
	CHANGE_CURRENT_INPUT,
	TOGGLE_RESOLVE,
	REMOVE_ITEM,
	START_EDIT,
	STOP_EDIT
} from '../constants';
import {replace, splice} from '../lib/array-utils'

const defaultState = {
	currentInputs: {},
	todos: []
}

const selectTodoIndexById = (state, id) => findIndex(
	state.todos,
	todo => todo.id === id
);

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
	[TOGGLE_RESOLVE]: (state, {id}) => {
		const index = selectTodoIndexById(state, id);
		const todo = state.todos[index];
		return Object.assign({}, state, {
			todos: replace(
				state.todos,
				index,
				Object.assign({}, todo, {resolved: !todo.resolved})
			)
		});
	},
	[REMOVE_ITEM]: (state, {id}) => {
		const index = selectTodoIndexById(state, id);
		return Object.assign({}, state, {
			todos: splice(state.todos, index, 1)
		});
	},
	[START_EDIT]: (state, {id}) => Object.assign({}, state, {
		currentInputs: Object.assign({}, state.currentInputs, {
			[id]: find(state.todos, todo => todo.id === id).todo
		})
	}),
	[STOP_EDIT]: (state, {id}) => Object.assign({}, state, {
		currentInputs: omit(state.currentInputs, id)
	}),
	[SAVE_ITEM]: (state, {id, newValue}) => {
		const index = selectTodoIndexById(state, id);
		const todo = state.todos[index];
		return Object.assign({}, state, {
			todos: replace(
				state.todos,
				index,
				Object.assign({}, todo, {todo: newValue})
			),
			currentInputs: omit(state.currentInputs, id)
		});
	}
}

const todoReducer = (state = defaultState, action) => {
	const reducer = reducers[action.type];
	return reducer ? reducer(state, action) : state;
};

export default todoReducer;
