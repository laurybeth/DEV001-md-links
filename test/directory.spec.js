// const fs = require('fs');
const { getMDFilesPathFromDir, getLinksFromDir } = require('../src/directory');

/* jest.mock('fs');

beforeEach(() => {
  fs.statSync.mockClear();
  fs.readdirSync.mockClear();
});

const directoryFiles1Call = ['directoryTwo', 'hola.js', 'threeLinks.md'];
const directoryFiles2Call = ['twoLinks.md']; */

const mdFiles = [
  './sampleDirectory/directory\\directoryTwo\\twoLinks.md',
  './sampleDirectory/directory\\threeLinks.md',
];

const linksFromDir = [
  {
    href: 'https://nodejs.org/api/path.html',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\directory\\directoryTwo\\twoLinks.md',
    text: 'Path',
  },
  {
    href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\directory\\directoryTwo\\twoLinks.md',
    text: 'Linea de comando CLI',
  },
  {
    href: 'https://github.com/workshopper/learnyounode',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\directory\\threeLinks.md',
    text: 'learnyounode',
  },
  {
    href: 'https://github.com/workshopper/how-to-npm',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\directory\\threeLinks.md',
    text: 'how-to-npm',
  },
  {
    href: 'https://github.com/stevekane/promise-it-wont-hurt',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\directory\\threeLinks.md',
    text: 'promise-it-wont-hurt',
  },
];

describe('getMDFilesPathFromDir', () => {
  it('Should return all the MD files paths from a directory', () => {
    /*     fs.statSync.mockReturnValueOnce(true);
    fs.statSync.mockReturnValueOnce(true);
    fs.statSync.mockReturnValueOnce(false);
    fs.statSync.mockReturnValueOnce(false);
    fs.statSync.mockReturnValueOnce(false);
    fs.readdirSync.mockReturnValueOnce(directoryFiles1Call);
    fs.readdirSync.mockReturnValueOnce(directoryFiles2Call); */
    expect(getMDFilesPathFromDir('./sampleDirectory/directory'))
      .toEqual(mdFiles);
  });
});

describe('getLinksFromDir', () => {
  it('Should return all the MD files paths from a directory', () => expect(getLinksFromDir('./sampleDirectory/directory'))
    .resolves
    .toEqual(linksFromDir));
});
