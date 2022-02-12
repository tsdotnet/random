/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

import {ArrayLikeWritable} from '@tsdotnet/common-interfaces';
import arrayCopy from '@tsdotnet/array-copy';
import arrayInit from '@tsdotnet/array-init';
import int from '@tsdotnet/integer';
import arrayShuffle from './shuffle';
import arrayShuffleCopy from './shuffleCopy';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */


function random (): number
{
	return Math.random();
}

/**
 * This module only acts as a utility API for getting random numbers from Math.random().
 * If you need repeatable seeded random numbers then you'll need a separate utility.
 * Highly recommended: https://github.com/ckknight/random-js which has typings under @types/random-js.
 */
namespace random
{
	/**
	 * Returns a random integer from 0 to the maxExclusive.
	 * Negative numbers are allowed.
	 *
	 * @param maxExclusive
	 * @returns {number}
	 */
	export function integer (maxExclusive: number): number
	{
		return next(maxExclusive);
	}

	/**
	 * Returns a function that generates random floating point numbers up to the maxExclusive value.
	 * Useful for generating a random and memoizable set for use with other enumerables.
	 * @param maxExclusive
	 * @returns {()=>number}
	 */
	export function generate (maxExclusive: number = 1): () => number
	{
		return () => r(maxExclusive);
	}

	export namespace generate
	{
		/**
		 * Returns a function that generates random integers up to the boundary.
		 * Useful for generating a random and memoizable set for use with other enumerables.
		 * @param boundary
		 * @param inclusive
		 * @returns {()=>number}
		 */
		export function integers (boundary: number, inclusive?: boolean): () => number
		{
			return () => nr(boundary, inclusive);
		}
	}

	/**
	 * Returns a random integer from 0 to the boundary.
	 * Return value will be less than the boundary unless inclusive is set to true.
	 * Negative numbers are allowed.
	 *
	 * @param boundary
	 * @param inclusive
	 * @returns {number}
	 */
	export function next (boundary: number, inclusive?: boolean): number
	{
		int.assert(boundary, 'boundary');
		return nr(boundary, inclusive);
	}

	export namespace next
	{
		// tslint:disable-next-line:no-shadowed-variable
		export function integer (boundary: number, inclusive?: boolean): number
		{
			return random.next(boundary, inclusive);
		}

		export function float (boundary: number = Number.MAX_VALUE): number
		{
			if(isNaN(boundary)) throw new Error('\'boundary\' is not a number.');
			return Math.random()*boundary;
		}

		export function inRange (min: number, max: number, inclusive?: boolean): number
		{
			int.assert(min, 'min');
			int.assert(max, 'max');
			let range = max - min;
			if(range===0) return min;
			if(inclusive) range += range/Math.abs(range);
			return min + r(range);
		}
	}

	/**
	 * Returns an array of random integers.
	 * @param count
	 * @param boundary
	 * @param inclusive
	 * @returns {number[]}
	 */
	export function integers (count: number, boundary: number, inclusive?: boolean): number[]
	{
		int.assert(count);
		const s = arrayInit<number>(count);
		for(let i = 0; i<count; i++)
		{
			s[i] = nr(boundary, inclusive);
		}
		return s;
	}

	/**
	 * Returns a distinct random set from the source array up to the maxCount or the full length of the array.
	 * @param source
	 * @param maxCount
	 * @returns {any}
	 */
	export function select<T> (source: ArrayLike<T>, maxCount: number): T[]
	{
		if(maxCount!==Infinity) int.assertZeroOrGreater(maxCount);
		switch(maxCount)
		{
			case 0:
				return [];
			case 1:
				return [select.one(source, true)];
		}

		const result = arrayShuffle(arrayCopy(source));
		if(maxCount<result.length) result.length = maxCount;
		return result;
	}

	export namespace select
	{
		/**
		 * Returns random value from an array.
		 * @param source
		 * @param throwIfEmpty
		 */
		export function one<T> (source: ArrayLike<T>, throwIfEmpty: true): T;
		export function one<T> (source: ArrayLike<T>, throwIfEmpty?: boolean): T | undefined;
		export function one<T> (source: ArrayLike<T>, throwIfEmpty?: boolean): T | undefined
		{
			if(source && source.length) return source[r(source.length)];

			if(throwIfEmpty) throw new Error('Cannot select from an empty set.');
		}
	}

	/**
	 * Shuffles an array.
	 * @param {T} target
	 * @returns {T}
	 */
	export function shuffle<T extends ArrayLikeWritable<any>> (target: T): T
	{
		return arrayShuffle(target);
	}

	/**
	 * Shuffles a copy of the source array.
	 * @param {ArrayLike<T>} source
	 * @returns {T[]}
	 */
	export function shuffleCopy<T> (source: ArrayLike<T>): T[]
	{
		return arrayShuffleCopy(source);
	}
}

export default random;

function r (maxExclusive: number = 1): number
{
	return Math.floor(Math.random()*maxExclusive);
}

function nr (boundary: number, inclusive?: boolean): number
{
	const a = Math.abs(boundary);
	if(a===0 || (a===1 && !inclusive)) return 0;
	if(inclusive) boundary += boundary/a;
	return r(boundary);
}
