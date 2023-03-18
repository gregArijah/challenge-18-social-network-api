const { Schema, model } = require('mongoose');

// Schema to create User model  
const userSchema = new Schema(  //define user model in the following schema
  {
    username: {   //string,unique,required,trimmed
      type: String, 
      required: true, 
      unique: true, 
      trim: true
    },
    email: {    //string, required, unique, include email validation
      type: String, 
      required: true, 
      unique: true, 
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]  //from regex challenge 17
    },
    thoughts: [{    //array of id values referencing the thought model
      type: Schema.Types.ObjectId,
      ref: "Thought"
    }],
    friends: [{    //array of id values self-referencing the user model
      type: Schema.Type.ObjectId,
      ref: "User"
    }],
  },
  {
    // Enable virtuals
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual called friendcount that retreives length od users friends field
userSchema
  .virtual('friendCount')
  .get(function() {   //getter function
    return this.friends.length;
  })


// Initialize our User model
const User = model('user', userSchema);

//export model
module.exports = User;
