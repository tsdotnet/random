/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
import { ArrayLikeWritable } from '@tsdotnet/common-interfaces';
declare function random(): number;
declare namespace random {
    function integer(maxExclusive: number): number;
    function generate(maxExclusive?: number): () => number;
    namespace generate {
        function integers(boundary: number, inclusive?: boolean): () => number;
    }
    function next(boundary: number, inclusive?: boolean): number;
    namespace next {
        function integer(boundary: number, inclusive?: boolean): number;
        function float(boundary?: number): number;
        function inRange(min: number, max: number, inclusive?: boolean): number;
    }
    function integers(count: number, boundary: number, inclusive?: boolean): number[];
    function select<T>(source: ArrayLike<T>, maxCount: number): T[];
    namespace select {
        function one<T>(source: ArrayLike<T>, throwIfEmpty: true): T;
        function one<T>(source: ArrayLike<T>, throwIfEmpty?: boolean): T | undefined;
    }
    function shuffle<T extends ArrayLikeWritable<any>>(target: T): T;
    function shuffleCopy<T>(source: ArrayLike<T>): T[];
}
export default random;
