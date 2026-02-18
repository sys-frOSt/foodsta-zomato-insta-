const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    video:{
        type:String,
        required:true
    },
    description:{
        type:String,
        },
    foodpartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'FoodPartner',
        required:true
    
    }

});


const FoodModel = mongoose.model('Food',foodSchema);

module.exports = FoodModel;