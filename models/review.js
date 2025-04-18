const { ref } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment:{
        type:String,
        required:true,
    },
    rating:{
        type: Number,
        required: true,
        min: [1, 'Rating must be from 1 to 5'], // Add a min validator
        max: [5, "Rating must be from 1 to 5"],
        validate: {
        validator: Number.isInteger,
        message: 'Rating must be an integer'
        },
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    }

});

const review = mongoose.model("review",reviewSchema);

module.exports = review;