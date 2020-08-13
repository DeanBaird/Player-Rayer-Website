var express = require("express");
var router = express.Router();
var Player = require("../models/player");
var Review = require("../models/review");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// //INDEX - show all players
// router.get("/", function(req, res){
//     // Get all players from DB
//     Player.find({}, function(err, allPlayers){
//        if(err){
//            console.log(err);
//        } else {
//           res.render("players/index",{players: allPlayers, page: 'players'});
//        }
//     });
// });


//CREATE - add new player to DB
router.post("/",middleware.isLoggedIn, function(req, res){
    // get data from form and add to players array
    var name = req.body.name;
	var position = req.body.position;
	var team = req.body.team;
    var image = req.body.image;
    var age = req.body.age;
	var author ={
		id: req.user._id,
		username: req.user.username
	}
    var newPlayer = {name: name, position: position, team: team, image: image, age: age, author:author}
    // Create a new player and save to DB
    Player.create(newPlayer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to players page
            res.redirect("/clubs/aberdeen");
        }
    });
});

//NEW - show form to create new player
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("players/new"); 
});

// SHOW - shows more info about one player
router.get("/:id", function(req, res){
    //find the player with provided ID
    Player.findById(req.params.id).populate("comments").populate({
        path: "reviews",
        options: {sort: {createdAt: -1}}
    }).exec(function(err, foundPlayer){
        if(err || !foundPlayer){
           req.flash("error", "Player not found");
		   res.redirect("back")
        } else {
            console.log(foundPlayer)
            //render show template with that player
            res.render("players/show", {player: foundPlayer});
        }
    });
});

//EDIT PLAYER ROUTE

router.get("/:id/edit", middleware.checkPlayerOwnership, function(req, res){
    //find the player with provided ID
    Player.findById(req.params.id, function(err, foundPlayer){
        if(err){
            console.log(err);
        } else {
            //render show template with that player
            res.render("players/edit", {player: foundPlayer});
        }
    });
});

// UPDATE PLAYER ROUTE

router.put("/:id", middleware.checkPlayerOwnership, function(req, res){
	delete req.body.player.rating;
	// find and update correct players
	Player.findByIdAndUpdate(req.params.id, req.body.player, function(err, updatedPlayer){
		if(err){
			res.redirect("back");
		}else{
				//redirect
			res.redirect("/players/" + req.params.id);
		}
	})
	

});

// DESTROY PLAYER ROUTE
router.delete("/:id", middleware.checkPlayerOwnership, function (req, res) {
    Player.findById(req.params.id, function (err, player) {
        if (err) {
            res.redirect("back");
        } else {
            // deletes all comments associated with the player
            Comment.deleteOne({"_id": {$in: player.comments}}, function (err) {
                if (err) {
                    console.log(err);
                    return res.redirect("back");
                }
                // deletes all reviews associated with the player
                Review.deleteOne({"_id": {$in: player.reviews}}, function (err) {
                    if (err) {
                        console.log(err);
                        return res.redirect("/back");
                    }
                    //  delete the players
                    player.remove();
                    req.flash("success", "Player deleted successfully!");
                    res.redirect("/clubs/aberdeen");
                });
            });
        }
    });
});




router.delete("/:id",async(req, res) => {
  try {
    let foundPlayer = await Player.findById(req.params.id);
    await foundPlayer.remove();
    res.redirect("/players");
  } catch (error) {
    console.log(error.message);
    res.redirect("/players");
  }
});

module.exports = router;