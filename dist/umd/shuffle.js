/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = shuffle;
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
});
//# sourceMappingURL=shuffle.js.map