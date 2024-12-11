import express from "express";
import controller from "../../controllers/iso/coursesController.js";
import onlyAdministrators from "../../middleware/onlyAdministrators.js";
import verifyToken from "../../middleware/validateToken.js";

const router = express.Router();

router.get("/", verifyToken, onlyAdministrators, controller.getAll);
router.get("/programacion", verifyToken, onlyAdministrators, controller.getAllCursosProgramacion);
router.delete("/programacion/:id", verifyToken, onlyAdministrators, controller.deleteCursoProgramacion);
router.get("/temas", verifyToken, onlyAdministrators, controller.getAllCursoTemas);

export default router;
