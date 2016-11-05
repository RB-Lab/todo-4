import React from 'react';
import { connect } from 'react-redux'
import Sheet from './components/sheet';
import TodoList from './components/todo-list';
import {INBOX, TODO, WEEK, ONCE} from './constants';
import './App.css';

const App = ({addTo, addTodo, inbox, todo, week, once}) => {
	return (
		<div className="App">
			<Sheet title="inbox" todoType={INBOX}>
				<TodoList todos={inbox}/>
			</Sheet>
			<Sheet title="todo" todoType={TODO}>
				<TodoList todos={todo}/>
			</Sheet>
			<Sheet title="week" todoType={WEEK}>
				<TodoList todos={week}/>
			</Sheet>
			<Sheet title="once" todoType={ONCE}>
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

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
