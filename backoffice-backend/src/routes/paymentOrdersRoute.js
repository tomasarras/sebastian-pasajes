import express from "express";
import controller from "../controllers/paymentOrderController.js";
import verifyToken from "../middleware/validateToken.js";
import withPermissions from "../middleware/withPermissions.js";
import { USER_PROFILES } from "../utils/constants.js";
import { upload } from "../middleware/uploadFile.js";

const router = express.Router();

router.get("/", verifyToken, withPermissions([USER_PROFILES.WEBMASTER, USER_PROFILES.ADMIN, USER_PROFILES.VENDEDOR]), controller.getAll);
router.post("/", verifyToken, withPermissions([USER_PROFILES.WEBMASTER, USER_PROFILES.ADMIN, USER_PROFILES.VENDEDOR]), controller.create);
router.post("/:id/file", verifyToken, withPermissions([USER_PROFILES.WEBMASTER, USER_PROFILES.ADMIN]), upload.single('file'), controller.uploadFile);
router.get("/file/:id", verifyToken, withPermissions([USER_PROFILES.WEBMASTER, USER_PROFILES.ADMIN, USER_PROFILES.VENDEDOR]), controller.downloadFile);
router.delete("/file/:id", verifyToken, withPermissions([USER_PROFILES.WEBMASTER, USER_PROFILES.ADMIN]), controller.deleteFile);
router.post("/:id/notify", verifyToken, withPermissions([USER_PROFILES.WEBMASTER, USER_PROFILES.ADMIN]), controller.notify);
router.put("/:id", verifyToken, withPermissions([USER_PROFILES.WEBMASTER, USER_PROFILES.ADMIN, USER_PROFILES.VENDEDOR]), controller.update);
router.delete("/:id", verifyToken, withPermissions([USER_PROFILES.WEBMASTER, USER_PROFILES.ADMIN]), controller.deleteById);

export default router;
