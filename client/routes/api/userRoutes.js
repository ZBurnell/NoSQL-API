const router = require("express").Router();

const {
  findAllUsers,
  findUById,
  createU,
  updateU,
  deleteU,
  addFriend,
  removeFriend,
} = require("../../controllers/userControl");

// Use this route in Insomnia for Thoughts "/api/thoughts"
router
.route("/")
.get(findAllUsers)
.post(createU);

// Use this route in Insomnia for Users "/api/users/:id"
router
.route("/:id")
.get(findUById)
.put(updateU)
.delete(deleteU);

// Use this route in Insomnia for Friends "/api/users/:userId/friends/:friendId"
router
.route("/:userId/friends/:friendId")
.post(addFriend)
.delete(removeFriend);

module.exports = router;
