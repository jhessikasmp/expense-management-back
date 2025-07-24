import { Request, Response } from "express";
import Investment from "../models/Investment";

export async function createInvestment(req: Request, res: Response) {
  try {
    const inv = await Investment.create(req.body);
    res.status(201).json(inv);
  } catch (err) {
    res.status(400).json({ error: "Erro ao criar investimento", details: err });
  }
}

export async function listInvestments(req: Request, res: Response) {
  try {
    const invs = await Investment.find({ userId: req.query.userId }).sort({ createdAt: -1 });
    res.json(invs);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar investimentos" });
  }
}

export async function updateInvestment(req: Request, res: Response) {
  try {
    const inv = await Investment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!inv) return res.status(404).json({ error: "Investimento não encontrado" });
    res.json(inv);
  } catch (err) {
    console.error("Erro ao atualizar investimento:", err);
    res.status(400).json({ error: "Erro ao atualizar investimento" });
  }
}

export async function deleteInvestment(req: Request, res: Response) {
  try {
    const inv = await Investment.findByIdAndDelete(req.params.id);
    if (!inv) return res.status(404).json({ error: "Investimento não encontrado" });
    res.json({ message: "Investimento removido" });
  } catch (err) {
    console.error("Erro ao deletar investimento:", err);
    res.status(400).json({ error: "Erro ao deletar investimento" });
  }
}
