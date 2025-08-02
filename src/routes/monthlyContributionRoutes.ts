import express from "express";
import {
  createMonthlyContribution,
  listMonthlyContributions,
  updateMonthlyContribution,
  deleteMonthlyContribution,
  getActiveContributions
} from "../controllers/monthlyContributionController";

const router = express.Router();

router.post("/", createMonthlyContribution);
router.get("/", listMonthlyContributions);
router.put("/:id", updateMonthlyContribution);
router.delete("/:id", deleteMonthlyContribution);
router.get("/active", getActiveContributions);

export default router;
