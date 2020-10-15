// ================================
// ====       IMPORTS          ====
// ================================
// NPM Imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

// Config Import
const config = require('./config');

// Route Imports
const mainRoutes = require('./routes/main');
const trailRoutes = require('./routes/trails');
const commentRoutes = require('./routes/comments');
const authRoutes = require('./routes/auth');

// Model Imports
const Trail = require("./models/trail");
const Comment = require("./models/comment");
const User = require("./models/user");

// ================================
// ====      DEVELOPMENT       ====
// ================================
// Morgan
app.use(morgan('tiny'));

// Seed the DB
// const seed = require('./utils/seed');
// seed();


// ================================
// ====        CONFIG          ====
// ================================
// Body Parser Config
app.use(bodyParser.urlencoded({extended: true}));

// Mongoose Config (Connect to DB)
mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

// Express Config
app.set("view engine", "ejs");
app.use(express.static('public'));

// Express Session Config
app.use(expressSession({
	secret: "jdivncvdsrnvfgdjieojrt984uer543erfndknd4cft54egytrefgtr4r56yhbvfe4ty543wefr43r4",
	resave: false,
	saveUninitialized: false
}));

// Method Override Config
app.use(methodOverride('_method'));

// Passport config 
app.use(passport.initialize());
app.use(passport.session());	// allows persistent sessions
passport.serializeUser(User.serializeUser()); 	// encodes data into the session (passport-local-mongoose)
passport.deserializeUser(User.deserializeUser()); // decodes data from the stored session
passport.use(new LocalStrategy(User.authenticate())); // use the local strategy

// Current User Middleware Config
// to allow user object to be passed in & accessed from any route
app.use((req, res, next) => {
	res.locals.user = req.user;
	next();
});

// Route Config
app.use("/", mainRoutes);
app.use("/", authRoutes);
app.use("/trails", trailRoutes);
app.use("/trails/:id/comments", commentRoutes);


// ================================
// ====        LISTEN          ====
// ================================
app.listen(3000, () => {
	console.log("yelp_hikes is running...");
});