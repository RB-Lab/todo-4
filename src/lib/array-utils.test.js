import {insert, replace, splice} from './array-utils';

const arr = [1, 2, 3, 4, 5, 6, 7];

describe('testing "insert"', () => {
	it('should not mutate array', () => {
		const newArr = insert(arr, 2, 42);
		expect(arr).toBe(arr);
		expect(arr).not.toBe(newArr);
		expect(arr).toEqual([1, 2, 3, 4, 5, 6, 7]);
	});
	it('should insert to array', () => {
		expect(insert(arr, 2, 42)).toEqual([1, 2, 42, 3, 4, 5, 6, 7]);
	});
	it('should insert to array multiple values', () => {
		expect(insert(arr, 2, 42, 24, 12)).toEqual([1, 2, 42, 24, 12, 3, 4, 5, 6, 7]);
	});
});


describe('testing "replace"', () => {
	it('should not mutate array', () => {
		const newArr = replace(arr, 2, 42);
		expect(arr).toBe(arr);
		expect(arr).not.toBe(newArr);
		expect(arr).toEqual([1, 2, 3, 4, 5, 6, 7]);
	});
	it('should replace a value', () => {
		expect(replace(arr, 2, 42)).toEqual([1, 2, 42, 4, 5, 6, 7]);
	});
	it('should replace multiple values', () => {
		expect(replace(arr, 2, 42, 24, 12)).toEqual([1, 2, 42, 24, 12, 6, 7]);
	});
});

// TODO test splice
