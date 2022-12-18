"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const shuffle_1 = tslib_1.__importDefault(require("./shuffle"));
const array_copy_1 = tslib_1.__importDefault(require("@tsdotnet/array-copy"));
/**
 * Randomizes a copy of the source array.
 * Using Durstenfeld shuffle algorithm.
 * @param source The source array.
 * @returns A randomized copy of the source.
 */
function shuffleCopy(source) {
    return (0, shuffle_1.default)((0, array_copy_1.default)(source));
}
exports.default = shuffleCopy;
//# sourceMappingURL=shuffleCopy.js.map