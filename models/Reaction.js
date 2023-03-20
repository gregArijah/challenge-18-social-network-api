
const { Schema, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema (     //define reaction schema
    {
       reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
       },
       reactionBody: {
        type: String,
        required: true,
        minLength: 1,
        maxlength: 280
       },
       username: {
        type: String,
        required: true,
       },
       createdAt: {
        type: Date,
        default: Date.now,
        get: (dateCreated)=>moment(dateCreated).format('MMM D,YYYY [@] H:mm')
       },
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false,
        versionKey:false
    }
  );

  module.exports = reactionSchema;