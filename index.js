
import {mdLinks,add} from './mdLinks.js'

console.log('Result: '+add(2, 3));
const arg = process.argv.slice(2);
const path = arg[0];
const validate = arg[1];
console.log("ruta es", path);
console.log("opcion es", validate);


mdLinks(path, validate).then((links)=>{

  console.log('mdlinks: ',links);
});


/* module.exports = () => {
  // ...
}; */