// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

var mangaSchema = mongoose.Schema({
  mangaUrl      : { type: String, unique: true },
  mangaName     : String,
  mangaAltName  : String,
  mangaDesc     : String,
  mangaImageUrl : String,
  author        : String,
  artist        : String,
  genres        : [String],
  lastUpdated   : Date,
  lastChapter   : String,
  lastChapterUrl: String,
  chapters      : [{
    chapterUrl  : String,
    chapterName : String,
    date        : Date,
    sort        : String
  }]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Manga', mangaSchema);
