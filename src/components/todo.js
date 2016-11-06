import React from 'react';
import {connect} from 'react-redux';
import mdIt from 'markdown-it';
import bem from '../lib/bem';
import TodoInput from './todo-input';
import './todo.css';

// to add _blank: http://bit.ly/2fr1GAu
const createMarkup = md => ({__html: mdIt({linkify: true}).render(md)});

const Todo = ({todo, toggleResolve, removeItem, edit, startEdit, stopEdit, saveItem}) => (
	<li className={bem('todo', {resolved: todo.resolved})}>
		<input
			type="checkbox"
			className={bem('todo', 'toggle-resolve')}
			onChange={() => toggleResolve(todo.id)}
			checked={todo.resolved}/>
		{edit ?
			<TodoInput
				inputId={todo.id}
				finalize={saveItem}
				className={bem('todo', 'edit')}/> :
			<div
				dangerouslySetInnerHTML={createMarkup(todo.todo)}
				className={bem('todo', 'content')} />
		}
		<div className={bem('todo', 'actions')}>
			<i
				onClick={() => edit ? stopEdit(todo.id): startEdit(todo.id)}
				className={`fa fa-pencil ${bem('todo', 'action', {edit: true})}`}/>
			<i
				onClick={() => removeItem(todo.id)}
				className={`fa fa-trash ${bem('todo', 'action', {delete: true})}`}/>
		</div>
	</li>
);

const mapStateToProps = (state, {todo}) => ({
	edit: Boolean(state.currentInputs[todo.id])
});

import toggleResolve from '../actions/toggle-resolve';
import removeItem from '../actions/remove-item';
import startEdit from '../actions/start-edit';
import stopEdit from '../actions/stop-edit';
import saveItem from '../actions/save-item';
const mapDispatchToProps = (dispatch) => ({
	toggleResolve: id => dispatch(toggleResolve(id)),
	removeItem: id => dispatch(removeItem(id)),
	startEdit: id => dispatch(startEdit(id)),
	stopEdit: id => dispatch(stopEdit(id)),
	saveItem: (id, value) => dispatch(saveItem(id, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
