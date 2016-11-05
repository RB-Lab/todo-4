import React from 'react';
import mdIt from 'markdown-it';
import bem from '../lib/bem';
import './todo.css';

const createMarkup = md => ({__html: mdIt({linkify: true}).render(md)});

const Todo = ({todo}) => (
	<li className={bem('todo', {resolved: todo.resolved})}>
		<input type="checkbox" className={bem('todo', 'resolved')} />
		<div
			dangerouslySetInnerHTML={createMarkup(todo.todo)}
			className={bem('todo', 'content')} />
		<div className={bem('todo', 'actions')}>
			<i className={`fa fa-pencil ${bem('todo', 'action', {edit: true})}`}/>
			<i className={`fa fa-trash ${bem('todo', 'action', {delete: true})}`}/>
		</div>
	</li>
);

export default Todo;
