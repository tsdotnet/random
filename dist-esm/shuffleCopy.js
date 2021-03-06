/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
import shuffle from './shuffle';
import arrayCopy from '@tsdotnet/array-copy';
/**
 * Randomizes a copy of the source array.
 * Using Durstenfeld shuffle algorithm.
 * @param source The source array.
 * @returns A randomized copy of the source.
 */
export default function shuffleCopy(source) {
    return shuffle(arrayCopy(source));
}
//# sourceMappingURL=shuffleCopy.js.map