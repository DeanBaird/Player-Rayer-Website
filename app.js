var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
    Player  = require("./models/player"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
	flash = require("connect-flash"),
    seedDB      = require("./seeds");
		



// REQUIRING ROUTES 

var commentRoutes 		= require("./routes/comments"),
	reviewRoutes     	= require("./routes/reviews"),
	playerRoutes 		= require("./routes/players"),
	indexRoutes 		= require("./routes/index"),
	clubRoutes 			= require("./routes/clubs");



mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);





mongoose.connect(process.env.DATABASEURL, { 
	useNewUrlParser: true ,
	useCreateIndex: true	
}).then(() => {
	console.log("connected to db")
}).catch(err =>{
	console.log("ERROR:", err.message);
});

// mongoose.connect('mongodb://localhost:27017/player_ratings', { useNewUrlParser: true });

// mongoose.connect('mongodb+srv://DeanBaird:Buddies100!@cluster0.soczx.mongodb.net/<dbname>?retryWrites=true&w=majority', { 
// 	useNewUrlParser: true ,
// 	useCreateIndex: true	
// }).then(() => {
// 	console.log("connected to db")
// }).catch(err =>{
// 	console.log("ERROR:", err.message);
// });



app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB(); seed the database

app.locals.moment = require('moment');
// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Secret text",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error")
   res.locals.success = req.flash("success")
   next();
});

app.use("/", indexRoutes);
app.use("/players", playerRoutes);
app.use("/clubs", clubRoutes);
app.use("/players/:id/comments", commentRoutes);
app.use("/players/:id/reviews", reviewRoutes);

var port = process.env.PORT || 3000;
app.listen(port, function () {
 console.log("Server Has Started!");
});