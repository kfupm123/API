const express = require("express");
const router = express.Router();
const {
  addWarning,
  getAllWarnings,
  deleteWarning,
} = require("../controllers/warning");
router.post("/create-warning/:id", addWarning);
router.get("/get-warnings", getAllWarnings);
router.delete("/warnings/:id", deleteWarning);
module.exports = router;
