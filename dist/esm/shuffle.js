/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
function shuffle(target) {
    let i = target.length;
    if (i == 0)
        return target;
    while (--i) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = target[i];
        target[i] = target[j];
        target[j] = temp;
    }
    return target;
}

export { shuffle as default };
//# sourceMappingURL=shuffle.js.map
