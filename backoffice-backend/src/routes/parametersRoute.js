import express from "express";
import controller from "../controllers/parametersController.js";
import verifyToken from "../middleware/validateToken.js";
import onlyAdministrators from "../middleware/onlyAdministrators.js";
const router = express.Router();

router.get("/", verifyToken, onlyAdministrators, controller.getParameters);
router.put("/", verifyToken, onlyAdministrators, controller.update);

export default router;
