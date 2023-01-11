const {mdLinks} = require('../src/mdLinks.js');


describe('mdLinks', () => {

  it('Should return a promise', () => {
    expect(mdLinks()).toBe(typeof Promise);
  });

});
