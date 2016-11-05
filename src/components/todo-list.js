import React from 'react';
import Todo from './todo';
import './todo-list.css';

const TodoList = ({todos}) => (
	<ul className="todo-list">
		{todos.map((todo, i) => (
			<Todo key={`todo-${i}`} todo={todo} />
		))}
	</ul>
);

export default TodoList;
