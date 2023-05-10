const express = require('express')
const app = express()
const cors = require ('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;
// MIDDLEWARE
app.use(cors());
app.use(express.json());

// mongo db connection:

// crud

// ==========mongo connection code============
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kxlelta.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // create new db for this project and new collection for data:
    const coffeeCollection = client.db("coffeeDB").collection("coffee");
    
  //  post coffee details to mongo:
   app.post('/coffee',async(req,res)=>{
    const newCoffee =req.body;
    console.log(newCoffee);
    const result = await coffeeCollection.insertOne(newCoffee);
    res.send(result);
   })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
// ========== mongo connceiton code ends==========
app.get('/', (req, res) => {
  res.send('coffee server is working')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})