const { mdLinks } = require('../src/index');

const arrayLinks = [
  {
    href: 'https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/01-conditionals-and-loops',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\prueba.md',
    text: 'Estructuras condicionales y repetitivas',
  },
];

describe('mdLinks', () => {
  it('Should reject when it is an invalid path', () => expect(mdLinks('./README'))
    .rejects
    .toMatch('Invalid path'));
  it('Should reject when the file path does not belong to an md file', () => expect(mdLinks('./src/index.js'))
    .rejects
    .toMatch('No MD file found'));
  it('Should resolve by returning an array of links with href, text and path properties', () => expect(mdLinks('./sampleDirectory/prueba.md'))
    .resolves
    .toStrictEqual(arrayLinks));
  it('Should reject when the md file does not contain links', () => expect(mdLinks('./sampleDirectory/noLinks.md'))
    .rejects
    .toStrictEqual(new Error('No link found')));
});
