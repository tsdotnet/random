"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const array_copy_1 = tslib_1.__importDefault(require("@tsdotnet/array-copy"));
const array_init_1 = tslib_1.__importDefault(require("@tsdotnet/array-init"));
const integer_1 = tslib_1.__importDefault(require("@tsdotnet/integer"));
const shuffle_1 = tslib_1.__importDefault(require("./shuffle"));
const shuffleCopy_1 = tslib_1.__importDefault(require("./shuffleCopy"));
function random() {
    return Math.random();
}
(function (random) {
    function integer(maxExclusive) {
        return next(maxExclusive);
    }
    random.integer = integer;
    function generate(maxExclusive = 1) {
        return () => r(maxExclusive);
    }
    random.generate = generate;
    (function (generate) {
        function integers(boundary, inclusive) {
            return () => nr(boundary, inclusive);
        }
        generate.integers = integers;
    })(generate = random.generate || (random.generate = {}));
    function next(boundary, inclusive) {
        integer_1.default.assert(boundary, 'boundary');
        return nr(boundary, inclusive);
    }
    random.next = next;
    (function (next) {
        function integer(boundary, inclusive) {
            return random.next(boundary, inclusive);
        }
        next.integer = integer;
        function float(boundary = Number.MAX_VALUE) {
            if (isNaN(boundary))
                throw new Error('\'boundary\' is not a number.');
            return Math.random() * boundary;
        }
        next.float = float;
        function inRange(min, max, inclusive) {
            integer_1.default.assert(min, 'min');
            integer_1.default.assert(max, 'max');
            let range = max - min;
            if (range === 0)
                return min;
            if (inclusive)
                range += range / Math.abs(range);
            return min + r(range);
        }
        next.inRange = inRange;
    })(next = random.next || (random.next = {}));
    function integers(count, boundary, inclusive) {
        integer_1.default.assert(count);
        const s = (0, array_init_1.default)(count);
        for (let i = 0; i < count; i++) {
            s[i] = nr(boundary, inclusive);
        }
        return s;
    }
    random.integers = integers;
    function select(source, maxCount) {
        if (maxCount !== Infinity)
            integer_1.default.assertZeroOrGreater(maxCount);
        switch (maxCount) {
            case 0:
                return [];
            case 1:
                return [select.one(source, true)];
        }
        const result = (0, shuffle_1.default)((0, array_copy_1.default)(source));
        if (maxCount < result.length)
            result.length = maxCount;
        return result;
    }
    random.select = select;
    (function (select) {
        function one(source, throwIfEmpty) {
            if (source && source.length)
                return source[r(source.length)];
            if (throwIfEmpty)
                throw new Error('Cannot select from an empty set.');
        }
        select.one = one;
    })(select = random.select || (random.select = {}));
    function shuffle(target) {
        return (0, shuffle_1.default)(target);
    }
    random.shuffle = shuffle;
    function shuffleCopy(source) {
        return (0, shuffleCopy_1.default)(source);
    }
    random.shuffleCopy = shuffleCopy;
})(random || (random = {}));
exports.default = random;
function r(maxExclusive = 1) {
    return Math.floor(Math.random() * maxExclusive);
}
function nr(boundary, inclusive) {
    const a = Math.abs(boundary);
    if (a === 0 || (a === 1 && !inclusive))
        return 0;
    if (inclusive)
        boundary += boundary / a;
    return r(boundary);
}
//# sourceMappingURL=random.js.map