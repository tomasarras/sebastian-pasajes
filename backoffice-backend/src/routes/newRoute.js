import express from "express";
import controller from "../controllers/newsController.js";
import verifyToken from "../middleware/validateToken.js";
import onlyAdministrators from "../middleware/onlyAdministrators.js";

const router = express.Router();

router.get("/", verifyToken, controller.getAll);
router.put("/:id", verifyToken, onlyAdministrators, controller.update);

export default router;
