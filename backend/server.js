const dotenv = require('dotenv')
const express = require('express')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')
const cors = require('cors')

dotenv.config()

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'PassHero'
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())

client.connect();

// Get all the Password
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

// Save the Password
app.post('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.send({success: true, result: findResult})
})

// Delete a Password by id
app.delete('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne({id: req.body.id});
  res.send({success: true, result: findResult})
})

// Editing a Password
app.put("/", async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection("passwords");

    await collection.updateOne(
        { id: req.body.id },
        {
            $set: {
                site: req.body.site,
                username: req.body.username,
                password: req.body.password
            }
        }
    );

    res.send({ success: true });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})