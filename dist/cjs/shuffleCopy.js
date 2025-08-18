"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = shuffleCopy;
const tslib_1 = require("tslib");
const shuffle_1 = tslib_1.__importDefault(require("./shuffle"));
const array_copy_1 = tslib_1.__importDefault(require("@tsdotnet/array-copy"));
function shuffleCopy(source) {
    return (0, shuffle_1.default)((0, array_copy_1.default)(source));
}
//# sourceMappingURL=shuffleCopy.js.map