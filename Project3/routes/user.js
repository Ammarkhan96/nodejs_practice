const express = require("express")
const { handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateNewUser } = require("../controllers/user")

const router = express.Router()

//run (http://localhost:5000/api/users)

router.route("/").get(handleGetAllUsers).post(handleCreateNewUser)


router
    .route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)

// router.post("/", handleCreateNewUser)


module.exports = router