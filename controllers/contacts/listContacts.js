const {
  ContactModel: { Contact },
} = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const listContacts = async (req, res) => {
  const { page = 1, limit = 20, search, order, sort } = req.query;
  const skip = (page - 1) * limit;
  const { _id: owner } = req.user;

  const result = await Contact.find({ owner, favorite: search  || true }, "", {
    skip,
    limit,
  }).sort(`${order === "DESC" ? "-" : ""}${sort || "name"}`);

  const total = await Contact.count({ owner, favorite: search || true });
  
  res.status(200).json({
    result,
    total,
  });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
};
