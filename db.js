const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://kunalshaw79:kunalshaw@authentication.onxu8wo.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;