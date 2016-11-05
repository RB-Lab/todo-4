import React from 'react';
import AddTodo from './add-todo';
import './sheet.css';

const Sheet = ({title, todoType, children}) => (
	<div className="sheet">
		<h3>{title}</h3>
		<div className="sheet__content">
			{children}
		</div>
		<AddTodo todoType={todoType}/>
	</div>
);

export default Sheet;
