import React from 'react';
import {connect} from 'react-redux';
import mdIt from 'markdown-it';
import bem from '../lib/bem';
import './todo.css';

// to add _blank: http://bit.ly/2fr1GAu
const createMarkup = md => ({__html: mdIt({linkify: true}).render(md)});

const Todo = ({todo, resolveTodo}) => (
	<li className={bem('todo', {resolved: todo.resolved})}>
		<input
			type="checkbox"
			className={bem('todo', 'toggle-resolve')}
			onChange={() => resolveTodo(todo.id)}
			checked={todo.resolved}/>
		<div
			dangerouslySetInnerHTML={createMarkup(todo.todo)}
			className={bem('todo', 'content')} />
		<div className={bem('todo', 'actions')}>
			<i className={`fa fa-pencil ${bem('todo', 'action', {edit: true})}`}/>
			<i className={`fa fa-trash ${bem('todo', 'action', {delete: true})}`}/>
		</div>
	</li>
);

const mapStateToProps = (state) => ({

});

import resolveTodo from '../actions/resolve-todo';
const mapDispatchToProps = (dispatch) => ({
	resolveTodo: id => dispatch(resolveTodo(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
