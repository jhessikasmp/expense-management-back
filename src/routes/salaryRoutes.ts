import express from "express";
import { addSalary, getAnnualSalaries } from "../controllers/salaryController";

const router = express.Router();

router.post("/", addSalary);
router.get("/annual/:year", getAnnualSalaries);

export default router;