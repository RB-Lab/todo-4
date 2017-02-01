import React, {Component} from 'react';

class TodoInput extends Component {
	constructor(){
		super();
		this.state = {value: null};
		this.setValue = (value) => {
			this.setState({value});
		};
		this.finalize = () => {
			this.props.finalize(this.props.inputId, this.state.value);
			this.setValue(null);
		}
	}
	render(){
		const {
			className,
			placeholder,
			inputId,
			autofocus,
			value
		} = this.props;
		let ref = null;
		return (
			<input
				className={className}
				type="text"
				value={(this.state.value === null ? value : this.state.value) || ''}
				placeholder={placeholder}
				onChange={() => this.setValue(ref.value)}
				onKeyDown={e => e.keyCode === 13 && this.finalize(inputId, ref.value)}
				ref={input => {ref = input; if(autofocus) input && input.focus()}}/>
		)
	}
}

export default TodoInput;
