const fs = require ('fs')

setTimeout(() => console.log('Hello from Timer 1'), 0);

setImmediate(() => console.log('Hello from Immediate Fn 1'))

// console.log('Hello from Top Level Code');

fs.readFile('sample.txt', 'utf-8', () => {
    console.log('IO Polling Finish');

    setTimeout(() => console.log('Hello from Timer 2'), 0)
    setTimeout(() => console.log('Hello from Timer 3'), 5*1000)
})

console.log('Hello from Top Level Code');