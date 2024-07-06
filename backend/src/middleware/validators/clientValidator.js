import { check, validationResult } from "express-validator";

export const validateClient = [
  check('businessName').notEmpty(),
  check('bookCode').optional(),
  check('cuit').optional(),
  check('address').optional(),
  check('locationId').default(1).isInt(),
  check('province').optional(),
  check('postalCode').optional(),
  check('phones').optional(),
  check('icon').optional(),
  check('nextBookCode').default(0).isInt(),
  check('action').default("SR"),
  check('immediate').default("N"),
  check('groupId').default(1).isInt(),
  check('mailAuto').default(1).isInt(),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({errors: errors.array()});
    next();
  },
];
