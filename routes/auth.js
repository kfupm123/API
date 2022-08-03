const express = require("express");
const router = express.Router();
const {
  createUser,
  login,
  checkLogin,
} = require("../controllers/auth");
router.post("/login", login);
router.post("/create-user", createUser);
router.post('/checklogin',checkLogin);
module.exports = router;