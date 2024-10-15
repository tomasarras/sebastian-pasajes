import { check, validationResult } from "express-validator";

export const userValidator = () => [
  check("firstName").notEmpty(),
  check("lastName").notEmpty(),
  check("documentType").notEmpty(),
  check("document").optional(),
  check("username").notEmpty(),
  check("clientId").notEmpty().isInt(),
  check("role").notEmpty(),
  check("inactive").default(false).isBoolean(),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({errors: errors.array()});
    next();
  },
];
