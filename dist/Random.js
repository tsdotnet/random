"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const integer_1 = tslib_1.__importDefault(require("@tsdotnet/integer"));
const array_init_1 = tslib_1.__importDefault(require("@tsdotnet/array-init"));
const array_copy_1 = tslib_1.__importDefault(require("@tsdotnet/array-copy"));
const shuffle_1 = tslib_1.__importDefault(require("./shuffle"));
const shuffleCopy_1 = tslib_1.__importDefault(require("./shuffleCopy"));
function random() {
    return Math.random();
}
/**
 * This module only acts as a utility API for getting random numbers from Math.random().
 * If you need repeatable seeded random numbers then you'll need a separate utility.
 * Highly recommended: https://github.com/ckknight/random-js which has typings under @types/random-js.
 */
(function (random) {
    /**
     * Returns a random integer from 0 to the maxExclusive.
     * Negative numbers are allowed.
     *
     * @param maxExclusive
     * @returns {number}
     */
    function integer(maxExclusive) {
        return next(maxExclusive);
    }
    random.integer = integer;
    /**
     * Returns a function that generates random floating point numbers up to the maxExclusive value.
     * Useful for generating a random and memoizable set for use with other enumerables.
     * @param maxExclusive
     * @returns {()=>number}
     */
    function generate(maxExclusive = 1) {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        return () => r(maxExclusive);
    }
    random.generate = generate;
    (function (generate) {
        /**
         * Returns a function that generates random integers up to the boundary.
         * Useful for generating a random and memoizable set for use with other enumerables.
         * @param boundary
         * @param inclusive
         * @returns {()=>number}
         */
        function integers(boundary, inclusive) {
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            return () => nr(boundary, inclusive);
        }
        generate.integers = integers;
    })(generate = random.generate || (random.generate = {}));
    /**
     * Returns a random integer from 0 to the boundary.
     * Return value will be less than the boundary unless inclusive is set to true.
     * Negative numbers are allowed.
     *
     * @param boundary
     * @param inclusive
     * @returns {number}
     */
    function next(boundary, inclusive) {
        integer_1.default.assert(boundary, 'boundary');
        return nr(boundary, inclusive);
    }
    random.next = next;
    (function (next) {
        // tslint:disable-next-line:no-shadowed-variable
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
    /**
     * Returns an array of random integers.
     * @param count
     * @param boundary
     * @param inclusive
     * @returns {number[]}
     */
    function integers(count, boundary, inclusive) {
        integer_1.default.assert(count);
        const s = array_init_1.default(count);
        for (let i = 0; i < count; i++) {
            s[i] = nr(boundary, inclusive);
        }
        return s;
    }
    random.integers = integers;
    /**
     * Returns a distinct random set from the source array up to the maxCount or the full length of the array.
     * @param source
     * @param maxCount
     * @returns {any}
     */
    function select(source, maxCount) {
        if (maxCount !== Infinity)
            integer_1.default.assertZeroOrGreater(maxCount);
        switch (maxCount) {
            case 0:
                return [];
            case 1:
                return [select.one(source, true)];
        }
        const result = shuffle_1.default(array_copy_1.default(source));
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
    /**
     * Shuffles an array.
     * @param {T} target
     * @returns {T}
     */
    function shuffle(target) {
        return shuffle_1.default(target);
    }
    random.shuffle = shuffle;
    /**
     * Shuffles a copy of the source array.
     * @param {ArrayLike<T>} source
     * @returns {T[]}
     */
    function shuffleCopy(source) {
        return shuffleCopy_1.default(source);
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