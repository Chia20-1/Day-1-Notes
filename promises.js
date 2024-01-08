function fetchData(W) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(5)
        }, 5000)
    })
}

fetchData()
    .then((result) => {
        console.log(result)
    })
    .catch((err) => {
        console.log(err)
    })