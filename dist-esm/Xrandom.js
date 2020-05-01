/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
import int from '@tsdotnet/integer';
import arrayInit from '@tsdotnet/array-init';
import arrayCopy from '@tsdotnet/array-copy';
import arrayShuffle from './shuffle';
import arrayShuffleCopy from './shuffleCopy';
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
        int.assert(boundary, 'boundary');
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
            int.assert(min, 'min');
            int.assert(max, 'max');
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
        int.assert(count);
        const s = arrayInit(count);
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
            int.assertZeroOrGreater(maxCount);
        switch (maxCount) {
            case 0:
                return [];
            case 1:
                return [select.one(source, true)];
        }
        const result = arrayShuffle(arrayCopy(source));
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
        return arrayShuffle(target);
    }
    random.shuffle = shuffle;
    /**
     * Shuffles a copy of the source array.
     * @param {ArrayLike<T>} source
     * @returns {T[]}
     */
    function shuffleCopy(source) {
        return arrayShuffleCopy(source);
    }
    random.shuffleCopy = shuffleCopy;
})(random || (random = {}));
export default random;
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
//# sourceMappingURL=Xrandom.js.map