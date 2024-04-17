// console.log("Hey there! I am JS");

// const math = require('./fs') file system: through this we do file handling
// const math = require('./http') through http we create web servers
// const math = require('./math')
const { add, sub } = require('./math')

// console.log('Math value is', math.subFn(8, 3));
// console.log('Math value is', math.addFn(8, 4));

console.log('Math value is', add(8, 3));
console.log('Math value is', sub(8, 1));