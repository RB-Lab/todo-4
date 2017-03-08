import React from 'react';
import {DropTarget} from 'react-dnd';
import {itemTypes} from '../constants';
import TodoInput from './todo-input';
import bem from '../lib/bem';
import './sheet.css';

const sheetTarget = {
	drop(props) { // {addItem, type, draggedTodo}
		console.log(props); // addItem(type, draggedTodo)
	}
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	};
}

const Sheet = ({
	title,
	todoType,
	children,
	addItem,
	placeholder,
	connectDropTarget,
	isOver
}) => connectDropTarget(
	<div className={bem('sheet', {hovered: isOver})}>
		<h3>{title}</h3>
		<div className={bem('sheet', 'content')}>
			{children}
		</div>
		<TodoInput
			inputId={todoType}
			className={bem('sheet', 'add-todo')}
			finalize={addItem}
			placeholder={placeholder} />
	</div>
);

Sheet.propTypes = {
	title: React.PropTypes.string.isRequired,
	todoType: React.PropTypes.string.isRequired,
	children: React.PropTypes.element.isRequired,
	addItem: React.PropTypes.func.isRequired,
	placeholder: React.PropTypes.string.isRequired,
	connectDropTarget: React.PropTypes.func.isRequired,
	isOver: React.PropTypes.bool.isRequired
};

export default DropTarget(itemTypes.TODO, sheetTarget, collect)(Sheet);
