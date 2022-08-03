const Package = require("../models/package");
const User = require("../models/user");
const moment = require("moment");
exports.addPackage = async (req, res) => {
  try {
    const package = req.body;
    package.id = Date.now();
    const savedPackage = new Package(package);
    savedPackage.save().then((pck) => {
      return res.status(200).json({
        pck,
      });
    });
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find(
      {},
      { createdAt: 0, updatedAt: 0, _id: 0 }
    )
      .populate("deliveredBy", "firstName lastName")
      .sort({ updatedAt: -1 });
    if (packages.length > 0) {
      res.status(200).json({ packages });
    } else {
      res.status(404).json({
        message: "Not Found.",
      });
    }
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};
exports.deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    await Package.findOneAndDelete({ id }).exec((err, package) => {
      if (err) {
        res.status(400).json({
          err,
        });
      } else if (package) {
        res.status(200).json({
          package,
        });
      } else {
        res.status(404).json({
          message: "Not Found",
        });
      }
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};
exports.updatePackageStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  Package.findOneAndUpdate({ id }, { status: status }, (err) => {
    if (err) {
      res.status(400).json({
        err,
      });
    } else {
      res.status(204).json({
        message: "Package updated Successfully.",
      });
    }
  });
};
exports.getDriverPackages = async (req, res) => {
  try {
    const { id } = req.params;
    now = moment();
    start = now.startOf("day").toISOString();
    end = now.endOf("day").toISOString();
    User.findOne({ id }).then((data) => {
      if (data) {
        const { _id } = data;
        Package.find({
          deliveredBy: _id,
          EDD: { $gte: start, $lte: end },
        }).then((packages) => {
          res.status(200).json({
            message: "success",
            packages,
          });
        });
      } else {
        res.status(404).json({
          message: "Driver Not Found.",
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};
exports.getDriversPackages = async (req, res) => {
  try {
    now = moment();
    start = now.startOf("day").toISOString();
    end = now.endOf("day").toISOString();
    User.find(
      { role: "driver" },
      {
        password: 0,
        email: 0,
        createdAt: 0,
        updatedAt: 0,
        role: 0,
        score: 0,
        warning: 0,
      }
    ).then(async (drivers) => {
      if (drivers && drivers.length > 0) {
        let Drivers = [];
        for (driver of drivers) {
          let Driver = {};
          Driver.id = driver.id;
          Driver.firstName = driver.firstName;
          Driver.lastName = driver.lastName;
          Driver.lastLocation = driver.lastLocation;
          const { _id } = driver;
          await Package.find({
            deliveredBy: _id,
            EDD: { $gte: start, $lte: end },
          }).then((packages) => {
            Driver.packages = packages;
            Drivers.push(Driver);
          });
        }
        res.status(200).json({
          Drivers,
        });
      } else {
        res.status(404).json({
          message: "Driver Not Found.",
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};

exports.updatePackageLocation = async (req, res) => {
  const { id } = req.params;
  const { location } = req.body;
  if (location.hasOwnProperty("lat") && location.hasOwnProperty("lng")) {
    Package.findOneAndUpdate({ id }, { lastLocation: location }, (err, pkg) => {
      if (err) {
        res.status(400).json({
          err,
        });
      } else {
        res.status(204).json({
          message: "Location updated Successfully.",
        });
      }
    });
  } else {
    res.status(400).json({
      message: "Some coordinate is missing.",
    });
  }
};
exports.updatePackageRTA = async (req, res) => {
  const { id } = req.params;
  const { RTA } = req.body;
  Package.findOneAndUpdate({ id }, { RTA: RTA }, (err, pkg) => {
    if (err) {
      res.status(400).json({
        err,
      });
    } else {
      res.status(204).json({
        message: "RTA updated Successfully.",
      });
    }
  });
};
