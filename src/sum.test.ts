import { sum }  from './sum';

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });

describe('sum', () => {
  it('should add two numbers', () => {
    const result = sum(1, 2);
    expect(result).toBe(3);
  });
});
