const router = require("express").Router();

const {
  findAllThoughts,
  findTById,
  createT,
  updateT,
  deleteT,
} = require("../../controllers/thoughtControl");

// setting up GET and POST routes at /api/thoughts
router.route("/")
.get(findAllThoughts)
.post(createT);

// router allowing the API to find/update/delete user thoughts by ID
router
.route("/:id")
.get(findTById)
.put(updateT)
.delete(deleteT);

module.exports = router;