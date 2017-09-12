var mongoose = require('mongoose');

var testimonialSchema = new mongoose.Schema({
    author: String,
    text: String
});

module.exports = mongoose.model("Testimonial", testimonialSchema);
