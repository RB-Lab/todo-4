import React from 'react';
import { connect } from 'react-redux'
import Sheet from './components/sheet';
import TodoList from './components/todo-list';
import {INBOX, TODO, WEEK, ONCE} from './constants';
import './App.css';

const App = ({addTo, addItem, inbox, todo, week, once}) => {
	return (
		<div className="App">
			<Sheet
				title="inbox"
				todoType={INBOX}
				addItem={addItem}
				placeholder="I have something new...">
				<TodoList todos={inbox}/>
			</Sheet>
			<Sheet
				title="todo"
				todoType={TODO}
				addItem={addItem}
				placeholder="Today I have to do...">
				<TodoList todos={todo}/>
			</Sheet>
			<Sheet
				title="week"
				todoType={WEEK}
				addItem={addItem}
				placeholder="This week I have to do...">
				<TodoList todos={week}/>
			</Sheet>
			<Sheet
				title="once"
				todoType={ONCE}
				addItem={addItem}
				placeholder="Once I have to do...">
				<TodoList todos={once}/>
			</Sheet>
		</div>
	);
}

const mapStateToProps = state => ({
	inbox: state.todos.filter(todo => todo.type === INBOX),
	todo: state.todos.filter(todo => todo.type === TODO),
	week: state.todos.filter(todo => todo.type === WEEK),
	once: state.todos.filter(todo => todo.type === ONCE)
});

import addItem from './actions/add-item';
const mapDispatchToProps = dispatch => ({
	addItem: (type, value) => dispatch(addItem(type, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
