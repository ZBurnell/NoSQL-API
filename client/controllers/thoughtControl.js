const { Thought, User } = require("../models");
const { populate } = require("../models/user");

const thoughtControl = {
// find all thoughts on a users profile
    findAllThoughts(req, res) {
        Thought.find().then((thought) => res.json(thought)).catch((err) => res.status(500).json(err));
    },

// create a new thought
    createT (req, res) {
        Thought.create(req.body)
        .then((dbThoughtData) => {
            return User.findOneAndUpdate(
                {_id:req.body.userID},
                {$push:{ thoughts:dbThoughtData._id}},
                {new:true})
        })  .then(userData => res.json(userData))
            .catch((err) => res.status(500).json(err));
    },

// update thought by it's id
    updateT (req, res) {
        Thought.findOneAndUpdate({
            _id: req.params.id
        }, 
        {
            $set: req.body
        }, 
        {
            runValidators: true,
            new: true
        })  .then((thought) => {
                !thought ? res.status(404).json({message: 'No thought found matching that ID'}) : res.json(thought);
        })  .catch((err) => res.status(500).json(err)); 
    },
 
// find a thought by it's id
    findTById({ params }, res) {
    Thought.findOne({ _id: params.id })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {res.status(404).json({ message: "No thought found matching that ID" });
            return;
            }   res.json(dbThoughtData);
        })  .catch((err) => {console.log(err);
                res.status(400).json(err);
        });
    },
 
// delete a thought by it's id
    deleteT(req, res) {
        Thought.findOneAndDelete({_id: req.params.id})
        .then((thought) => {
            if(!thought) {res.status(404).json({message: 'No thought found matching that ID'}) 
            }      
            return User.findOneAndUpdate(
                {_id:req.body.userID},
                {$pull:{thoughts:thought._id}},
                {new:true})
        })  .then(() => res.json({message: 'Thought has been deleted successfully!'})).catch((err) => res.status(500).json(err));
    },
}

module.exports = thoughtControl;