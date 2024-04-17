const fs = require("fs");
const os = require("os") //operating system ap ke computer ki information ap ko deta hai.

console.log(os.cpus().length);

// console.log("1");

//Blocking ...
// const result = fs.readFileSync('contact.txt', "utf-8")

// console.log(result);

// console.log("2");



//Non-Blocking ...
// console.log("1");

fs.readFile('contact.txt', "utf-8", (err, result) => {
//     console.log(result);
 })

// console.log("2");
// console.log("3");
// console.log("4");

// Default Thread Pool Size = 4
// Max? - 8 core cpu - 8