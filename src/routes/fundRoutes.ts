import express from "express";
import { createFund, listFunds, deleteFund } from "../controllers/fundController";

const router = express.Router();

router.post("/", createFund);
router.get("/", listFunds);
router.delete("/:id", deleteFund);

export default router;