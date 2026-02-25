import { Router } from "express";
import {
  getDashboardData,
  getFilterOptions,
  getSummaryMetrics,
} from "../controllers/data.controller.js";

const router = Router();

router.route("/").get(getDashboardData);
router.route("/filters").get(getFilterOptions);
router.route("/metrics").get(getSummaryMetrics);

export default router;