import findIndex from 'lodash/findIndex';
import filter from 'lodash/filter';

import {replace, splice} from '../lib/array-utils';

const selectTodoIndexById = (todos, id) => findIndex(
	todos,
	(todo) => todo.id === id
);

export default function TodosModel(initialTodos, subscriber) {
	let todos = initialTodos;

	function notify() {
		if (typeof subscriber === 'function') {
			subscriber({todos});
		}
	}

	this.addItem = (type, todo) => {
		const newTodo = {id: Date.now(), type, todo, resolved: false};
		todos = todos.concat(newTodo);
		notify();
	};

	this.toggleResolve = (id) => {
		const index = selectTodoIndexById(todos, id);
		const todo = todos[index];
		todos = replace(
			todos,
			index,
			Object.assign({}, todo, {resolved: !todo.resolved})
		);
		notify();
	};

	this.removeItem = (id) => {
		const index = selectTodoIndexById(todos, id);
		todos = splice(todos, index, 1);
		notify();
	};

	this.saveItem = (id, newValue) => {
		const index = selectTodoIndexById(todos, id);
		const todo = todos[index];
		todos = replace(
			todos,
			index,
			Object.assign({}, todo, {todo: newValue})
		);
		notify();
	};

	this.changeType = (id, newType) => {
		const index = selectTodoIndexById(todos, id);
		const todo = todos[index];
		todos = replace(
			todos,
			index,
			Object.assign({}, todo, {type: newType})
		);
		notify();
	};
}

export function getTodosByType(todos, type) {
	return filter(todos, (todo) => todo.type === type);
}
