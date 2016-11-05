import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoReducer from './reducers/todo-reducer';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const store = createStore(todoReducer);
window.show = store.getState;

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
