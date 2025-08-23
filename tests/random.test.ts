import { describe, it, expect } from 'vitest';
import random from '../src/random';

describe('random', () => {
	it('should return number between 0 and 1', () => {
		const result = random();
		expect(typeof result).toBe('number');
		expect(result).toBeGreaterThanOrEqual(0);
		expect(result).toBeLessThan(1);
	});

	describe('integer', () => {
		it('should generate integers', () => {
			const result = random.integer(10);
			expect(Number.isInteger(result)).toBe(true);
			expect(result).toBeGreaterThanOrEqual(0);
			expect(result).toBeLessThan(10);
		});

		it('should handle negative boundaries', () => {
			const result = random.integer(-5);
			expect(Number.isInteger(result)).toBe(true);
			expect(result).toBeGreaterThanOrEqual(-5);
			expect(result).toBeLessThan(0);
		});

		it('should return 0 for boundary 0', () => {
			const result = random.integer(0);
			expect(result).toBe(0);
		});

		it('should return 0 for boundary 1', () => {
			const result = random.integer(1);
			expect(result).toBe(0);
		});
	});

	describe('next', () => {
		it('should return integers within range', () => {
			const result = random.next(15);
			expect(Number.isInteger(result)).toBe(true);
			expect(result).toBeGreaterThanOrEqual(0);
			expect(result).toBeLessThan(15);
		});

		it('should handle boundary cases', () => {
			expect(random.next(0)).toBe(0);
			expect(random.next(1)).toBe(0);
		});

		it('should throw for non-integer boundary', () => {
			expect(() => random.next(3.14)).toThrow();
		});

		describe('integer', () => {
			it('should work same as next', () => {
				const result = random.next.integer(10);
				expect(Number.isInteger(result)).toBe(true);
				expect(result).toBeGreaterThanOrEqual(0);
				expect(result).toBeLessThan(10);
			});

			it('should handle inclusive flag', () => {
				const result = random.next.integer(5, true);
				expect(result).toBeGreaterThanOrEqual(0);
				expect(result).toBeLessThanOrEqual(5);
			});
		});

		describe('float', () => {
			it('should return float within range', () => {
				const result = random.next.float(10.5);
				expect(typeof result).toBe('number');
				expect(result).toBeGreaterThanOrEqual(0);
				expect(result).toBeLessThan(10.5);
			});

			it('should use MAX_VALUE by default', () => {
				const result = random.next.float();
				expect(typeof result).toBe('number');
				expect(result).toBeGreaterThanOrEqual(0);
				expect(result).toBeLessThan(Number.MAX_VALUE);
			});

			it('should throw for NaN boundary', () => {
				expect(() => random.next.float(NaN)).toThrow('\'boundary\' is not a number.');
			});
		});

		describe('inRange', () => {
			it('should return integers in range', () => {
				const result = random.next.inRange(5, 15);
				expect(Number.isInteger(result)).toBe(true);
				expect(result).toBeGreaterThanOrEqual(5);
				expect(result).toBeLessThan(15);
			});

			it('should handle equal min/max', () => {
				const result = random.next.inRange(5, 5);
				expect(result).toBe(5);
			});

			it('should handle inclusive ranges', () => {
				const result = random.next.inRange(5, 10, true);
				expect(result).toBeGreaterThanOrEqual(5);
				expect(result).toBeLessThanOrEqual(10);
			});

			it('should handle negative ranges', () => {
				const result = random.next.inRange(-10, -5);
				expect(result).toBeGreaterThanOrEqual(-10);
				expect(result).toBeLessThan(-5);
			});
		});
	});

	describe('integers', () => {
		it('should return array of integers', () => {
			const result = random.integers(5, 10);
			expect(result).toHaveLength(5);
			result.forEach(num => {
				expect(Number.isInteger(num)).toBe(true);
				expect(num).toBeGreaterThanOrEqual(0);
				expect(num).toBeLessThan(10);
			});
		});

		it('should return empty array for count 0', () => {
			const result = random.integers(0, 10);
			expect(result).toEqual([]);
		});

		it('should handle inclusive flag', () => {
			const result = random.integers(3, 5, true);
			result.forEach(num => {
				expect(num).toBeGreaterThanOrEqual(0);
				expect(num).toBeLessThanOrEqual(5);
			});
		});

		it('should throw for non-integer count', () => {
			expect(() => random.integers(3.5, 10)).toThrow();
		});

		it('should work with negative boundaries', () => {
			const result = random.integers(5, -3);
			result.forEach(num => {
				expect(num).toBeTypeOf('number');
				expect(Number.isInteger(num)).toBe(true);
				expect(num).toBeGreaterThanOrEqual(-3);
				expect(num).toBeLessThan(0);
			});
		});
	});

	describe('generate', () => {
		it('should return function that generates numbers', () => {
			const generator = random.generate(10);
			expect(typeof generator).toBe('function');
			
			for (let i = 0; i < 5; i++) {
				const result = generator();
				expect(typeof result).toBe('number');
				expect(result).toBeGreaterThanOrEqual(0);
				expect(result).toBeLessThan(10);
			}
		});

		it('should default to maxExclusive of 1', () => {
			const generator = random.generate();
			const result = generator();
			expect(typeof result).toBe('number');
			expect(result).toBeGreaterThanOrEqual(0);
			expect(result).toBeLessThan(1);
		});

		describe('integers', () => {
			it('should return function that generates integers', () => {
				const generator = random.generate.integers(20);
				expect(typeof generator).toBe('function');
				
				for (let i = 0; i < 5; i++) {
					const result = generator();
					expect(Number.isInteger(result)).toBe(true);
					expect(result).toBeGreaterThanOrEqual(0);
					expect(result).toBeLessThan(20);
				}
			});

			it('should handle inclusive flag', () => {
				const generator = random.generate.integers(5, true);
				for (let i = 0; i < 5; i++) {
					const result = generator();
					expect(result).toBeGreaterThanOrEqual(0);
					expect(result).toBeLessThanOrEqual(5);
				}
			});
		});
	});

	describe('select', () => {
		it('should select from array', () => {
			const source = [1, 2, 3, 4, 5];
			const result = random.select(source, 3);
			expect(result).toHaveLength(3);
			result.forEach(item => {
				expect(source).toContain(item);
			});
		});

		it('should handle empty selection', () => {
			const source = [1, 2, 3];
			const result = random.select(source, 0);
			expect(result).toEqual([]);
		});

		it('should handle maxCount 1', () => {
			const source = [1, 2, 3, 4, 5];
			const result = random.select(source, 1);
			expect(result).toHaveLength(1);
			expect(source).toContain(result[0]);
		});

		it('should handle selection larger than source', () => {
			const source = [1, 2, 3];
			const result = random.select(source, 5);
			expect(result).toHaveLength(3);
		});

		it('should handle Infinity maxCount', () => {
			const source = [1, 2, 3];
			const result = random.select(source, Infinity);
			expect(result).toHaveLength(3);
		});

		describe('one', () => {
			it('should return one element', () => {
				const source = [1, 2, 3, 4, 5];
				const result = random.select.one(source);
				expect(source).toContain(result);
			});

			it('should return undefined for empty arrays', () => {
				const source: number[] = [];
				const result = random.select.one(source);
				expect(result).toBeUndefined();
			});

			it('should handle null/undefined source', () => {
				const result1 = random.select.one(null as any);
				expect(result1).toBeUndefined();
				
				const result2 = random.select.one(undefined as any);
				expect(result2).toBeUndefined();
			});

			it('should throw when throwIfEmpty is true', () => {
				const source: number[] = [];
				expect(() => random.select.one(source, true)).toThrow('Cannot select from an empty set.');
			});
		});
	});

	describe('shuffle', () => {
		it('should shuffle array in place', () => {
			const target = [1, 2, 3, 4, 5];
			const result = random.shuffle(target);
			expect(result).toBe(target);
			expect(result).toHaveLength(5);
		});

		it('should handle empty arrays', () => {
			const target: number[] = [];
			const result = random.shuffle(target);
			expect(result).toBe(target);
			expect(result).toEqual([]);
		});
	});

	describe('shuffleCopy', () => {
		it('should return shuffled copy', () => {
			const source = [1, 2, 3, 4, 5];
			const result = random.shuffleCopy(source);
			expect(result).not.toBe(source);
			expect(result).toHaveLength(5);
		});

		it('should handle empty arrays', () => {
			const source: number[] = [];
			const result = random.shuffleCopy(source);
			expect(result).not.toBe(source);
			expect(result).toEqual([]);
		});
	});
});
