// require files and use destructuring
const { people, ages } = require('./people')

console.log(people, ages)


const os = require('os') 

console.log(os.platform(), os.homedir(), os.release())
