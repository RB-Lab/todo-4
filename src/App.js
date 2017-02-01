import React, {Component} from 'react';
import findIndex from 'lodash/findIndex';

import {loadFromLocalStorage, saveToLocalStorage} from './lib/persist';
import {replace, splice} from './lib/array-utils'
import Sheet from './components/sheet';
import TodoList from './components/todo-list';
import {INBOX, TODO, WEEK, ONCE} from './constants';
import './App.css';

const selectTodoIndexById = (state, id) => findIndex(
	state.todos,
	todo => todo.id === id
);

class App extends Component {
	constructor() {
		super();
		this.state = loadFromLocalStorage() || {todos: []};
		this.addItem = (type, todo) => {
			const newTodo = {id: Date.now(), type, todo, resolved: false};
			this.setState({todos: this.state.todos.concat(newTodo)});
		};
		this.toggleResolve = (id) => {
			const index = selectTodoIndexById(this.state, id);
			const todo = this.state.todos[index];
			this.setState({
				todos: replace(
					this.state.todos,
					index,
					Object.assign({}, todo, {resolved: !todo.resolved})
				)
			});
		};
		this.removeItem = (id) => {
			const index = selectTodoIndexById(this.state, id);
			this.setState({todos: splice(this.state.todos, index, 1)});
		};
		this.saveItem = (id, newValue) => {
			const index = selectTodoIndexById(this.state, id);
			const todo = this.state.todos[index];
			this.setState({
				todos: replace(
					this.state.todos,
					index,
					Object.assign({}, todo, {todo: newValue})
				)
			});
		};
	}

	render() {
		const inbox = this.state.todos.filter(todo => todo.type === INBOX);
		const todo = this.state.todos.filter(todo => todo.type === TODO);
		const week = this.state.todos.filter(todo => todo.type === WEEK);
		const once = this.state.todos.filter(todo => todo.type === ONCE);
		saveToLocalStorage(this.state); // TODO where this should be placed actually?

		return (
			<div className="App">
				<Sheet
					title="inbox"
					todoType={INBOX}
					addItem={this.addItem}
					placeholder="I have something new...">
					<TodoList
						todos={inbox}
						toggleResolve={this.toggleResolve}
						removeItem={this.removeItem}
						saveItem={this.saveItem}/>
				</Sheet>
				<Sheet
					title="todo"
					todoType={TODO}
					addItem={this.addItem}
					placeholder="Today I have to do...">
					<TodoList
						todos={todo}
						toggleResolve={this.toggleResolve}
						removeItem={this.removeItem}
						saveItem={this.saveItem}/>
				</Sheet>
				<Sheet
					title="week"
					todoType={WEEK}
					addItem={this.addItem}
					placeholder="This week I have to do...">
					<TodoList
						todos={week}
						toggleResolve={this.toggleResolve}
						removeItem={this.removeItem}
						saveItem={this.saveItem}/>
				</Sheet>
				<Sheet
					title="once"
					todoType={ONCE}
					addItem={this.addItem}
					placeholder="Once I have to do...">
					<TodoList
						todos={once}
						toggleResolve={this.toggleResolve}
						removeItem={this.removeItem}
						saveItem={this.saveItem}/>
				</Sheet>
			</div>
		);
	}
}

export default App;
