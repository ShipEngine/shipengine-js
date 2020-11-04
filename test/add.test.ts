import { add } from '../src/add';
describe('add', () => {
  it('adds two numbers', () => {
    expect(add(5, 6)).toBe(11);
  });
});
