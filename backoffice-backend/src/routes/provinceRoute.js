import express from "express";
import controller from "../controllers/provincesController.js";
import onlyAdministrators from "../middleware/onlyAdministrators.js";
import verifyToken from "../middleware/validateToken.js";
const router = express.Router();

router.get("/", verifyToken, controller.getAll);
router.put("/:id", verifyToken, onlyAdministrators, controller.getAll);//TODO:
router.delete("/:id", verifyToken, onlyAdministrators, controller.getAll);//TODO:
router.post("/:id", verifyToken, onlyAdministrators, controller.getAll);//TODO:

export default router;
