import React from 'react';
import AddTodo from './add-todo';
import './sheet.css';

const Sheet = ({title, todoType, showAddTodo, addTodo, children}) => (
	<div className="sheet">
		<h3>{title}</h3>
		<div className="sheet__show-add" onClick={showAddTodo}>+</div>
		<div className="sheet__content">
			{children}
		</div>
		<AddTodo todoType={todoType} addTodo={addTodo} />
	</div>
);

export default Sheet;
