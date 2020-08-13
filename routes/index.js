var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");




router.get("/", function(req, res){
    res.render("landing");
});





//  ===========
// AUTH ROUTES
//  ===========


// show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});


//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    if(req.body.adminCode === 'playerraterU446306') {
      newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
           	req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
		   req.flash("success", "Welcome to Player Ratings " + user.username);
           res.redirect("/clubs/aberdeen"); 
        });
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/clubs/aberdeen",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: 'Welcome to Player Ratings!'
    }), function(req, res){
});

// logic route
router.get("/logout", function(req, res){
   req.logout();
	req.flash("success", "Logged you out");
   res.redirect("/clubs/aberdeen");
});



module.exports = router;