import { Router } from "express";
import audController from "../../controllers/iso/audController.js";
import verifyToken from "../../middleware/validateToken.js";
import onlyAdministrators from "../../middleware/onlyAdministrators.js";

const router = Router();

router.get("/", verifyToken, onlyAdministrators, audController.getAll);
router.get("/:id", verifyToken, onlyAdministrators, audController.getAudById);
router.put("/:id", verifyToken, onlyAdministrators, audController.updateAud);
router.delete("/:id", verifyToken, onlyAdministrators, audController.deleteAud);

export default router;
