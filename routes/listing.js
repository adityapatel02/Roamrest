const express = require("express");
const router = express.Router();
const {isLoggedIn, isOwner} = require("../middleware.js");
const { index, newListing, Edit, Show, Update, newListingRoute, destroy } = require("../controller/listings.js");
const multer  = require('multer');
const  storage  = require("../cloud_config.js");
const upload = multer({storage});

router
   .route("/")
   .get(index)  //Index
   .post(isLoggedIn,upload.single('image'),newListing); // Create Route


//New Route
router.get("/new",isLoggedIn,newListingRoute)
  
//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,Edit);

router
    .route("/:id")
    .get(Show)      //Show Route
    .patch(isLoggedIn, isOwner,upload.single('image'),Update)   //Update Route
    .delete(isLoggedIn, isOwner,destroy);  //Delete Route

module.exports = router;
