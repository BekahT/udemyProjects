var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground"),
    middleware  = require("../middleware");

//All routes in this file have /campgrounds at the beginning

// INDEX - show all campgrounds
router.get("/", function(req, res){
   Campground.find({}, function(err, campgrounds){
      if(err){
          console.log(err);
      } else {
          res.render("campgrounds/index", {campgrounds : campgrounds});
      }
   });
});

// CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // Gets data from the new campground form and adds new campground to db
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: desc, author: author};
    
    // Create new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // Redirect to campgrounds with GET request
            res.redirect("/campgrounds");
        }
    });
});

// NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// SHOW - show more info about one campground
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground : foundCampground});
        }
    });
});

// EDIT - show form to edit existing campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
        Campground.findById(req.params.id, function(err, foundCampground){
            res.render("campgrounds/edit", {campground: foundCampground});
        });
});

// UPDATE - make updates to existing campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findOneAndUpdate({"_id": req.params.id}, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY - delete campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findOneAndDelete({"_id": req.params.id}, function(err){
       if(err){
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds");
       }
   }); 
});

module.exports = router;