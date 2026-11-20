(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tsdotnet/array-copy'), require('@tsdotnet/array-init'), require('@tsdotnet/integer')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tsdotnet/array-copy', '@tsdotnet/array-init', '@tsdotnet/integer'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.tsdotnet = global.tsdotnet || {}, global.tsdotnet.random = global.tsdotnet.random || {}), global.tsdotnet.arrayCopy, global.tsdotnet.arrayInit, global.tsdotnet.integer));
})(this, (function (exports, arrayCopy, arrayInit, int) { 'use strict';

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

    /*!
     * @author electricessence / https://github.com/electricessence/
     * Licensing: MIT
     */
    function shuffleCopy(source) {
        return shuffle(arrayCopy(source));
    }

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
    var random_default = random;
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

    exports.default = random_default;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=random.js.map
