function fetchData(callback) {
    // Stimulate Delay
    setTimeout(() => {
        callback(5)
    }, 5000)
}

// fetchData((result) => {
//     console.log(result)
// })

fetchData((result) => {
    let sum = result + 5;
    console.log(sum)
})