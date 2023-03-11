const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
// i try JWT token almost one day i was facing ERROR "Cannot destructure property 'token' of 'req.cookies' as it is undefined."
// when i create a user token is created but after that , when i try getUser or other Api ,then i face error
const { isAuthenticated } = require("../middleware/auth");

router.post("/", userController.createUser);
// router.get("/", isAuthenticated,userController.getUsers);
router.get("/", userController.getUsers);

router.get("/:id", userController.getUser);
router.patch("/:id", userController.updatedUser);
router.delete("/:id", userController.deleteUser);

router.post("/login", userController.login);
router.get("/logout", userController.logout);
module.exports = router;
