const  Listing  = require("./models/listing.js");
const review = require("./models/review.js");

let isLoggedIn = function (req, res, next) {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be login first");
        return res.redirect("/login");
    }
    next();
};

let saveRedirectUrl = function (req, res, next) {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

let isOwner = async function (req, res, next) {
    console.log(req.params);
    let id = req.params.id;
    let listing_data = await Listing.findById(id);
    if (!listing_data.owner._id.equals(req.user._id)) {
        req.flash("error","You are not allowed to this action");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

let isreviewAuthor = async function (req, res, next) {
    console.log(req.params);
    let id = req.params.id;
    let reviewid = req.params.review_id;
    let Review = await review.findById(reviewid);
    if (!Review.author._id.equals(req.user._id)) {
        req.flash("error","You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports = {
    isLoggedIn: isLoggedIn,
    saveRedirectUrl: saveRedirectUrl,
    isOwner: isOwner,
    isreviewAuthor: isreviewAuthor
};
