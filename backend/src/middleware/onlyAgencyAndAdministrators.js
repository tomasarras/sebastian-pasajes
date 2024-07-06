import { ROLES } from "../utils/constants.js";
import withPermissions from "./withPermissions.js";
import onlyAgency from "./onlyAgency.js";

const onlyAgencyAndAdministrators = () => [
  withPermissions(ROLES.ADMIN),
  onlyAgency
]

export default onlyAgencyAndAdministrators;