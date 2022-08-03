const express = require("express");
const router = express.Router();
const {
  sendDrivers,
  getAllUsers,
  deleteUser,
  updateUserLocation,
} = require("../controllers/users");
router.get("/get-drivers", sendDrivers);
router.get("/get-users", getAllUsers);
router.delete("/users/:email", deleteUser);
router.put("/users/location/:id", updateUserLocation);
module.exports = router;
