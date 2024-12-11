import express from "express";
import controller from "../../controllers/iso/minutasController.js";
import onlyAdministrators from "../../middleware/onlyAdministrators.js";
import verifyToken from "../../middleware/validateToken.js";

const router = express.Router();

router.get("/", verifyToken, onlyAdministrators, controller.getAll);

export default router;
