import express from "express";
import controller from "../../controllers/iso/procesosController.js";
import verifyToken from "../../middleware/validateToken.js";
import onlyAdministrators from "../../middleware/onlyAdministrators.js";

const router = express.Router();

router.get("/", verifyToken, onlyAdministrators, controller.getAll);

export default router;
