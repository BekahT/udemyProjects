var Comment     = require("../models/comment"),
    Campground  = require("../models/campground");

// All the middleware
var middlewareObj = {};

//Middlware to determine campground ownership
middlewareObj.checkCampgroundOwnership = function(req, res, next){
    //Check if user is logged in
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back");
            } else {
                //Check if logged in user owns the campground
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
};

//Middlware to determine comment ownership
middlewareObj.checkCommentOwnership = function(req, res, next){
    //Check if user is logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                //Check if logged in user owns the comment
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
};

// Middleware to determine if user is logged in
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = middlewareObj;