import React from 'react';
import {connect} from 'react-redux';

const TodoInput = ({inputId, finalize, setCurrentInput, currentInput, className, autofocus}) => {
	let ref = null;
	return (
		<input
			className={className}
			type="text"
			value={currentInput}
			onChange={() => setCurrentInput(ref.value)}
			onKeyDown={e => e.keyCode === 13 && finalize(inputId, ref.value)}
			ref={input => {ref = input; if(autofocus) input && input.focus()}}/>
	);
};

const mapStateToProps = (state, {inputId}) => ({
	currentInput: state.currentInputs[inputId] || ''
});

import changeCurrentInput from '../actions/change-current-input';
const mapDispatchToProps = (dispatch, {inputId}) => ({
	setCurrentInput: value => dispatch(changeCurrentInput(inputId, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);
