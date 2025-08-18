import arrayCopy from '@tsdotnet/array-copy';
import arrayInit from '@tsdotnet/array-init';
import int from '@tsdotnet/integer';
import shuffle from './shuffle.js';
import shuffleCopy from './shuffleCopy.js';

/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
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
        int.assert(boundary, 'boundary');
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
    function integers(count, boundary, inclusive) {
        int.assert(count);
        const s = arrayInit(count);
        for (let i = 0; i < count; i++) {
            s[i] = nr(boundary, inclusive);
        }
        return s;
    }
    random.integers = integers;
    function select(source, maxCount) {
        if (maxCount !== Infinity)
            int.assertZeroOrGreater(maxCount);
        switch (maxCount) {
            case 0:
                return [];
            case 1:
                return [select.one(source, true)];
        }
        const result = shuffle(arrayCopy(source));
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
    function shuffle$1(target) {
        return shuffle(target);
    }
    random.shuffle = shuffle$1;
    function shuffleCopy$1(source) {
        return shuffleCopy(source);
    }
    random.shuffleCopy = shuffleCopy$1;
})(random || (random = {}));
var random$1 = random;
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

export { random$1 as default };
//# sourceMappingURL=random.js.map
