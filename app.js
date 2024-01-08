// Setup and Import
const express = require("express")
const app = express()
const port = 3000

// Setup MongoDB
const { MongoClient } = require("mongodb")
// const uri = "mongodb://hostname:port/database_name"
const uri = "mongodb://localhost:27017/mydb"
const client = new MongoClient(uri)
client.connect((err) => {
    if (err) throw err
})

// Configure server to be able to use JSON request and response
app.use(express.json())

// Setup Route
app.get("/", (req, res) => {
    return res.send("Hello World")
})

// new method

app.get("/users", async (req, res) => {
    let result = await client.db("mydb").collection("users").find({}).toArray()
    return res.send(result)
})

// Start up server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

// Defining parameters in url
// app.get("/register/:name", (req, res) => {
//     console.log("My name is", req.params.name)
//     return res.send("Register")
// })

// app.post("/register/", (req, res) => {
//     console.log("My name is", req.body.name)
//     return res.send("Register")
// })

// Specific error message
// Specific status

app.post("/register/", async (req, res) => {
    // Username, password
    const reqUsername = req.body.username
    const reqPassword = req.body.password

    // Check for null
    if (reqUsername === undefined || reqPassword === undefined) {
        return res
            .status(400)
            .send("Username  or password is not provided.")
    }

    // Add user to db
    let result = await client.db("mydb").collection("users").insertOne({
        username: reqUsername,
        password: reqPassword
    })

    // Check if DB Success

    if (result.acknowledged === true) {
        return res.sendStatus(200)
    } else {
        return res.sendStatus(500)
    }

    // console.log("Username:", reqUsername, "Password:", reqPassword)

    // return res.send("Register")
})

//  In postman, locahost:3000 > body > raw > insert object there {username, passowrd}