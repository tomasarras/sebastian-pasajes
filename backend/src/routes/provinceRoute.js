import express from "express";
import controller from "../controllers/provinceController.js";
import verifyToken from "../middleware/validateToken.js";
import onlyAgency from "../middleware/onlyAgency.js";
import { check } from "express-validator";

const router = express.Router();

router.get("/", verifyToken, onlyAgency, controller.getAll);
router.get("/:id", verifyToken, onlyAgency, controller.getById);
router.post("/", check("name").notEmpty(), verifyToken, onlyAgency, controller.create);
router.put("/:id", check("name").notEmpty(), verifyToken, onlyAgency, controller.update);
router.delete("/:id", verifyToken, onlyAgency, controller.deleteById);

export default router;
