var mongoose = require('mongoose');

var serviceSchema = new mongoose.Schema({
    name: String,
    url: String,
    price: String,
    image: String,
    description: String
});

module.exports = mongoose.model("Service", serviceSchema);
