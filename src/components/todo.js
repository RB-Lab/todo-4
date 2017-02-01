import React, {Component} from 'react';
import mdIt from 'markdown-it';
import bem from '../lib/bem';
import TodoInput from './todo-input';
import './todo.css';

// to add _blank: http://bit.ly/2fr1GAu
const createMarkup = md => ({__html: mdIt({linkify: true}).render(md)});

class Todo extends Component {
	constructor(){
		super();
		this.state = {edit: false};
		this.toggleEdit = () => {
			this.setState({edit: !this.state.edit})
		};
		this.saveItem = (todoId, newValue) => {
			this.props.saveItem(todoId, newValue);
			this.setState({edit: false});
		};
	}
	render(){
		const {
			todo,
			toggleResolve,
			removeItem
		} = this.props;

		return (
			<li className={bem('todo', {resolved: todo.resolved})}>
				<input
					type="checkbox"
					className={bem('todo', 'toggle-resolve')}
					onChange={() => toggleResolve(todo.id)}
					checked={todo.resolved}/>
				{this.state.edit ?
					<TodoInput
						inputId={todo.id}
						finalize={this.saveItem}
						value={todo.todo}
						autofocus
						className={bem('todo', 'edit')}/> :
					<div
						dangerouslySetInnerHTML={createMarkup(todo.todo)}
						className={bem('todo', 'content')} />
				}
				<div className={bem('todo', 'actions')}>
					<i
						onClick={this.toggleEdit}
						className={`fa fa-pencil ${bem('todo', 'action', {edit: true})}`}/>
					<i
						onClick={() => removeItem(todo.id)}
						className={`fa fa-trash ${bem('todo', 'action', {delete: true})}`}/>
				</div>
			</li>
		)
	}
}

export default Todo;
