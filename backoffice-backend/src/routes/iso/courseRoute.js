import express from "express";
import controller from "../../controllers/iso/coursesController.js";
//import verifyToken from "../middleware/validateToken.js";

const router = express.Router();

router.get("/", controller.getAll);

export default router;
