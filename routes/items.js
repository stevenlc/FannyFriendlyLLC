var express = require('express');
var router = express.Router({mergeParams: true});
var Product = require('../models/product');
var Item = require('../models/item');
var middleware = require('../middleware');
var ObjectId = require('mongoose').Types.ObjectId;

// NEW - create one new item
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Product.findOne({ url: req.params.producturl }, function(err, product) {
        if (err || product === undefined) {
            console.log(err); 
        } else {
            res.render("items/new", { product: product}); 
        }
    });
});


// SHOW one item
router.get("/:itemurl", function(req, res) {
    Item.findOne({ url: req.params.itemurl }, function(err, item) {
        if (err || item === undefined) {
            console.log(err);
            req.flash("error", "Sorry, that item does not exist!");
            res.redirect("back");
        } else {
            res.render("items/show", { item: item , producturl: req.params.producturl }); 
        }
    });
});

// CREATE new item - called when Submit button is called on NEW page
router.post("/", middleware.isLoggedIn, function(req, res) {
    Product.findOne({ url: req.params.producturl }, function(err, product) {
        if (err || product === undefined) {
            console.log(err);
            res.redirect("back");
        } else {
            // do a sanity check to see if the item url already exists
            Item.findOne({ url: req.body.item.url }, function(err, item) {
                if (err || item === undefined) {
                    console.log(err); 
                } else if (item === null) {
                    // this means the item url does not exist 
                    // this is good.
                    // create the item
                    // create new item
                    Item.create(req.body.item, function(err, item) {
                        if (err) {
                            console.log(err); 
                        } else {
                            // add item to product
                            product.items.push(item);
                            product.save();
                            console.log("Item " + item.name + " added to " + product.name);
                            console.log(item);
                            req.flash("Successfully created item!");
                            res.redirect("/products/" + product.url);
                        } 
                    });
                } else {
                    // this means the item url exists
                    // if so, this is bad.
                    // redirect the user back and ask them to change it
                    console.log("USER ERROR: The item URL already exists. It needs to be changed.");
                    res.render("items/new", {  product: product, item: req.body.item, renew: true});
                }
            });
        }
    });
});

// EDIT item form
router.get("/:itemurl/edit", middleware.isLoggedIn, function(req, res) {
    Item.findOne({ url: req.params.itemurl }, function(err, item) {
        if (err || item === undefined) {
            console.log(err);
            res.redirect("back");
        } else {
            res.render("items/edit", { item: item , producturl: req.params.producturl });
        }
    });
});

// UPDATE item
// this PUT request is called when Submit on the EDIT item page is clicked
router.put("/:itemurl", middleware.isLoggedIn, function(req, res) {
    Item.findOneAndUpdate({ url: req.params.itemurl }, req.body.item, function(err, item) {
        if (err || item === undefined) {
            console.log(err);
            req.flash("error", "Something went wrong. Your item was not updated");
            res.redirect("back");
        } else {
            req.flash("success", "You have successfully updated an item");
            res.redirect("/products/" + req.params.producturl + "/" + req.params.itemurl);
        }
    });
});

// DELETE item
router.delete("/:itemurl", middleware.isLoggedIn, function(req, res){
    Item.findOneAndRemove({ url: req.params.itemurl }, function(err, item) {
        if (err) {
            console.log(err);
            req.flash("error", "Something went wrong. Your item was not deleted.");
            res.redirect("/products/" + req.params.producturl + "/" + req.params.itemurl);
        } else {
            // also remove the item from its associated product
            Product.update({ url: req.params.producturl}, 
                { $pull: { "items": new ObjectId(item._id) }},
                function(err) {
                    if (err) console.log(err);
                });
            req.flash("success", "You successfully deleted an item.");
            res.redirect("/products/" + req.params.producturl); 
        }
    });
});

module.exports = router;
