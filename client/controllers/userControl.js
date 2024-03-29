const { Thought, User } = require("../models");

const userControl = {
// find all users and friends
    findAllUsers(req, res) {
        User.find({})
            .populate({
            path: "friends",
            select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 })
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    },

// create a new user
    createU({ body }, res) {
        User.create(body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.json(err));
    },

// update user by id
    updateU({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, 
        {
            new: true,
            runValidators: true,
        })  .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found matching that ID" });
            return;
            }
            res.json(dbUserData);
        })  .catch((err) => res.json(err));
    },

// find one user by id
    findUById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: "thoughts",
            select: "-__v",
        })  
        .populate({
            path: "friends",
            select: "-__v",
        })
        .select("-__v")
        .then((dbUserData) => {
            if (!dbUserData) { return res.status(404).json({ message: "No user found matching that ID" });
            } res.json(dbUserData);
        })  .catch((err) => {console.log(err);
            res.sendStatus(400);
        });
    },

// delete a user by id
    deleteU({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then((dbUserData) => {
            if (!dbUserData) { res.status(404).json({ message: "No user found matching that ID" });
            return;
            }   
        Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
        })  .then(() => { res.json({message: "Users thoughts have been wiped from memory" });
        })  .catch((err) => res.json(err));
    },

// add a friend by id
    addFriend({ params }, res) {
        User.findOneAndUpdate(
        { _id: params.userId },
        { $addToSet: { friends: params.friendId } },
        { new: true, runValidators: true })
        .then((dbUserData) => { 
            if (!dbUserData) { res.status(404).json({ message: "No friend found matching that ID" });
            return;
            }   res.json(dbUserData);
        })  .catch((err) => res.json(err));
    },

// delete a friend by id
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true })
        .then((dbUserData) => {
            if (!dbUserData) { res.status(404).json({ message: "No friend found matching that ID" });
            return;    
            }   res.json(dbUserData);
        })  .catch((err) => res.json(err));
    },
};
module.exports = userControl;