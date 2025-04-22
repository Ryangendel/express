const express = require('express')
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const { MongoClient, ObjectId } = require('mongodb');
const Dog = require("./models/Dog")

const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT
var dogID = 1

var mockDatabase = []



//------------------


// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database Name
const dbName = 'pound';

const db = client.db(dbName);
const dogsCollection = db.collection('alldogs');
const userCollection = db.collection("userCollection")

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const dogsCollection = db.collection('alldogs');
//   const userCollection = db.collection("userCollection")

//   // the following code examples can be pasted here...

//   return 'done.';
// }

//-------------------

app.use(express.static(path.join(__dirname,"..", 'frontend')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "frontend", 'index.html'));
})

app.post("/addpup", async function(req, res){
  await client.connect();
  console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const collection = db.collection('alldogs');
    console.log(req.body)
 // const { insertedId } =  await dogsCollection.insertOne({ dogName: 'Runa', age: 2 })
  const insertedData =  await dogsCollection.insertOne({dogName: req.body.name, email: req.body.email })
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

  res.send(insertedData)
})

app.get('/dogsinvent', async (req, res) => {
    try {
      const users = await Dog.find({});
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });

// app.post("/addpup/:favfood", async function(req, res){
//       console.log(req.body)
//    // const { insertedId } =  await dogsCollection.insertOne({ dogName: 'Runa', age: 2 })
//     // const insertedData =  await dogsCollection.insertOne({dogName: req.body.name, email: req.body.email })
//     // .then(console.log)
//     // .catch(console.error)
//     // .finally(() => client.close());
//     try{
//         var name = req.body.name
//         var age = req.body.email

//         const newDog = new Dog({name:name, age:age})
//         await newDog.save()
//         res.status(201).json(newDog)

//     } catch(err){
//         res.status(500).json({error:"you have an error"})
//     }

//     res.send(insertedData)
//   })
  

app.get('/doginventory', function (req, res) {
    res.json({data:mockDatabase})
})

app.post("/adddog", function (req, res) {
    console.log(req.body)
    var resposeToUser = req.body
    resposeToUser.adopted = false
    resposeToUser.id = parseInt(dogID)
    dogID = dogID + 1   
    console.log(resposeToUser)
    mockDatabase.push(resposeToUser)
    res.status(200).json(mockDatabase)
})



app.put("/adddog", function (req, res) {
    console.log("hit the PUT route")
    res.status(200).send("good job buddy")
})

app.delete("/deletepup/:id", async function(req, res){

    var dogId = req.params.id
    console.log("-----------")
    console.log(dogId)
    console.log("-----------")
    const result = await dogsCollection.deleteOne({_id: new ObjectId(dogId)});
   
    res.status(200).send("good job buddy")
})


app.delete("/removedog/:banana", function (req, res) {
   console.log(req.params.banana)
   var dogId = parseInt(req.params.banana)
    console.log(dogId)
    for (let i = 0; i < mockDatabase.length; i++) {
        if(mockDatabase[i].id == dogId ){
            delete mockDatabase[i];
        }
      }
 
    res.status(200).send("good job buddy")
})

console.log(process.env.GOOGLE_API_KEY)
app.listen(PORT, ()=>{
    console.log("listeing on pport" + PORT )
})

//ODM
//Deploying