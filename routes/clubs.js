var express = require("express");
var router = express.Router();
var Player = require("../models/player");
var Review = require("../models/review");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//ABERDEEN - show aberdeen players
router.get("/aberdeen", function(req, res){
    // Get aberdeen players from DB
    Player.find({}, function(err, allPlayers){
       if(err){
           console.log(err);
       } else {
          res.render("clubs/aberdeen",{players: allPlayers, page: 'aberdeen'});
       }
    });
});

//CELTIC - show celtic players
router.get("/celtic", function(req, res){
    // Get aberdeen players from DB
    Player.find({}, function(err, allPlayers){
       if(err){
           console.log(err);
       } else {
          res.render("clubs/celtic",{players: allPlayers, page: 'celtic'});
       }
    });
});

//DUNDEE UTD - show dundeeunited players
router.get("/dundeeunited", function(req, res){
    // Get dundeeunited players from DB
    Player.find({}, function(err, allPlayers){
       if(err){
           console.log(err);
       } else {
          res.render("clubs/dundeeunited",{players: allPlayers, page: 'dundeeunited'});
       }
    });
});

//HAMILTON - show hamiltonacademical players
router.get("/hamiltonacademical", function(req, res){
    // Get hamiltonacademical players from DB
    Player.find({}, function(err, allPlayers){
       if(err){
           console.log(err);
       } else {
          res.render("clubs/hamiltonacademical",{players: allPlayers, page: 'hamiltonacademical'});
       }
    });
});

//HIBS - show hibernian players
router.get("/hibernian", function(req, res){
    // Get hibernian players from DB
    Player.find({}, function(err, allPlayers){
       if(err){
           console.log(err);
       } else {
          res.render("clubs/hibernian",{players: allPlayers, page: 'hibernian'});
       }
    });
});

//KILLIE - show kilmarnock players
router.get("/kilmarnock", function(req, res){
    // Get kilmarnock players from DB
    Player.find({}, function(err, allPlayers){
       if(err){
           console.log(err);
       } else {
          res.render("clubs/kilmarnock",{players: allPlayers, page: 'kilmarnock'});
       }
    });
});

//LIVINGSTON - show livingston players
router.get("/livingston", function(req, res){
    // Get livingston players from DB
    Player.find({}, function(err, allPlayers){
       if(err){
           console.log(err);
       } else {
          res.render("clubs/livingston",{players: allPlayers, page: 'livingston'});
       }
    });
});

//MOTHERWELL - show motherwell players
router.get("/motherwell", function(req, res){
    // Get motherwell players from DB
    Player.find({}, function(err, allPlayers){
       if(err){
           console.log(err);
       } else {
          res.render("clubs/motherwell",{players: allPlayers, page: 'motherwell'});
       }
    });
});

//RANGERS - show rangers players
router.get("/rangers", function(req, res){
    // Get rangers players from DB
    Player.find({}, function(err, allPlayers){
       if(err){
           console.log(err);
       } else {
          res.render("clubs/rangers",{players: allPlayers, page: 'rangers'});
       }
    });
});

//ROSS COUNTY - show rosscounty players
router.get("/rosscounty", function(req, res){
    // Get rosscounty players from DB
    Player.find({}, function(err, allPlayers){
       if(err){
           console.log(err);
       } else {
          res.render("clubs/rosscounty",{players: allPlayers, page: 'rosscounty'});
       }
    });
});

//ST JOHNSTONE - show stjohnstone players
router.get("/stjohnstone", function(req, res){
    // Get aberdeen players from DB
    Player.find({}, function(err, allPlayers){
       if(err){
           console.log(err);
       } else {
          res.render("clubs/stjohnstone",{players: allPlayers, page: 'stjohnstone'});
       }
    });
});

//ST MIRREN - show stmirren players
router.get("/stmirren", function(req, res){
    // Get stmirren players from DB
    Player.find({}, function(err, allPlayers){
       if(err){
           console.log(err);
       } else {
          res.render("clubs/stmirren",{players: allPlayers, page: 'stmirren'});
       }
    });
});


module.exports = router;