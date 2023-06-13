const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

// const phoneRegExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
// const emailRegExp = /\\S+@\\S+/;

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, "Set name for contact"] },
    email: {
      type: String,
      required: true,
      // match: emailRegExp,
    },
    phone: {
      type: String,
      required: true,
      // match: phoneRegExp,
    },
    favorite: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string()
    .messages({
      "any.required": `missing required name field`,
    })
    .required(),
  email: Joi.string()
    .messages({
      "any.required": `missing required email field`,
    })
    .required(),
    // .pattern(emailRegExp),
  phone: Joi.string()
    .messages({
      "any.required": `missing required phone field`,
    })
    // .pattern(phoneRegExp)
    .required(),
  favorite: Joi.boolean()
    .messages({
      "any.required": `missing required favorite field`,
    })
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing required favorite field`,
  }),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};