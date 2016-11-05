import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import todoReducer from './reducers/todo-reducer';
import App from './App';
import {loadFromLocalStorage, saveToLocalStorage} from './lib/persist';
import './index.css';

const store = createStore(todoReducer, loadFromLocalStorage());
store.subscribe(() => {
	saveToLocalStorage(store.getState());
});

window.show = store.getState;

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
