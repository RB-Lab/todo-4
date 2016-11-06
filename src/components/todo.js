import React from 'react';
import {connect} from 'react-redux';
import mdIt from 'markdown-it';
import bem from '../lib/bem';
import './todo.css';

// to add _blank: http://bit.ly/2fr1GAu
const createMarkup = md => ({__html: mdIt({linkify: true}).render(md)});

const Todo = ({todo, toggleResolve, removeItem}) => (
	<li className={bem('todo', {resolved: todo.resolved})}>
		<input
			type="checkbox"
			className={bem('todo', 'toggle-resolve')}
			onChange={() => toggleResolve(todo.id)}
			checked={todo.resolved}/>
		<div
			dangerouslySetInnerHTML={createMarkup(todo.todo)}
			className={bem('todo', 'content')} />
		<div className={bem('todo', 'actions')}>
			<i
				className={`fa fa-pencil ${bem('todo', 'action', {edit: true})}`}/>
			<i
				onClick={() => removeItem(todo.id)}
				className={`fa fa-trash ${bem('todo', 'action', {delete: true})}`}/>
		</div>
	</li>
);

const mapStateToProps = (state) => ({});

import toggleResolve from '../actions/toggle-resolve';
import removeItem from '../actions/remove-item';
const mapDispatchToProps = (dispatch) => ({
	toggleResolve: id => dispatch(toggleResolve(id)),
	removeItem: id => dispatch(removeItem(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
