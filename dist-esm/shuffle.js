/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 * @param {T} target
 * @returns {T}
 */
export default function shuffle(target) {
    let i = target.length;
    while (--i) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = target[i];
        target[i] = target[j];
        target[j] = temp;
    }
    return target;
}
//# sourceMappingURL=shuffle.js.map