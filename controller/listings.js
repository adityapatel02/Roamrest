const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync");



//Index
let index = wrapAsync(async (req,res)=>{
    let allListings =await Listing.find({});
    res.render("listings/index.ejs",{allListings,req});
})

//New Route
let newListingRoute = (req,res)=>{
    res.render("listings/new.ejs");
}

// Create Route
let newListing = wrapAsync(async (req, res, next) => {
    let url=req.file.path;    //getting path of the image as url
    let filename=req.file.filename;  //getting filename where we store data
    console.log(url);
    console.log(url,">>>>",filename);
    const newListing= new Listing(req.body);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
})

//Edit Route
let Edit = wrapAsync(async (req,res)=>{
    let id=req.params.id;
    let listing_data = await Listing.findById(id);
    if (!listing_data) {
        req.flash("error","Requested Listing not found");
        res.redirect("/listings");
    }
    let originalImageUrl = listing_data.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/c_fit,h_300,w_250,q_auto");
    res.render("listings/edit.ejs",{listing_data,originalImageUrl});
})

//Show Route
let Show = wrapAsync(async (req, res) => {
    let id = req.params.id;
    let listing_data = await Listing.findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");
    if (!listing_data) {
      req.flash("error", "Requested Listing not found");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing_data });
    // console.log(listing_data);
  })

//Update Route
let Update =  wrapAsync(async (req,res,next)=>{
    let id=req.params.id;
    let form_data=req.body;
    let listing= await Listing.findByIdAndUpdate(id,{...form_data},{runValidators:true,new:true}); //To update each field
    
    if (req.file) {
    console.log(req.file);
    let url=req.file.path;    //getting path of the image as url
    let filename=req.file.filename;  
    listing.image={url,filename};
    await listing.save();
    req.flash("success","Listing Successfully Updated!");    
    }   
    res.redirect(`/listings/${id}`);
    // console.log(listing);
})

//Delete Route
let destroy = wrapAsync(async (req,res)=>{
    let id=req.params.id;
    let DeletedData = await Listing.findByIdAndDelete(id); //To delete the listing
    req.flash("success","Listing Successfully Deleted!");
    res.redirect("/Listings");
    // console.log(DeletedData);
})

module.exports = {
    index:index,
    newListing:newListing,
    Edit:Edit,
    Show:Show,
    Update:Update,
    destroy:destroy,
    newListingRoute:newListingRoute,
}