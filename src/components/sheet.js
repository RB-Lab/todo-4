import React from 'react';
import TodoInput from './todo-input';
import bem from '../lib/bem';
import './sheet.css';

const Sheet = ({title, todoType, children, addItem}) => (
	<div className="sheet">
		<h3>{title}</h3>
		<div className={bem('sheet', 'content')}>
			{children}
		</div>
		<TodoInput
			inputId={todoType}
			className={bem('sheet', 'add-todo')}
			finalize={addItem}/>
	</div>
);

export default Sheet;
