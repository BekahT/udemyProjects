var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    Comment     = require("../models/comment"),
    Campground  = require("../models/campground");

// All routes have /campgrounds/:id/comments at the beginning

// NEW - show form to create new comment on a campground
router.get("/new", isLoggedIn, function(req, res){
   Campground.findById(req.params.id, function(err, campground){
       if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground : campground});
        }
   });
});

// CREATE - create new comment on a campground
router.post("/", isLoggedIn, function(req, res){
   Campground.findById(req.params.id, function(err, campground){
       if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
               if(err) {
                   console.log(err);
               } else {
                   // Add username and ID to comment and save comment
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   comment.save();
                   // Add comment to campground and save campground
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect("/campgrounds/" + campground._id);
               }
            });
        }
   });
});

// Middleware to determine if user is logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;