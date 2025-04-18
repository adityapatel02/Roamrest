const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const review = require("./review.js");
const { string } = require("joi");

// Validator for the entered url for image
function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    url:String,
    filename:String,
      
    // set: v => (v === "" ? "https://shorturl.at/YrYNA" : v), // By default value of img if not entered
    // validate: {
    //   validator: isValidURL,
    //   message: props => `${props.value} is not a valid URL for image`,
    // },
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be positive'], // Add a min validator
    validate: {
      validator: Number.isInteger,
      message: 'Price must be an integer'
    }
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
  },
  reviews:[{
    type:Schema.Types.ObjectId,
    ref:"review",                //from review model.
  }],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  }
});

listingSchema.post("findOneAndDelete",async (listing)=>{
  if(listing){
    await review.deleteMany({_id:{$in:listing.reviews}});
  }
})

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
