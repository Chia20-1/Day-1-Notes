//  Declar on top is Global Variable

// function printMessage(message) {
//     console.log(message)
// }

const printMessage = (message) => {
    console.log(message)
}

function addNumbers(num1, num2) {
    return num1 + num2
}

// let sum = addNumbers(3, 5)
// printMessage(sum)
// printMessage("Happy New Year!")

module.exports = { printMessage, addNumbers };