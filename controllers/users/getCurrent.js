const { httpError, ctrlWrapper } = require("../../helpers");

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  if (!req.user) {
    throw httpError(401, "Not authorized");
  }
  res.status(200).json({ email, subscription });
};

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
};
