import express from "express";
import { createUser, listUsers, updateUser } from "../controllers/userController";

const router = express.Router();

router.post("/", createUser);
router.get("/", listUsers);
router.put("/:id", updateUser);

export default router;
