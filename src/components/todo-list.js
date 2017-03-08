import React from 'react';
import Todo from './todo';
import './todo-list.css';

const TodoList = (props) => (
	<ul className="todo-list">
		{props.todos.map((todo) => (
			<Todo key={todo.id} todo={todo} {...props} />
		))}
	</ul>
);

export default TodoList;
