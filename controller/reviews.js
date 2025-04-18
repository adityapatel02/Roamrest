const Listing = require("../models/listing.js");
const review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync");

//Reviews create Route
let create = wrapAsync(async (req,res)=>{
    let id=req.params.id;
    console.log(req.params);
    let listing= await Listing.findById(id);
    let newReview = new review({
        comment:req.body.reviewComment,
        rating: req.body.reviewRating,
        author:req.user._id,
    });
    newReview.save();
    listing.reviews.push(newReview);
    listing.save();
    console.log(newReview);
    req.flash("success","Review Saved!");
    res.redirect(`/listings/${listing.id}`);
})

// Reviews Delete Route
let destroy = wrapAsync(async (req,res)=>{
    let id=req.params.id;
    let reviewId = req.params.review_id;
    await review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});   
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
})

module.exports = {
    create:create,
    destroy:destroy,
}