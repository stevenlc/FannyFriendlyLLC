var express = require('express');
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    flash = require('connect-flash'),
    passport= require('passport'),
    LocalStrategy = require('passport-local'),
    methodOverride = require('method-override'),
    seedDB = require('./seeds');

// require models
var User = require('./models/user');

// require routes
var indexRoutes = require('./routes/index'),
    productRoutes = require('./routes/products'),
    testimonialRoutes = require('./routes/testimonials'),
    photoRoutes = require('./routes/photos');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/ffllc", {useMongoClient: true});
seedDB();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret: "This is the encryption text.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// ==========
// ROUTES
// ==========

app.use("/", indexRoutes);
app.use("/products", productRoutes);
app.use("/testimonials", testimonialRoutes);
app.use("/photos", photoRoutes);

app.get("/gallery", function(req, res){
    res.redirect("/photos");
});

app.get("/company", function(req, res) {
    res.render("company");
});

app.get("/contact", function(req, res){
    res.render("contact");
})

// START SERVER
app.listen("3000", process.env.IP, function() {
    console.log("SERVER HAS STARTED");
});
