import express from "express";
import controller from "../controllers/clientController.js";
import verifyToken from "../middleware/validateToken.js";
import onlyAdministrators from "../middleware/onlyAdministrators.js";

const router = express.Router();

router.get("/", verifyToken, onlyAdministrators, controller.getAll);
router.post("/", verifyToken, onlyAdministrators, controller.create);
router.put("/:id", verifyToken, onlyAdministrators, controller.update);
router.delete("/:id", verifyToken, onlyAdministrators, controller.deleteById);

export default router;
