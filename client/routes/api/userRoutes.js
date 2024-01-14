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

// setting up GET and POST routes at /api/thoughts
router
.route("/")
.get(findAllUsers)
.post(createU);

// /api/users/:id
router
.route("/:id")
.get(findUById)
.put(updateU)
.delete(deleteU);

// /api/users/:userId/friends/:friendId
router
.route("/:userId/friends/:friendId")
.post(addFriend)
.delete(removeFriend);

module.exports = router;
