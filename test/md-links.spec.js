const { mdLinks } = require('../src/index');

describe('mdLinks', () => {
  it('Should reject when it is an invalid path', () => expect(mdLinks('./README'))
    .rejects
    .toMatch('Invalid path'));
});
