const { httpError, ctrlWrapper } = require("../../helpers");
const {
  UserModel: { User },
} = require("../../models");
const { createHashPassword } = require("../../units");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, "Email in use");
  }
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({
    ...req.body,
    password: await createHashPassword(password),
    avatarURL,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
