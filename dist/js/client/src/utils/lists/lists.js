"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggle = exports.removeAtIndex = exports.remove = exports.updateAtIndex = exports.update = exports.move = exports.addAtIndex = exports.add = exports.isSelected = void 0;
function isSelected(data, list, compare) {
    return !!list.find(listElement => compare(listElement, data));
}
exports.isSelected = isSelected;
function add(data, list) {
    return [...list, data];
}
exports.add = add;
function addAtIndex(data, list, index) {
    return [...list.slice(0, index), data, ...list.slice(index)];
}
exports.addAtIndex = addAtIndex;
function move(data, list, compare, index) {
    return addAtIndex(data, remove(data, list, compare), index);
}
exports.move = move;
function update(data, list, compare) {
    const index = list.findIndex(element => compare(data, element));
    return updateAtIndex(data, list, index);
}
exports.update = update;
function updateAtIndex(data, list, index) {
    if (!index.toFixed) {
        throw new Error('Index is not a number');
    }
    return addAtIndex(data, removeAtIndex(list, index), index);
}
exports.updateAtIndex = updateAtIndex;
function remove(data, list, compare) {
    return list.filter(listElement => !compare(listElement, data));
}
exports.remove = remove;
function removeAtIndex(list, index) {
    return [...list.slice(0, index), ...list.slice(index + 1)];
}
exports.removeAtIndex = removeAtIndex;
function toggle(data, list, compare) {
    return isSelected(data, list, compare) ? remove(data, list, compare) : add(data, list);
}
exports.toggle = toggle;
