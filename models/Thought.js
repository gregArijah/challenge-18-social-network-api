const { Schema, model } = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./Reaction'); 

// Schema to create User model  
const thoughtSchema = new Schema(  //define user model in the following schema
  {
    thoughtText: {   //string,required,must be between 1 and 280 characters
      type: String, 
      required: true, 
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (dateCreated)=>moment(dateCreated).format('MMM D,YYYY [@] H:mm')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]   
  },
  {
    toJSON: {
        virtuals: true
    },
    id:false
  } 
);


// Create a virtual property `reactionCount` that gets the amount of reactions per post
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reaction.length;
  });
  
  // Initialize our Post model
  const Thought = model('Thought', thoughtSchema);
  
  module.exports = Thought;