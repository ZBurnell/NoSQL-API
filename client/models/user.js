const {Schema, model} = require("mongoose");

// Schema to control the users profile
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^([a-zA-Z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,3})$/, "Sorry your email was invalid. Please verify your credentials",]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought"
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    ]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// A virtual `friendCount` that retrieves the length of the user's `friends` array field on query.
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });

// Creating the model `user` using Schema
const User = model("User", userSchema);
module.exports = User;