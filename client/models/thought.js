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
},
{
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
});
  
const thought = model("thought", thoughtSchema);
  
module.exports = thought;

