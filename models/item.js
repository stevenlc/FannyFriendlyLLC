var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
    name: String,
    url: String,
    price: String,
    image: String,
    description: String
});

module.exports = mongoose.model("Item", itemSchema);
