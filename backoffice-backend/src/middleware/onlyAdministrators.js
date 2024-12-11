import { USER_PROFILES } from "../utils/constants.js";
import withPermissions from "./withPermissions.js";

const onlyAdministrators = withPermissions([USER_PROFILES.ADMIN, USER_PROFILES.WEBMASTER])

export default onlyAdministrators;