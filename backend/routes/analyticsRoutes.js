import express from "express";
import { createCityLog } from "../controllers/analyticsControllers.js";
import { validateBody } from "../middlewares/validateBody.js";
import { citySchema } from "../validations/validateCity.js";

const router = express.Router();

router.post("/log", validateBody(citySchema), createCityLog);

export default router;
