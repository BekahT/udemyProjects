var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    mongoose = require("mongoose");

// App Config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useNewUrlParser: true});

// Mongoose/Model Config
var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// RESTful Routes
app.get("/", function(req, res){
   res.redirect("/blogs"); 
});

// Index Route
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("An error occurred: " + err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});


// New Route
app.get("/blogs/new", function(req, res){
    res.render("new");
});

// Create Route
app.post("/blogs", function(req, res){
    // Santize blog body contents to remove any script tags
   req.body.blog.body = req.sanitize(req.body.blog.body);
   //Create a new blog and redirect to the blogs page
   Blog.create(req.body.blog, function(err, newBlog){
       if(err){
           res.render("new");
           console.log("An error occurred in creating the new blog: " + err)
       } else {
           res.redirect("/blogs");
       }
   });
});

// Show Route
app.get("/blogs/:id", function(req, res){
   Blog.findById(req.params.id, function(err, foundBlog){
      if(err){
          res.redirect("/blogs");
          console.log("An error occurred in showing a blog: " + err)
      } else {
          res.render("show", {blog: foundBlog});
      }
   });
});

// Edit Route
app.get("/blogs/:id/edit", function(req, res){
   Blog.findById(req.params.id, function(err, foundBlog){
      if(err){
          res.redirect("/blogs");
          console.log("An error occurred in editing a blog: " + err)
      } else {
          res.render("edit", {blog: foundBlog});
      }
   });
});

// Update Route
app.put("/blogs/:id", function(req, res){
    // Santize blog body contents to remove any script tags
   req.body.blog.body = req.sanitize(req.body.blog.body);
   // Update the specified blog and return to the blog's show page
    Blog.findOneAndUpdate({"_id":req.params.id}, req.body.blog, function(err, updatedBlog){
        if(err){
          res.redirect("/blogs");
          console.log("An error occurred in updating a blog: " + err)
      } else {
          res.redirect("/blogs/" + req.params.id);
      }
    });
});

// Destroy Route
app.delete("/blogs/:id", function(req, res){
    Blog.findOneAndDelete({"_id":req.params.id}, function(err){
       if(err){
           res.redirect("/blogs");
           console.log("An error occurred in deleting a blog: " + err)
       } else {
           res.redirect("/blogs");
       }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running!");
});