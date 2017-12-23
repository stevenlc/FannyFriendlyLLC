var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var middleware = require('../middleware');

// show all products page
router.get("/", function(req, res) {
    Product.find({}, function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.render("products/index", { products: products });
        }
    });
});

// new product form
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("products/new");
});


// show one product
router.get("/:produrl", function(req, res) {
    Product.findOne({ produrl: req.params.produrl }, function(err, product) {
        if (err || product === undefined) {
            console.log(err);
            req.flash("error", "Sorry, that product does not exist!");
            res.redirect("/products");
        } else {
            res.render("products/show", { product: product }); 
        }
    });
});

// create new product
router.post("/", middleware.isLoggedIn, function(req, res) {
    var newProduct = req.body.product;
    Product.create(newProduct, function(err, product) {
        if (err || product === undefined) {
            console.log(err);
            res.redirect("back");
        } else {
            console.log("Product " + product.name + " added.");
            req.flash("success", "You have successfully added a new product.");
            res.redirect("/products");
        }
    });
});

// edit product form
router.get("/:produrl/edit", middleware.isLoggedIn, function(req, res) {
    Product.findOne({ produrl: req.params.produrl }, function(err, product) {
        if (err || product === undefined) {
            console.log(err);
            res.redirect("back");
        } else {
            res.render("products/edit", { product: product });
        }
    });
});

// update product
// this PUT request is called when Submit on the edit product page is clicked
router.put("/:produrl", middleware.isLoggedIn, function(req, res) {
    Product.findOneAndUpdate({ produrl: req.params.produrl }, req.body.product, function(err, product) {
        if (err || product === undefined) {
            console.log(err);
            req.flash("error", "Something went wrong. Your product was not updated");
            res.redirect("back");
        } else {
            req.flash("success", "You have successfully updated a product");
            res.redirect("/products/" + req.params.produrl);
        }
    });
});

// delete product
router.delete("/:produrl", middleware.isLoggedIn, function(req, res){
    Product.findOneAndRemove({ produrl: req.params.produrl }, function(err) {
        if (err) {
            console.log(err);
            req.flash("error", "Something went wrong. Your product was not deleted.");
            res.redirect("/products");
        } else {
            req.flash("success", "You successfully deleted a product.");
            res.redirect("/products"); 
        }
    });
});

module.exports = router;
