exports.calculateScore = (score, severity) => {
  let deductScore = 0;
  if (severity === "low") deductScore = 5;
  else if (severity === "medium") deductScore = 10;
  else deductScore = 15;
  if (score < deductScore) return 0;
  else return score - deductScore;
};
exports.calculateWarning = (score) => {
  if (score >= 80) {
    return "low";
  } else if (score >= 50) {
    return "medium";
  } else return "high";
};
