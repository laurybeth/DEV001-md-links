function resolved(path,validate) {
    path='links';
    return path;
  }
  
  function rejected() {
    const error = new Error('fail');
    return error;

  }

  

export const mdLinks = (path,validate ) => new Promise( (resolve, reject) => {
    setTimeout(() => {
      let todoCorrecto = true;
      if (todoCorrecto) {
        resolve(resolved(path,validate));
      } else {
        reject(rejected);
      }
    }, 2000)
  })

export function add(x, y) {
    return x + y;
}