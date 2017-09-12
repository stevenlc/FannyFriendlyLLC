var express = require('express');
var router = express.Router();

// LANDING PAGE
router.get("/", function(req, res) {
    res.render("landing");
});

// REGISTER PAGE - not supported yet. app will only have 1 admin user.
router.get("/register", function(req, res) {
    res.render("register");
});

// LOGIN PAGE form
router.get("/login", function(req, res) {
    res.render("login");
});

// LOG IN
router.post("/login", passport.authenticate("local", {
    successRedirect: "/products",
    failureRedirect: "/login"
}), function(req, res) {
    // callback function for log in
    // code should not need to go here
    console.log("Uh oh. Callback function for login post called");
});

// LOG OUT
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You are now logged out.");
    res.redirect("/products");
});

module.exports = router;


