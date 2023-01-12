const { mdLinks } = require('../src/index.js');


describe('mdLinks', () => {

  it('Should return a promise', () => {
    expect(mdLinks()).toBe(typeof Promise);
  });
  it.only('Should reject when it is an invalid path', () => {
    return (mdLinks('./README'))
      .catch((error) => {
        expect(error).toBe('Invalid path')
      });
  });

});
