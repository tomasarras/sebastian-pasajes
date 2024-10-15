import { StatusCodes } from "http-status-codes";

const withPermissions = (permissionsParam) => {
  const permissions = typeof permissionsParam === "string" ? [permissionsParam] : permissionsParam;
  return (req, res, next) => {
    try {
      const hasPermission = permissions.some(permission => req.user.role == permission);
      if (hasPermission)
        next();
      else
        throw { statusCode: StatusCodes.UNAUTHORIZED, message: "Insufficent permissions" };
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({error: "Insufficent permissions"});
    }
  };
};

export default withPermissions;