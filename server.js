//dependencies
var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');

const helpers = require('./routes/helpers/authHelpers');
const jwt = require('jsonwebtoken');
// var jwtMiddleware = require('express-jwt-middleware');
// var jwtCheck = jwtMiddleware(process.env.JWT_SECRET);


// Initialize Express
var app = express();
// Requiring the `User` model for accessing the `users` collection
var authRoutes = require("./routes/authRoutes");

// Make public a static folder
app.use(express.static('public'));


// Define middleware here

// Parse request body as JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Use morgan logger for logging requests
app.use(logger('dev'));


// const auth = jwt({
//   secret: process.env.JWT_SECRET,
//   userProperty: 'payload'
// });

//Routes
app.use("/auth", authRoutes);
// app.use(auth);

// Define any API routes before this runs
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});


// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/burgerDB", { useNewUrlParser: true })
  .then(() => console.log('DB Connected!'))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`)
  });

//To get rid of the warning: DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true);

var PORT = process.env.PORT || 8080;
// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});


//db.getCollection('user').find({})