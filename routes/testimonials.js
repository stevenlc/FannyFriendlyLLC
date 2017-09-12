var express = require('express');
var router = express.Router();
var Testimonial = require('../models/testimonial');
var middleware = require('../middleware');

// show all testimonials page
router.get("/", function(req, res) {
    Testimonial.find({}, function(err, testimonials) {
        if (err) {
            console.log(err);
        } else {
            res.render("testimonials/index", { testimonials: testimonials });
        }
    });
});

// new testimonial form
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("testimonials/new");
});


// create new testimonial
router.post("/", middleware.isLoggedIn, function(req, res) {
    var newTestimonial = req.body.testimonial;
    Testimonial.create(newTestimonial, function(err, testimonial) {
        if (err || testimonial === undefined) {
            console.log(err);
            res.redirect("back");
        } else {
            console.log("Testimonial by " + testimonial.author + " added.");
            req.flash("success", "You have successfully added a new testimonial.");
            res.redirect("/testimonials");
        }
    });
});

// edit testimonial form
router.get("/:id/edit", middleware.isLoggedIn, function(req, res) {
    Testimonial.findById(req.params.id, function(err, testimonial) {
        if (err || testimonial === undefined) {
            console.log(err);
            res.redirect("back");
        } else {
            res.render("testimonials/edit", { testimonial: testimonial });
        }
    });
});

// update testimonial
router.put("/:id", middleware.isLoggedIn, function(req, res) {
    Testimonial.findByIdAndUpdate(req.params.id, req.body.testimonial, function(err, testimonial) {
        if (err || testimonial === undefined) {
            console.log(err);
            req.flash("error", "Something went wrong. Your testimonial was not updated");
            res.redirect("back");
        } else {
            req.flash("success", "You have successfully updated a testimonial");
            res.redirect("/testimonials");
        }
    });
});

// delete testimonial
router.delete("/:id", middleware.isLoggedIn, function(req, res){
    Testimonial.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
            req.flash("error", "Something went wrong. Your testimonial was not deleted.");
            res.redirect("/testimonials");
        } else {
            req.flash("success", "You successfully deleted a testimonial.");
            res.redirect("/testimonials"); 
        }
    });
});

module.exports = router;
