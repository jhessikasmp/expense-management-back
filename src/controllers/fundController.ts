import { Request, Response } from "express";
import Fund from "../models/Fund";

export async function createFund(req: Request, res: Response) {
  try {
    const fund = await Fund.create(req.body);
    res.status(201).json(fund);
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Erro ao criar entrada do fundo" });
  }
}

export async function listFunds(req: Request, res: Response) {
  try {
    const { userId, category } = req.query;
    const filter: any = {};
    if (userId) filter.userId = userId;
    if (category) filter.category = category;
    
    const funds = await Fund.find(filter).sort({ createdAt: -1 });
    res.json(funds);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar fundos" });
  }
}

export async function deleteFund(req: Request, res: Response) {
  try {
    const fund = await Fund.findByIdAndDelete(req.params.id);
    if (!fund) {
      return res.status(404).json({ error: "Entrada não encontrada" });
    }
    res.json({ message: "Entrada excluída com sucesso" });
  } catch (err) {
    res.status(400).json({ error: "Erro ao excluir entrada" });
  }
}