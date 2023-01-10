

function resolved(path) {
    path='array of links';
    return path;
  }
  
  function rejected() {
    const error = 'fail';
    return error;

  }

  

export const mdLinks = (path) => new Promise( (resolve, reject) => {
  
      let todoCorrecto = true;
      if (todoCorrecto) {
        resolve(resolved(path));
      } else {
        reject(rejected);
      }
  })

