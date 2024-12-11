import express from "express";
import controller from "../controllers/excelController.js";
//import verifyToken from "../middleware/validateToken.js";

const router = express.Router();

router.get("/staff", controller.getStaffLicences);
router.get("/request-vacations", controller.requestVacations);
router.get("/iso/nc", controller.isoNc);

export default router;
