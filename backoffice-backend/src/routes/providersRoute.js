import express from "express";
import controller from "../controllers/providerController.js";
const router = express.Router();

router.get("/", controller.getAll);

export default router;
