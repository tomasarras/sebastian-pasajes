import express from "express";
import controller from "../controllers/newsController.js";
//import verifyToken from "../middleware/validateToken.js";

const router = express.Router();

router.get("/", controller.getAll);
router.put("/:id", controller.update);

export default router;