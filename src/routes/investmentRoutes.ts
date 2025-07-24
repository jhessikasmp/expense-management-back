import express from "express";
import {
  createInvestment,
  listInvestments,
  updateInvestment,
  deleteInvestment
} from "../controllers/investmentController";

const router = express.Router();

router.post("/", createInvestment);
router.get("/", listInvestments);
router.put("/:id", updateInvestment);
router.delete("/:id", deleteInvestment);

export default router;
