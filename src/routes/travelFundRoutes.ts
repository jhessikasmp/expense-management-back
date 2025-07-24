import express from "express";
import {
  createTravelFund,
  listTravelFunds,
  updateTravelFund,
  deleteTravelFund
} from "../controllers/travelFundController";

const router = express.Router();

router.post("/", createTravelFund);
router.get("/", listTravelFunds);
router.put("/:id", updateTravelFund);
router.delete("/:id", deleteTravelFund);

export default router;
