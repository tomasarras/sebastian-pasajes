import express from "express";
import controller from "../../controllers/iso/ncController.js";
//import verifyToken from "../middleware/validateToken.js";

const router = express.Router();

router.get("/", controller.getAll);
router.get("/origins", controller.getAllOrigins);

export default router;
