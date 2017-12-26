var express = require('express');
var router = express.Router();
var Service = require('../models/service');
var middleware = require('../middleware');

// INDEX - show all services
router.get("/", function(req, res) {
    Service.find({}, function(err, services) {
        if (err) {
            req.flash("error", "Sorry, something went wrong when fetching the list of services.");
            console.log(err);
        } else {
            res.render("services/index", { services: services });
        }
    }).sort({ name: "asc" });
});

// NEW service form
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("services/new");
});


// SHOW - details for one service
router.get("/:serviceurl", function(req, res) {
    Service.findOne({ url: req.params.serviceurl }, function(err, service) {
        if (err || service === undefined) {
            console.log(err);
            req.flash("error", "Sorry, the service you selected does not exist!");
            res.redirect("/services");
        } else {
            res.render("services/show", { service: service }); 
        }
    });
});

// CREATE - new service form
router.post("/", middleware.isLoggedIn, function(req, res) {
    var newService = req.body.service;
    Service.create(newService, function(err, service) {
        if (err || service === undefined) {
            console.log(err);
            res.redirect("back");
        } else {
            console.log("Service " + service.name + " added.");
            req.flash("success", "You have successfully added a new service.");
            res.redirect("/services");
        }
    });
});

// EDIT service form
router.get("/:serviceurl/edit", middleware.isLoggedIn, function(req, res) {
    Service.findOne({ url: req.params.serviceurl }, function(err, service) {
        if (err || service === undefined) {
            console.log(err);
            res.redirect("back");
        } else {
            res.render("services/edit", { service: service });
        }
    });
});

// UPDATE service - called when the Submit button is clicked on EDIT page
router.put("/:serviceurl", middleware.isLoggedIn, function(req, res) {
    Service.findOneAndUpdate({ url: req.params.serviceurl }, req.body.service, function(err, service) {
        if (err || service === undefined) {
            console.log(err);
            req.flash("error", "Something went wrong. Your service was not updated");
            res.redirect("back");
        } else {
            req.flash("success", "You have successfully updated a service");
            res.redirect("/service/" + req.params.serviceurl);
        }
    });
});

// DELETE service - called when Delete button is hit on SHOW  page
router.delete("/:serviceurl", middleware.isLoggedIn, function(req, res){
    Service.findOneAndRemove({ url: req.params.serviceurl}, function(err) {
        if (err) {
            console.log(err);
            req.flash("error", "Something went wrong. Your service was not deleted.");
            res.redirect("/services");
        } else {
            req.flash("success", "You successfully deleted a service.");
            res.redirect("/services"); 
        }
    });
});

module.exports = router;
