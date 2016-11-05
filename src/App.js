import React from 'react';
import { connect } from 'react-redux'
import Sheet from './components/sheet';
import './App.css';

const App = ({addTo, showAddTodo, addTodo}) => {
	return (
		<div className="App">
			<Sheet
				title="inbox"
				addTo="inbox"
				showForm={addTo === 'inbox'}
				showAddTodo={showAddTodo('inbox')}
				addTodo={addTodo}>
			</Sheet>
			<Sheet
				title="todo"
				addTo="todo"
				showForm={addTo === 'todo'}
				showAddTodo={showAddTodo('todo')}
				addTodo={addTodo}>
			</Sheet>
			<Sheet
				title="week"
				addTo="week"
				showForm={addTo === 'week'}
				showAddTodo={showAddTodo('week')}
				addTodo={addTodo}>
			</Sheet>
			<Sheet
				title="once"
				addTo="once"
				showForm={addTo === 'once'}
				showAddTodo={showAddTodo('once')}
				addTodo={addTodo}>
			</Sheet>
		</div>
	);
}

const mapStateToProps = state => ({
	addTo: state.addTo
});

import showAddTo from './actions/show-add-to';
import addTodo from './actions/add-todo';
const mapDispatchToProps = dispatch => ({
	showAddTodo: addTo => () => dispatch(showAddTo(addTo)),
	addTodo: (addTo, todo) => dispatch(addTodo(addTo, todo))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
