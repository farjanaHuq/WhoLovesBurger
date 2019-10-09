//dependencies
var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');

var User = require("./model/userModel");

app.use(express.static('public'));

//Use mongoose looger and promise
app.use(logger('dev'));
// Define middleware here
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// Define any API routes before this runs
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

//save user to the mongoDB
app.post("/submit", function(req,res){
    // var user = new userModel(req.body)
    // user.getFullName();
    // user.lastUpdatedDate();
    // Create a new user using req.body
  User.create(req.body)
  .then(function(dbUser) {
    // If saved successfully, send the the new User document to the client
    res.json(dbUser);
  })
  .catch(function(err) {
    // If an error occurs, send the error to the client
    res.json(err);
  });

})

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/burgerDB",{useNewUrlParser: true })
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log(`DB Connection Error: ${err.message}`)});

//To get rid of the warning: DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true);

var PORT = process.env.PORT || 8080;
// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});


//db.getCollection('user').find({})