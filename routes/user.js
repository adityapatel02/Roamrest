const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const { signup, signupPost, login, logout } = require("../controller/user.js");

router
     .route("/signUp")
     .get(signup)     //For form 
     .post(signupPost);   //For signup

router
     .route("/login")
     .get((req, res) => {
      res.render("users/login");
     })
     .post(saveRedirectUrl,passport.authenticate("local", {failureRedirect:"/login" , failureFlash: true}),login);

router.get("/logout", logout);

module.exports = router;