/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

import {ArrayLikeWritable} from '@tsdotnet/common-interfaces';

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 * @param target The target array to shuffle.
 * @returns The shuffled target array.
 */
export default function shuffle<T extends ArrayLikeWritable<any>> (target: T): T {
	let i = target.length;
	while(--i)
	{
		const j = Math.floor(Math.random()*(i + 1));
		const temp = target[i];
		target[i] = target[j];
		target[j] = temp;
	}
	return target;
}
