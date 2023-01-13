const { mdLinks } = require('../src/index');

describe('mdLinks', () => {
  it('Should reject when it is an invalid path', () => expect(mdLinks('./README'))
    .rejects
    .toMatch('Invalid path'));
  it('Should reject when the file path does not belong to an md file', () => expect(mdLinks('./src/index.js'))
    .rejects
    .toMatch('No MD file found'));
});
