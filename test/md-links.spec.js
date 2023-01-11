import { jest } from '@jest/globals';
import { mdLinks } from '../src/mdLinks.js'


// eslint-disable-next-line no-undef
describe('mdLinks', () => {

  // eslint-disable-next-line no-undef
  it('should return a promise', () => {
    expect(mdLinks()).toBe(typeof Promise);
  });

});
