function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(5)
        }, 5000)
    })
}

async function getData() {
    const result = await fetchData()
    console.log(result)
}

getData()