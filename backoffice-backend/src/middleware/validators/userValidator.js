import { check, validationResult } from "express-validator";

export const userValidator = () => [
  check("usuario").notEmpty(),
  check("idPersonal").notEmpty(),
  check("password").notEmpty(),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({errors: errors.array()});
    next();
  },
];
