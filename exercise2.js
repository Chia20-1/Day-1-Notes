// Setup Express
const express = require("express")

// Setup MongoDB
const { MongoClient } = require("mongodb")

// Create Express application
const app = express()

// Define the port
const port = 3001

// Configure server to be able to use JSON request and response
app.use(express.json())

// // MongoDB URI and Database Name
// const uri = "mongodb://hostname:port/database_name"
const dbName = "mydb2"
const uri = `mongodb://localhost:27017/${dbName}`

// Create a MongoDB client
const client = new MongoClient(uri)
client.connect((err) => {
    if (err) throw err
})

async function main() {
    await client.connect();
    console.log("Connected successfully to MongoDB server");
    const db = client.db(dbName);

    // Register route
    app.post('/register', async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }

        const usersCollection = db.collection('users');

        // Check if user already exists
        const existingUser = await usersCollection.findOne({ username });
        if (existingUser) {
            return res.status(409).send('User already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        await usersCollection.insertOne({ username, password: hashedPassword });
        res.status(201).send('User registered');
    });

    // Login route
    app.post('/login', async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }

        const usersCollection = db.collection('users');

        // Check if user exists
        const user = await usersCollection.findOne({ username });
        if (!user) {
            return res.status(401).send('Invalid credentials');
        }

        // Compare the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Oops! Something went wrong with the login. Please check your password and try again');
        }


        res.status(200).send('Logged in successfully');
    });

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

main().catch(console.error);

// Implement comment feature
// Object/Document Structure
// {
//     picId: String,
//     username: String,
//     comment: String
// }

async function commentFeature() {
    // Connect part. Connected in main, don't repeat.
    // await client.connect();
    // console.log("Connected successfully to MongoDB server");
    const db = client.db(dbName);
    const commentsCollection = client.db("mydb2").collection("comments")

    // Posting comment
    app.post("/comments", async (req, res) => {
        const { picId, username, comment } = req.body;
        const result = await commentsCollection.insertOne({ picId, username, comment });
        if (result.acknowledged === true) {
            return res.sendStatus(200)
        } else {
            return res.sendStatus(500)
        }
    });

    // Get Route
    app.get("/comments/:picId", async (req, res) => {
        const { picId } = req.params;
        const comments = await commentsCollection.find({ picId }).toArray()
        res.status(200).json(comments);
    })

    // Delete route
    app.delete("/comments/:id", async (req, res) => {
        const { ObjectId } = require("mongodb")

        const result = await client.db('mydb2').collection('comments').deleteOne({ _id: new ObjectId(req.params.id) });

        if (result.deletedCount === 0) {
            return res.status(404).send("Comment not found");
        }

        res.status(200).send("Comment deleted successfully");
    });
}

commentFeature().catch(console.error);