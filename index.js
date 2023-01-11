
import { mdLinks } from './src/mdLinks.js'

const arg = process.argv.slice(2); //  process.argv property is an inbuilt application programming interface of the process module which is used to get the arguments passed to the node.js
const path = arg[0];
//const validate = arg[1];
console.log("ruta es", path);
//console.log("opcion es", validate);


mdLinks(path).then((links) => {

  console.log('mdlinks result: ', links);
}).catch((error) => {
  console.log(error);
});
