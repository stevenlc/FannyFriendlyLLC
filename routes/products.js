var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Item = require('../models/item');
var middleware = require('../middleware');

// INDEX - show all products
router.get("/", function(req, res) {
    Product.find({}, function(err, products) {
        if (err) {
            req.flash("error", "Sorry, something went wrong when fetching the list of products.");
            console.log(err);
        } else {
            res.render("products/index", { products: products });
        }
    }).sort({ name: "asc" });
});

// NEW product form
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("products/new");
});


// SHOW - details for one product
router.get("/:producturl", function(req, res) {
    Product.findOne({ url: req.params.producturl }).populate("items").exec(function(err, product) {
        if (err || product === undefined) {
            console.log(err);
            req.flash("error", "Sorry, the product you selected does not exist!");
            res.redirect("/products");
        } else {
            res.render("products/show", { product: product }); 
        }
    });
});

// CREATE - this is called when the Submit button is clicked on the New product form
router.post("/", middleware.isLoggedIn, function(req, res) {
    // try to see if product url already exists
    Product.findOne({ url: req.body.product.url }, function(err, product) {
        if (err || product === undefined) {
            console.log(err); 
        } else if (product === null) {
            // this means the url does not already exist
            // this is good
            // create the product
            Product.create(req.body.product, function(err, product) {
                if (err || product === undefined) {
                    console.log(err);
                    res.redirect("back");
                } else {
                    console.log("Product " + product.name + " added.");
                    req.flash("success", "You have successfully added a new product.");
                    res.redirect("/products");
                }
            });
        } else {
            // this means the product url exists
            // this is bad
            // show error and tell user to change url
            console.log("USER ERROR: The product URL already exists. It needs to be changed.");
            console.log(req.body.product)
            res.render("products/new", { product: req.body.product, renew: true});
        }
    });
});

// EDIT product form
router.get("/:producturl/edit", middleware.isLoggedIn, function(req, res) {
    Product.findOne({ url: req.params.producturl }, function(err, product) {
        if (err || product === undefined) {
            console.log(err);
            res.redirect("back");
        } else {
            res.render("products/edit", { product: product });
        }
    });
});

// UPDATE product - called when the Submit button is clicked on EDIT page
router.put("/:producturl", middleware.isLoggedIn, function(req, res) {
    Product.findOneAndUpdate({ url: req.params.producturl }, req.body.product, function(err, product) {
        if (err || product === undefined) {
            console.log(err);
            req.flash("error", "Something went wrong. Your product was not updated");
            res.redirect("back");
        } else {
            req.flash("success", "You have successfully updated a product");
            res.redirect("/products/" + req.params.producturl);
        }
    });
});

// DELETE  product - called when Delete button is hit on SHOW  page
router.delete("/:producturl", middleware.isLoggedIn, function(req, res){
    Product.findOne({ url: req.params.producturl}, function(err, product) {
        if (err) {
            console.log(err);
            req.flash("error", "Something went wrong. Your product was not deleted.");
            res.redirect("/products");
        } else {
            if (product.items.length > 0) {
                // this means there are existing Items in the Product 
                // admin must delete these Items first before we allow Product
                // to be deleted
                req.flash("error", "You must delete existing items first before a DELETE product operation will be permitted.");
                res.redirect("back");
            } else {
                Product.findOneAndRemove({ url: req.params.producturl }, function(err) {
                    if (err) {
                        console.log(err);
                        req.flash("error", "Something went wrong. Your product was not deleted.");
                        res.redirect("/products/" + req.params.producturl);
                    } else {
                        req.flash("success", "You successfully deleted a product.");
                        res.redirect("/products"); 
                    }
                });
            }
        }
    })
});

module.exports = router;
