import React from 'react';
import Todo from './todo';

const TodoList = ({todos}) => (
	<ul>
		{todos.map((todo, i) => (
			<Todo key={`todo-${i}`} todo={todo} />
		))}
	</ul>
);

export default TodoList;
