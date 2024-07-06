import { StatusCodes } from "http-status-codes";
import { AGENCY_CLIENT_ID } from "../utils/constants.js";

const onlyAgency = (req, res, next) => {
  try {
    if (req.user.client.id == AGENCY_CLIENT_ID) {
      next()
    } else {
      throw { statusCode: StatusCodes.UNAUTHORIZED, message: "Only agency" };
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({error: "Only agency"});
  }
};

export default onlyAgency;