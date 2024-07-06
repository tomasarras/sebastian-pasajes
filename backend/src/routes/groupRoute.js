import express from "express";
import controller from "../controllers/groupController.js";
import verifyToken from "../middleware/validateToken.js";
import onlyAgencyAndAdministrators from "../middleware/onlyAgencyAndAdministrators.js";
import { check } from "express-validator";
const router = express.Router();

router.get("/", verifyToken, onlyAgencyAndAdministrators(), controller.getAll);
router.post("/", verifyToken, check("name").notEmpty(), onlyAgencyAndAdministrators(), controller.create);
router.put("/:id", verifyToken, check("name").notEmpty(), onlyAgencyAndAdministrators(), controller.update);
router.get("/:id", verifyToken, onlyAgencyAndAdministrators(), controller.getById);
router.delete("/:id", verifyToken, onlyAgencyAndAdministrators(), controller.deleteById);

export default router;
