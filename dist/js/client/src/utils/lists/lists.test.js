"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lists_1 = require("./lists");
const initialArray = ['lorem', 'ipsum', 'dolor'];
const compare = (a, b) => a === b;
describe('Properly calculates output arrays', () => {
    it('Adds', () => {
        expect((0, lists_1.add)('sit', initialArray)).toMatchSnapshot();
    });
    it('Adds at index', () => {
        expect((0, lists_1.addAtIndex)('sit', initialArray, 2)).toMatchSnapshot();
    });
    it('Updates', () => {
        expect((0, lists_1.update)({
            name: 'amet',
            value: 32
        }, initialArray.map((el, index) => ({
            name: el,
            value: index
        })), (a, b) => a.name === b.name)).toMatchSnapshot();
    });
    it('Updates at index', () => {
        expect((0, lists_1.updateAtIndex)('amet', initialArray, 1)).toMatchSnapshot();
    });
    it('Removes', () => {
        expect((0, lists_1.remove)('ipsum', initialArray, compare)).toMatchSnapshot();
    });
    it('Removes at index', () => {
        expect((0, lists_1.removeAtIndex)(initialArray, 1)).toMatchSnapshot();
    });
    it('Matches', () => {
        expect((0, lists_1.isSelected)('lorem', initialArray, compare)).toBe(true);
        expect((0, lists_1.isSelected)('sit', initialArray, compare)).toBe(false);
    });
    it('Toggles', () => {
        expect((0, lists_1.toggle)('lorem', initialArray, compare)).toMatchSnapshot();
        expect((0, lists_1.toggle)('sit', initialArray, compare)).toMatchSnapshot();
    });
    it('Moves', () => {
        expect((0, lists_1.move)('lorem', initialArray, compare, 1)).toMatchSnapshot();
    });
});
