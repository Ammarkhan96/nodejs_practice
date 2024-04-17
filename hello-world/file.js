//File Handling mean to do operation on files.Mean you create files, and reads files.

//fs: (File System) in nodejs the fs is a built-in module.

const fs = require('fs')

//Sync...
// fs.writeFileSync('./test.txt', 'Hello World')

//Async
// fs.writeFile('./test.txt', 'Hello World Async', (err) => {})


// const result = fs.readFileSync('./contacts.txt', 'utf-8')
// console.log(result);

// const result = fs.readFile('./contacts.txt', 'utf-8')
// console.log(result);


// fs.readFile('./contacts.txt', 'utf-8', (err, result)=> {
//     if(err){
//         console.log("Error", err);
//     }else{
//         console.log(result);
//     }
// })


// fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString())


fs.appendFileSync("./test.txt", `${Date.now()} Hey There\n`)

// fs.copyFileSync("./test.txt", "./copy.txt")

// fs.unlinkSync('./copy.txt')

// console.log(fs.statSync("./test.txt").isFile());

console.log(fs.statSync("./test.txt"));
//  fs.mkdirSync("my-docs")
fs.mkdirSync("my-docs/a/b", {recursive: true})

