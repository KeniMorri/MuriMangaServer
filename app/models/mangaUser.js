// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

var mangaUserSchema = mongoose.Schema({
  userID          : String,
  recentlyRead    : [String],
  mangas          : [{
    mangaUrl      : String,
    category      : [String],
    chapters      : [String]
  }]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('MangaUser', mangaUserSchema);