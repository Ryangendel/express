const mongoose = require("mongoose")

const DogSchema = new mongoose.Schema({
    dogName:String,
    age: Number
})

module.exports= mongoose.model("Dog", DogSchema)

