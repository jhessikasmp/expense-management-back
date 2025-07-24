import express from "express";
import {
  createExpense,
  listExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController";

const router = express.Router();

router.post("/", createExpense);            // Criar despesa
router.get("/", listExpenses);              // Listar despesas (com filtros)
router.get("/:id", getExpenseById);         // Buscar despesa por ID
router.put("/:id", updateExpense);          // Atualizar despesa
router.delete("/:id", deleteExpense);       // Deletar despesa

export default router;
