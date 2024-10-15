import express from "express";
import controller from "../controllers/provincesController.js";
const router = express.Router();

router.get("/", controller.getAll);

export default router;
