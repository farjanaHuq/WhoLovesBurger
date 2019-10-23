const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   firstName: {
      type: String,
      trim: true,
      required: true
   },
   lastName: {
      type: String,
      trim: true,
      required: true
   },
   displayName: {
      type: String,
      trim: true,
      required: true
   },
   password:{
      type: String,
      trim: true,
      required: true,
      validate: [
         function(input){
            return input.length>=6;
         },
         "Password should be longer the 6 character."
      ]
   },
   // salt: {
   //    type: String
   // },
   // hash: {
   //    type: String
   //},
   date: {
      type: Date,
      default: Date.now
   },
   email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address."]
   },
   emailValidated: {
      type: Boolean,
      default: false
   }
});


// userSchema.methods.getFullName = function(){
//    this.fullName = this.firstName + " " + this.lastName;
//    return this.fullName;
// },
// userSchema.methods.lastUpdatedDate = function(){
//    this.lastUpdated = Date.now();
//    return this.lastUpdated;
// }
const User = mongoose.model('User', userSchema);

module.exports = User;