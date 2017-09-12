var mongoose = require('mongoose');

var photoSchema = new mongoose.Schema({
    image: String,
    caption: String
});

module.exports = mongoose.model("Photo", photoSchema);
