import { Router } from "express";
import healthcheckRouter from "./healthcheckRoute.js";
import userRouter from "./userRoute.js";
import newsRouter from "./newRoute.js";
import clientsRouter from "./clientsRoute.js";
import paymentOrdersRouter from "./paymentOrdersRoute.js";
import providersRouter from "./providersRoute.js";
import ticketsRouter from "./ticketsRoute.js";
import staffRouter from "./staffRoute.js";
import ncRouter from "./iso/ncRoute.js";
import audRouter from "./iso/audRoute.js";
import courseRouter from "./iso/courseRoute.js";
import evaluationsRouter from "./iso/evaluationsRoute.js";
import indicatorsRouter from "./iso/indicatorRoute.js";
import minutasRouter from "./iso/minutasRoute.js";
import claimsRouter from "./iso/claimsRoute.js";
import rgRouter from "./iso/rgRoute.js";
import trRouter from "./iso/trRoute.js";
import criteriasRouter from "./iso/criteriasRoute.js";
import formadoresRouter from "./iso/formadoresRoute.js";
import docsRouter from "./iso/docsRoute.js";
import procesosRouter from "./iso/procesosRoute.js";
import encuestasRouter from "./iso/encuestasRoute.js";
import licencesRouter from "./licencesRoute.js";
import parametersRouter from "./parametersRoute.js";
import activitiesRouter from "./activityRoute.js";
import localitiesRouter from "./localityRoute.js";
import sectorsRouter from "./sectorRoute.js";
import provincesRouter from "./provinceRoute.js";

const router = Router();

router.use("/healthcheck", healthcheckRouter);
router.use("/users", userRouter);
router.use("/clients", clientsRouter);
router.use("/news", newsRouter);
router.use("/payment-orders", paymentOrdersRouter);
router.use("/providers", providersRouter);
router.use("/tickets", ticketsRouter);
router.use("/staff", staffRouter);
router.use("/iso/nc", ncRouter);
router.use("/iso/aud", audRouter);
router.use("/iso/courses", courseRouter);
router.use("/iso/evaluations", evaluationsRouter);
router.use("/iso/indicators", indicatorsRouter);
router.use("/iso/minutas", minutasRouter);
router.use("/iso/claims", claimsRouter);
router.use("/iso/rg", rgRouter);
router.use("/iso/times-responses", trRouter);
router.use("/iso/criterias", criteriasRouter);
router.use("/iso/formadores", formadoresRouter);
router.use("/iso/docs", docsRouter);
router.use("/iso/procesos", procesosRouter);
router.use("/iso/encuestas", encuestasRouter);
router.use("/licences", licencesRouter);
router.use("/parameters", parametersRouter);
router.use("/activities", activitiesRouter);
router.use("/localities", localitiesRouter);
router.use("/sectors", sectorsRouter);
router.use("/provinces", provincesRouter);

export default router