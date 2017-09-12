var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

// use passportjs to create additional User functions
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
