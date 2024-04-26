//example:01
// var fs = require('fs')
// var os = require('os')

// var user = os.userInfo()
// // console.log(user);
// console.log(user.username);

// fs.appendFile('greeting.txt', 'Hi ' + user.username + '!\n', () => {
//     console.log('file is created');
// })

// console.log(fs);


//example:02
const notes = require('./notes.js')
var _ = require('lodash')

console.log('server file is available');
var age = notes.age
var result = notes.addNumber(age+12, 10)
console.log(age);
console.log('result is now ' + result);

var data = ["person", "person", 1, 2, 1, 2, 'name', 'age', '2']
var filter = _.uniq(data)
console.log(filter);

console.log(_.isString(' DELL E5470'));