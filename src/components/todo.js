import React from 'react';
import './todo.css';

const Todo = ({todo}) => (
	<li className="todo">{todo.todo}</li>
);

export default Todo;
