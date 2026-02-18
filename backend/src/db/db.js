const mongoose = require('mongoose');

function connectdb () {
    mongoose.connect(process.env.MONGODB_URI) 
        .then(() => {
            console.log("Connected to MongoDB successfully");
        })
        .catch((err) => {
            console.log("Error connecting to MongoDB:", err);
        })
}

module.exports = connectdb;