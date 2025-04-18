const express = require("express");
const router = express.Router({mergeParams:true});
// IMP:- Not forget to add mergeparams true, because in app.js parent route for this file, we are setting a var, to get the var - :id we need to add mergerparams:true to get the value of :id in this file.
const { isLoggedIn, isreviewAuthor } = require("../middleware.js");
const {create, destroy} = require("../controller/reviews.js");


//Reviews create Route
router.post("/",isLoggedIn,create);

// Reviews Delete Route
router.delete("/:review_id",isLoggedIn,isreviewAuthor,destroy);

module.exports = router;
