import React from 'react';

const AddTodo = ({addTo, addTodo}) => {
	let inputValue = '';
	let ref = null;
	return (
		<div>
			<input
				type="text"
				onInput={() => ref && (inputValue = ref.value)}
				ref={input => ref = input}/>
			<button onClick={() => addTodo(addTo, inputValue)}>add</button>
		</div>
	);
};

export default AddTodo;
