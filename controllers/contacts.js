const { HttpError, ctrlWrapper } = require("../helpers");
const contacts = require("../models/contacts");
// const addSchema = require("../middlewares/validateSchema");

const listContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const { body } = req;
  // const { error } = addSchema.validate(body);
  //    if (!body || Object.keys(body).length === 0) {
  //      throw HttpError(400, "missing fields");
  //    }
  // if (error) {
  //   throw HttpError(400, `${error.details[0].message}`);
  // }
  const result = await contacts.addContact(body);
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { body, params } = req;
  // const { error } = addSchema.validate(body);
  //  if (!body || Object.keys(body).length === 0) {
  //    throw HttpError(400, "missing fields");
  //  }
  // if (error) {
  //   throw HttpError(400, `${error.details[0].message}`);
  // }
  const { id } = params;
  const result = await contacts.updateContact(id, body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
