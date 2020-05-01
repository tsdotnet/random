"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 * @param target The target array to shuffle.
 * @returns The shuffled target array.
 */
function shuffle(target) {
    let i = target.length;
    while (--i) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = target[i];
        target[i] = target[j];
        target[j] = temp;
    }
    return target;
}
exports.default = shuffle;
//# sourceMappingURL=shuffle.js.map