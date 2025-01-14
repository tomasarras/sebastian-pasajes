import { check, validationResult } from "express-validator";
import { PASSENGER_TYPES } from "../../utils/constants.js";
export const validateOrder = [
  check('passenger.firstName').notEmpty(),
  check('passenger.lastName').notEmpty(),
  check('passenger.documentType').notEmpty(),
  check('passenger.document').notEmpty(),
  check('passenger.nationality').notEmpty(),
  check('passenger.phones').notEmpty(),
  check('passenger.phones').notEmpty(),
  
  check('fatherNumber').default(0).isInt(),
  check('observations').default("").isString(),
  check('passengerType').notEmpty()
    .isIn([PASSENGER_TYPES.HOLDER, PASSENGER_TYPES.COMPANION]),
  check('transportType').notEmpty(),
  check('departureFrom').notEmpty(),
  check('departureTo').notEmpty(),
  check('departureDate').notEmpty(),
  check('departureDateHour').notEmpty(),
  check('returnFrom').default("").isString(),
  check('returnTo').default("").isString(),
  check('returnDateHour').default("").isString(),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({errors: errors.array()});
    next();
  },
];
