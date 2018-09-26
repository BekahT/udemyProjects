var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema Setup
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String
});

// Compile schema into model
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill", 
//         image: "https://www.photosforclass.com/download/pixabay-1851092?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f7c879aee9b2bb_960.jpg&user=Pexels"
        
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("New Campground:");
//             console.log(campground);
//         }
//     });

// Root Route
app.get("/", function(req, res){
    res.render("landing");
});


// Campgrounds GET Request
app.get("/campgrounds", function(req, res){
   Campground.find({}, function(err, campgrounds){
      if(err){
          console.log(err);
      } else {
          res.render("campgrounds", {campgrounds : campgrounds});
      }
   });
});


// Campgrounds POST Request
app.post("/campgrounds", function(req, res){
    // Gets data from the new campground form and adds new campground to db
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // Redirect to campgrounds with GET request
            res.redirect("/campgrounds");
        }
    });
});

// Form that sends new campground data to campground post route
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp Server has started!"); 
});