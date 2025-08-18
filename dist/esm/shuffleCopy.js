import shuffle from './shuffle.js';
import arrayCopy from '@tsdotnet/array-copy';

/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
function shuffleCopy(source) {
    return shuffle(arrayCopy(source));
}

export { shuffleCopy as default };
//# sourceMappingURL=shuffleCopy.js.map
