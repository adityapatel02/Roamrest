const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");

//Signup page
let signup =  (req, res) => {
    res.render("users/signup");
}

//Signup
let signupPost = wrapAsync(async (req, res) => {
    try {let data = req.body;
         let user = new User(data);
         let registeredUser = await User.register(user, data.password);
         console.log(registeredUser);
         req.login(registeredUser,(err)=>{
             if(err){
               return next(err);
             }
             req.flash("success", "Registered Successfully!");
             res.redirect("/listings");
         })   
    } catch (error) {
            req.flash("error", error.message);
            res.redirect("/signUp");
    }  
  })


//login 
let login =  async (req, res) => {
    req.flash("success", "Logged in Successfully!");
    res.redirect( res.locals.redirectUrl || "/listings");
  }


//logout
let logout = (req,res)=>{
    req.logout((err)=>{
        if (err) {
            next(err);
        }
   req.flash("success","You are logged out!");
   res.redirect("/listings");
    })
 }

module.exports = {
    signup:signup,
    signupPost:signupPost,
    login:login,
    logout:logout,
}