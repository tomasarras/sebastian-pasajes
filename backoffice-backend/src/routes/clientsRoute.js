import express from "express";
import controller from "../controllers/clientController.js";
//import verifyToken from "../middleware/validateToken.js";

const router = express.Router();

//TODO: solo accede si no es perfil 1 ni 2, es decir 3 en adelante
router.get("/", controller.getAll);

export default router;
