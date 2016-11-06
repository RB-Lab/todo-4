export const insert = (arr, index, ...newItems) => [
	...arr.slice(0, index),
	...newItems,
	...arr.slice(index)
];

export const replace = (arr, index, ...newItems) => [
	...arr.slice(0, index),
	...newItems,
	...arr.slice(index + newItems.length)
];

export const splice = (arr, start, stop, newItems) => [
	...arr.slice(0, start),
	...newItems,
	...arr.slice(stop)
];
