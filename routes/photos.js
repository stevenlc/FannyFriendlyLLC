var express = require('express');
var router = express.Router();
var Photo = require('../models/photo');
var middleware = require('../middleware');

// show all photos page
router.get("/", function(req, res) {
    Photo.find({}, function(err, photos) {
        if (err) {
            console.log(err);
        } else {
            res.render("photos/index", { photos: photos });
        }
    });
});

// new photo form
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("photos/new");
});

// create new photo
router.post("/", middleware.isLoggedIn, function(req, res) {
    var newphoto = req.body.photo;
    Photo.create(newphoto, function(err, photo) {
        if (err || photo === undefined) {
            console.log(err);
            res.redirect("back");
        } else {
            console.log("photo by " + photo.author + " added.");
            req.flash("success", "You have successfully added a new photo.");
            res.redirect("/photos");
        }
    });
});

// edit photo form
router.get("/:id/edit", middleware.isLoggedIn, function(req, res) {
    Photo.findById(req.params.id, function(err, photo) {
        if (err || photo === undefined) {
            console.log(err);
            res.redirect("back");
        } else {
            res.render("photos/edit", { photo: photo });
        }
    });
});

// update photo
router.put("/:id", middleware.isLoggedIn, function(req, res) {
    Photo.findByIdAndUpdate(req.params.id, req.body.photo, function(err, photo) {
        if (err || photo === undefined) {
            console.log(err);
            req.flash("error", "Something went wrong. Your photo was not updated");
            res.redirect("back");
        } else {
            req.flash("success", "You have successfully updated a photo");
            res.redirect("/photos");
        }
    });
});

// delete photo
router.delete("/:id", middleware.isLoggedIn, function(req, res){
    Photo.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
            req.flash("error", "Something went wrong. Your photo was not deleted.");
            res.redirect("/photos");
        } else {
            req.flash("success", "You successfully deleted a photo.");
            res.redirect("/photos"); 
        }
    });
});

module.exports = router;
