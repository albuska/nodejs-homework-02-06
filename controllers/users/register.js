const { httpError, ctrlWrapper, sendEmail} = require("../../helpers");
const {
  UserModel: { User },
} = require("../../models");
const { createHashPassword } = require("../../units");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { BASE_URL } = process.env; 

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, "Email in use");
  }
  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid();
  
  const newUser = await User.create({
    ...req.body,
    password: await createHashPassword(password),
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail); 

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
