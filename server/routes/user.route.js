const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

router.get("/:userId/find", UserController.getUser);
router.put("/:userId/edit", UserController.updateUser);
router.post("/:userId/address/insert", UserController.insertAddress);
router.delete("/:userId/address/delete", UserController.deleteAddress);
router.put("/:userId/address/default", UserController.setDefaultAddress);

module.exports = router;
