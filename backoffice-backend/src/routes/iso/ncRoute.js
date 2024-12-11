import express from "express";
import controller from "../../controllers/iso/ncController.js";
import verifyToken from "../../middleware/validateToken.js";
import onlyAdministrators from "../../middleware/onlyAdministrators.js";

const router = express.Router();

router.get("/", verifyToken, onlyAdministrators, controller.getAll);
router.get("/origins", verifyToken, onlyAdministrators, controller.getAllOrigins);
router.get("/:id", controller.getById);
router.put("/notify-participants", controller.notifyParticipants);

export default router;
