var express = require("express");
var router  = express.Router({mergeParams: true});
var Player = require("../models/player");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find player by id
    console.log(req.params.id);
    Player.findById(req.params.id, function(err, player){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {player: player});
        }
    })
});

//Comments Create
router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup player using ID
   Player.findById(req.params.id, function(err, player){
       if(err){
           console.log(err);
           res.redirect("back");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               player.comments.push(comment);
               player.save();
               console.log(comment);
               req.flash('success', 'Created a comment!');
               res.redirect('/players/' + player._id);
           }
        });
       }
   });
});

router.get("/:commentId/edit", middleware.isLoggedIn, function(req, res){
    // find player by id
    Comment.findById(req.params.commentId, function(err, comment){
        if(err){
            console.log(err);
        } else {
             res.render("comments/edit", {player_id: req.params.id, comment: comment});
        }
    })
});

router.put("/:commentId", function(req, res){
   Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, comment){
       if(err){
          console.log(err);
           res.render("edit");
       } else {
           res.redirect("/players/" + req.params.id);
       }
   }); 
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Comment deleted");
           res.redirect("/players/" + req.params.id);
       }
    });
});

module.exports = router;