const {Schema, model, Types} = require("mongoose");
const dateJS = require("../utils/date");

// Schema to control the thought section of the DB
const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateJS(createdAtVal),
      },
      username: {
        type: String,
        required: true,
      },
      // reactions: [reactionSchema],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );


// Schema to control the reaction section of the DB  
// const reactionSchema = new Schema(
//     {
//       reactionId: {
//         type: Schema.Types.ObjectId,
//         default: () => new Types.ObjectId(),
//       },
//       reactionBody: {
//         type: String,
//         required: true,
//         maxlength: 280,
//       },
//       username: {
//         type: String,
//         required: true,
//       },
//       createdAt: {
//         type: Date,
//         default: Date.now,
//         get: (createdAtVal) => dateJS(createdAtVal),
//       },
//     },
//     {
//       toJSON: {
//         getters: true,
//       },
//     }
//   );


// Creating a virtual `reactionCount` that allows a user to retrieve the length of the thought's `reaction` array field on query
// thoughtSchema.virtual("reactionCount").get(function () {
//     return this.reactions.length;
//   });
  
  const thought = model("thought", thoughtSchema);
  
  module.exports = thought;

