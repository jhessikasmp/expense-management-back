import { Request, Response } from "express";
import Expense from "../models/Expense";

// Criar nova despesa
export async function createExpense(req: Request, res: Response) {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: "Erro ao criar despesa", details: err });
  }
}

// Buscar todas as despesas (pode filtrar por usuário/categoria)
export async function listExpenses(req: Request, res: Response) {
  try {
    const filter: any = {};
    if (req.query.userId) filter.userId = req.query.userId;
    if (req.query.category) filter.category = req.query.category;
    const expenses = await Expense.find(filter).sort({ createdAt: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar despesas" });
  }
}

// Buscar uma despesa por ID
export async function getExpenseById(req: Request, res: Response) {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ error: "Despesa não encontrada" });
    res.json(expense);
  } catch (err) {
    console.error("Erro ao buscar despesa:", err);
    res.status(500).json({ error: "Erro ao buscar despesa" });
  }
}

// Atualizar despesa
export async function updateExpense(req: Request, res: Response) {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!expense) return res.status(404).json({ error: "Despesa não encontrada" });
    res.json(expense);
  } catch (err) {
    console.error("Erro ao atualizar despesa:", err);
    res.status(400).json({ error: "Erro ao atualizar despesa" });
  }
}

// Deletar despesa
export async function deleteExpense(req: Request, res: Response) {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ error: "Despesa não encontrada" });
    res.json({ message: "Despesa removida" });
  } catch (err) {
    console.error("Erro ao deletar despesa:", err);
    res.status(400).json({ error: "Erro ao deletar despesa" });
  }
}
