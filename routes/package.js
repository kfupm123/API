const express = require("express");
const router = express.Router();
const {
  addPackage,
  getAllPackages,
  deletePackage,
  updatePackageStatus,
  getDriverPackages,
  getDriversPackages,
  updatePackageLocation,
  updatePackageRTA,
} = require("../controllers/package");
router.post("/create-package", addPackage);
router.get("/get-packages", getAllPackages);
router.get("/get-packages/:id", getDriverPackages);
router.get("/get-packages-edd", getDriversPackages);
router.delete("/packages/:id", deletePackage);
router.put("/packages/:id", updatePackageStatus);
router.put("/packages/location/:id", updatePackageLocation);
router.put("/packages/rta/:id", updatePackageRTA);
module.exports = router;
