import React, {Component} from 'react';
import {DragSource} from 'react-dnd';
import mdIt from 'markdown-it';
import {itemTypes} from '../constants';
import bem from '../lib/bem';
import TodoInput from './todo-input';
import './todo.css';

// to add _blank: http://bit.ly/2fr1GAu
const createMarkup = (md) => ({__html: mdIt({linkify: true}).render(md)});

const todoSource = {
	beginDrag(props) {
		return {
			draggedTodo: props.todo
		};
	}
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
}


class Todo extends Component {
	constructor() {
		super();
		this.state = {edit: false};
		this.toggleEdit = () => {
			this.setState({edit: !this.state.edit});
		};
		this.saveItem = (todoId, newValue) => {
			this.props.saveItem(todoId, newValue);
			this.setState({edit: false});
		};
	}
	render() {
		const {
			todo,
			toggleResolve,
			removeItem,
			isDragging,
			connectDragSource
		} = this.props;

		return connectDragSource(
			<li className={bem('todo', {resolved: todo.resolved, 'is-dragging': isDragging})}>
				<input
					type="checkbox"
					className={bem('todo', 'toggle-resolve')}
					onChange={() => toggleResolve(todo.id)}
					checked={todo.resolved} />
				{this.state.edit ?
					<TodoInput
						inputId={todo.id}
						finalize={this.saveItem}
						value={todo.todo}
						autofocus
						className={bem('todo', 'edit')} /> :
					<div
						dangerouslySetInnerHTML={createMarkup(todo.todo)}
						className={bem('todo', 'content')} />
				}
				<div className={bem('todo', 'actions')}>
					<i
						onClick={this.toggleEdit}
						className={`fa fa-pencil ${bem('todo', 'action', {edit: true})}`} />
					<i
						onClick={() => removeItem(todo.id)}
						className={`fa fa-trash ${bem('todo', 'action', {delete: true})}`} />
				</div>
			</li>
		);
	}
}

Todo.propTypes = {
	todo: React.PropTypes.shape({
		id: React.PropTypes.number,
		todo: React.PropTypes.string
	}).isRequired,
	toggleResolve: React.PropTypes.func.isRequired,
	removeItem: React.PropTypes.func.isRequired,
	saveItem: React.PropTypes.func.isRequired,
	isDragging: React.PropTypes.bool.isRequired,
	connectDragSource: React.PropTypes.func.isRequired
};

export default DragSource(itemTypes.TODO, todoSource, collect)(Todo);
