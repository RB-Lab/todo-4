const ITEM_NAME = 'app-state';

export function loadFromLocalStorage() {
	try {
		const serializedState = window.localStorage.getItem(ITEM_NAME);
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState)
	} catch (ignore) {
		return undefined;
	}
}

export function saveToLocalStorage(state){
	try {
		const serializedState = JSON.stringify(state);
		window.localStorage.setItem(ITEM_NAME, serializedState);
	} catch (ingore){}
}
