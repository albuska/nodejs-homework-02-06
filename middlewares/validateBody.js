const { httpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0 && req.method === "PUT") {
      throw httpError(400, "missing fields");
    }

    const { error } = schema.validate(req.body);
    if (error) {
      next(httpError(400, `${error.details[0].message}`));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
