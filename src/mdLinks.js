import { resolved, rejected } from './promise.js'
import fs from 'fs'



export const mdLinks = (path) => new Promise((resolve, reject) => {

  if (fs.existsSync(path)) {
    resolve(resolved(path));
  } else {
    reject(rejected('Invalid path'));
  }
})

