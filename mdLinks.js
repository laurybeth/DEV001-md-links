function resolve(result) {
    console.log('Resolved');
  }
  
  function rejected(result) {
    console.error(result);
  }

export const mdLinks = (path,validate ) => Promise.resolve('hola');

export function add(x, y) {
    return x + y;
}