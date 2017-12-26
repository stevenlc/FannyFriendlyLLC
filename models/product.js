var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

var productSchema = new mongoose.Schema({
    name: String,
    url: String,
    image: String,
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item"
        } 
    ]
});

module.exports = mongoose.model("Product", productSchema);
