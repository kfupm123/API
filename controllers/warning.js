const Warning = require("../models/warning");
const User = require("../models/user");
const { calculateScore, calculateWarning } = require("../utils/warning");
exports.addWarning = async (req, res) => {
  try {
    const warn = req.body;
    const { id } = req.params;
    warn.id = Date.now();
    User.findOne({ id }).then((data) => {
      const { _id, score } = data;
      warn.generatedBy = _id;
      const savedWarning = new Warning(warn);
      savedWarning.save().then((wrn) => {
        let calScore = calculateScore(score, warn.severity);
        let calWarning = calculateWarning(calScore);
        User.findOneAndUpdate(
          { id },
          { score: calScore, warning: calWarning }
        ).then(() => {
          res.status(200).json({ wrn, message: "Success." });
        });
      });
    });
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};
exports.getAllWarnings = async (req, res) => {
  try {
    const warnings = await Warning.find(
      {},
      { createdAt: 0, updatedAt: 0, _id: 0 }
    )
      .populate("generatedBy", "firstName lastName")
      .sort({ updatedAt: -1 });
    if (warnings.length > 0) {
      res.status(200).json({ warnings });
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
exports.deleteWarning = async (req, res) => {
  try {
    const { id } = req.params;
    await Warning.findOneAndDelete({ id }).exec((err, warning) => {
      if (err) {
        res.status(400).json({
          err,
        });
      } else if (warning) {
        res.status(200).json({
          warning,
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
