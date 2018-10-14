var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// Passport Config
app.use(require("express-session")({
    secret: "I love my cat",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Middleware to pass user to all templates
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// Root Route
app.get("/", function(req, res){
    res.render("landing");
});

// =================
// Campground Routes
// =================

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
   Campground.find({}, function(err, campgrounds){
      if(err){
          console.log(err);
      } else {
          res.render("campgrounds/index", {campgrounds : campgrounds});
      }
   });
});


// CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){
    // Gets data from the new campground form and adds new campground to db
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    
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
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});


// SHOW - show more info about one campground
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground : foundCampground});
        }
    });
});

// =================
// Comments Routes
// =================

// NEW - show form to create new comment on a campground
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
   Campground.findById(req.params.id, function(err, campground){
       if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground : campground});
        }
   });
});

// CREATE - create new comment on a campground
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
   Campground.findById(req.params.id, function(err, campground){
       if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
               if(err) {
                   console.log(err);
               } else {
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect("/campgrounds/" + campground._id);
               }
            });
        }
   });
});

// =================
// Authentication Routes
// =================

// Show Registration Form
app.get("/register", function(req, res){
    res.render("register");
});

// Register New User from Form Submission
app.post("/register", function(req, res){
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
app.get("/login", function(req, res){
   res.render("login"); 
});

// Log user in
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    }), function(req, res){
});

// Log user out
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

// Logic to determine if user is logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp Server has started!"); 
});