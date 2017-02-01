import React from 'react';
import Todo from './todo';
import './todo-list.css';

const TodoList = (props) => (
	<ul className="todo-list">
		{props.todos.map((todo, i) => (
			<Todo key={`todo-${i}`} todo={todo} {...props}/>
		))}
	</ul>
);

export default TodoList;
