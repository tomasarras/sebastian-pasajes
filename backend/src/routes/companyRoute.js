import express from "express";
import controller from "../controllers/companyController.js";
import verifyToken from "../middleware/validateToken.js";
import onlyAgency from "../middleware/onlyAgency.js";

const router = express.Router();

router.put("/", verifyToken, onlyAgency, controller.update);
router.get("/", verifyToken, onlyAgency, controller.get);
router.get("/welcome", controller.getWelcome);

export default router;
