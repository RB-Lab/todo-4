import React from 'react';
import {connect} from 'react-redux';
import './add-todo.css';

const AddTodo = ({addTodo, setCurrentInput, currentInput}) => {
	let ref = null;
	return (
		<input
			className="add-todo"
			type="text"
			value={currentInput}
			onInput={() => setCurrentInput(ref.value)}
			onKeyDown={e => e.keyCode === 13 && addTodo(ref.value)}
			ref={input => ref = input}/>
	);
};

const mapStateToProps = (state, props) => ({
	currentInput: state.currentInputs[props.todoType]
});

import addTodo from '../actions/add-todo';
import todoInput from '../actions/todo-input';
const mapDispatchToProps = (dispatch, props) => ({
	addTodo: value => dispatch(addTodo(props.todoType, value)),
	setCurrentInput: value => dispatch(todoInput(props.todoType, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
