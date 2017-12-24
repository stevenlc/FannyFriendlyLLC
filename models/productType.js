var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

var productTypeSchema = new mongoose.Schema({
    id: Number,
    name: String
});

module.exports = mongoose.model("ProductType", productTypeSchema);
