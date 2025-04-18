const mongoose = require ("mongoose");
const sampleListings = require("./data.js");
const Listing = require("../models/listing.js");

 const MONGO_URL = "mongodb+srv://adityapatel123kv:jsjbhKbiA6hPqWfI@wanderlust.f9ccw.mongodb.net/";
//const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {       //functin to connect MonoDB
    await mongoose.connect(MONGO_URL);
  }

main().then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log("Can't able to connect with DB");
    console.log(err);
})

const initDB = async function(){
     await Listing.deleteMany({});
     await Listing.insertMany(sampleListings);
     console.log("Data Successfully initialized");
}

initDB();