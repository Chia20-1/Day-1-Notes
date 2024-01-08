// We have nodash framework. The steps mainly involve around npm install lodash. Just like that. It will search and pick up for you. 
// The get started in the documentation will let you have the setup ready.

const functionsModule = require("./function")
const _ = require("lodash")

functionsModule.printMessage("Good afternoon!")
functionsModule.printMessage(functionsModule.addNumbers(2, 3))

let arr = [9, 0, 1, 2, 5]
let sum = _.sum(arr)

console.log(sum)