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
 * @param target The target array to shuffle.
 * @returns The shuffled target array.
 */
export default function shuffle<T extends ArrayLikeWritable<any>>(target: T): T;
export {};
