import { Router } from "express";
import healthcheckRouter from "./healthcheckRoute.js";
import userRouter from "./userRoute.js";
import orderRouter from "./orderRoute.js";
import passengerRouter from "./passengerRoute.js";
import clientRouter from "./clientRoute.js";
import locationRouter from "./locationRoute.js";
import provinceRouter from "./provinceRoute.js";
import companyRouter from "./companyRoute.js";
import groupRouter from "./groupRoute.js";

const router = Router();

router.use("/healthcheck", healthcheckRouter);
router.use("/users", userRouter);
router.use("/orders", orderRouter);
router.use("/passengers", passengerRouter);
router.use("/clients", clientRouter);
router.use("/locations", locationRouter);
router.use("/provinces", provinceRouter);
router.use("/company", companyRouter);
router.use("/groups", groupRouter);

export default router