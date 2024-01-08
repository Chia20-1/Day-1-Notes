// let message = "Hello World"
// message = "Good morning!"

// console.log(typeof message)

// const firstNum = 3.14
// let sum = firstNum + 3

// const middleName = "Chia"
// const lastName = "Chun"
// let combinedMessage = middleName + " " + lastName

// console.log(combinedMessage)

let isEngineStarted = true;
let isBrakeRelease = true;

isEngineStarted && isBrakeRelease
    ? console.log("Car is able to move.")
    : console.log("Car is unable to move.")

let array = ["a", "b", "c", "d", "e"]

for (let i = 0; i < array.length; i++) {
    console.log(`Index number: ${i}`, `Item: ${array[i]}`);
}

let j = 0;
while (j < 5) {
    console.log("Current itertation: ", j)
    j++;
}