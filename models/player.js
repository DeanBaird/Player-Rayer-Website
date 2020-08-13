var mongoose = require("mongoose");

var playerSchema = new mongoose.Schema({
   name: String,
   position: String,
   team: String,
   image: String,
   age: String,
  createdAt: { type: Date, default: Date.now },
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ],
	reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    rating: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Player", playerSchema);


var mongoose = require("mongoose");


var mongoose = require("mongoose");


 
   