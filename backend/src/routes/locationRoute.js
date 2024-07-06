import express from "express";
import controller from "../controllers/locationController.js";
import verifyToken from "../middleware/validateToken.js";
import onlyAgency from "../middleware/onlyAgency.js";
import { check } from "express-validator";

const router = express.Router();

router.get("/:id", verifyToken, onlyAgency, controller.getById);
router.get("/", verifyToken, onlyAgency, controller.getAll);
router.post("/", check("name").notEmpty(), verifyToken, onlyAgency, controller.create);
router.put("/:id", verifyToken, onlyAgency, controller.update);
router.delete("/:id", verifyToken, onlyAgency, controller.deleteById);

export default router;
