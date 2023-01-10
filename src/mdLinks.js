import {resolved, rejected} from './promise.js'

  

export const mdLinks = (path) => new Promise( (resolve, reject) => {
  
      let todoCorrecto = true;
      if (todoCorrecto) {
        resolve(resolved(path));
      } else {
        reject(rejected);
      }
  })

