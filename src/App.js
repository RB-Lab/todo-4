import React, {Component} from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import {loadFromLocalStorage, saveToLocalStorage} from './lib/persist';
import Sheet from './components/sheet';
import TodoList from './components/todo-list';
import {INBOX, TODO, WEEK, ONCE} from './constants';
import TodosModel, {getTodosByType} from './model/todos';
import './App.css';

class App extends Component {
	constructor() {
		super();
		const oldTodos = loadFromLocalStorage() || [];
		this.model = new TodosModel(oldTodos, ({todos}) => {
			saveToLocalStorage(todos);
			this.setState({todos});
		});
		this.state = {todos: oldTodos};
	}

	render() {
		const inbox = getTodosByType(this.state.todos, INBOX);
		const todoNow = getTodosByType(this.state.todos, TODO);
		const week = getTodosByType(this.state.todos, WEEK);
		const once = getTodosByType(this.state.todos, ONCE);

		return (
			<div className="App">
				<Sheet
					title="inbox"
					todoType={INBOX}
					addItem={this.model.addItem}
					changeType={this.model.changeType}
					placeholder="I have something new...">
					<TodoList
						todos={inbox}
						toggleResolve={this.model.toggleResolve}
						removeItem={this.model.removeItem}
						saveItem={this.model.saveItem} />
				</Sheet>
				<Sheet
					title="todo"
					todoType={TODO}
					addItem={this.model.addItem}
					changeType={this.model.changeType}
					placeholder="Today I have to do...">
					<TodoList
						todos={todoNow}
						toggleResolve={this.model.toggleResolve}
						removeItem={this.model.removeItem}
						saveItem={this.model.saveItem} />
				</Sheet>
				<Sheet
					title="week"
					todoType={WEEK}
					addItem={this.model.addItem}
					changeType={this.model.changeType}
					placeholder="This week I have to do...">
					<TodoList
						todos={week}
						toggleResolve={this.model.toggleResolve}
						removeItem={this.model.removeItem}
						saveItem={this.model.saveItem} />
				</Sheet>
				<Sheet
					title="at some point"
					todoType={ONCE}
					addItem={this.model.addItem}
					changeType={this.model.changeType}
					placeholder="Once I have to do...">
					<TodoList
						todos={once}
						toggleResolve={this.model.toggleResolve}
						removeItem={this.model.removeItem}
						saveItem={this.model.saveItem} />
				</Sheet>
			</div>
		);
	}
}

export default DragDropContext(HTML5Backend)(App);
