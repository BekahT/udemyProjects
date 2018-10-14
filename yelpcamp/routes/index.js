var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user");

// Root Route
router.get("/", function(req, res){
    res.render("landing");
});

// =================
// Authentication Routes
// =================

// Show Registration Form
router.get("/register", function(req, res){
    res.render("register");
});

// Register New User from Form Submission
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
       if(err) {
           console.log(err);
           return res.render("register");
       } 
       // Login and redirect to campgrounds
       passport.authenticate("local")(req, res, function(){
           res.redirect("/campgrounds");
       });
    });
});

// Log in Form
router.get("/login", function(req, res){
   res.render("login", {message: req.flash("error")}); 
});

// Log user in
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    }), function(req, res){
});

// Log user out
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

// Middleware to determine if user is logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;