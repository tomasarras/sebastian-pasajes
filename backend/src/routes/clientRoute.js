import express from "express";
import controller from "../controllers/clientController.js";
import verifyToken from "../middleware/validateToken.js";
import { validateClient } from "../middleware/validators/clientValidator.js"
import onlyAgencyAndAdministrators from "../middleware/onlyAgencyAndAdministrators.js";
const router = express.Router();

router.get("/", verifyToken, onlyAgencyAndAdministrators(), controller.getAll);
router.get("/to-excel", verifyToken, onlyAgencyAndAdministrators(), controller.toExcel);
router.post("/", validateClient, verifyToken, onlyAgencyAndAdministrators(), controller.create);
router.put("/:id", validateClient, verifyToken, onlyAgencyAndAdministrators(), controller.update);
router.get("/:id", verifyToken, onlyAgencyAndAdministrators(), controller.getById);
router.delete("/:id", verifyToken, onlyAgencyAndAdministrators(), controller.deleteById);

export default router;
