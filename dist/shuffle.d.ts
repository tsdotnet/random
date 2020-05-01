/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
interface ArrayLikeWritable<T> {
    length: number;
    [n: number]: T;
}
/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 * @param {T} target
 * @returns {T}
 */
export default function shuffle<T extends ArrayLikeWritable<any>>(target: T): T;
export {};
