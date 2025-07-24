import { Request, Response } from "express";
import TravelFund from "../models/TravelFund";

export async function createTravelFund(req: Request, res: Response) {
  try {
    const fund = await TravelFund.create(req.body);
    res.status(201).json(fund);
  } catch (err) {
    res.status(400).json({ error: "Erro ao criar fundo", details: err });
  }
}

export async function listTravelFunds(req: Request, res: Response) {
  try {
    const funds = await TravelFund.find().sort({ createdAt: -1 });
    res.json(funds);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar fundos" });
  }
}

export async function updateTravelFund(req: Request, res: Response) {
  try {
    const fund = await TravelFund.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!fund) return res.status(404).json({ error: "Fundo não encontrado" });
    // Recalcula total
    fund.total = fund.participants.reduce((sum, p) => sum + p.contribution, 0);
    await fund.save();
    res.json(fund);
  } catch (err) {
    console.error("Erro ao atualizar fundo:", err);
    res.status(400).json({ error: "Erro ao atualizar fundo" });
  }
}

export async function deleteTravelFund(req: Request, res: Response) {
  try {
    const fund = await TravelFund.findByIdAndDelete(req.params.id);
    if (!fund) return res.status(404).json({ error: "Fundo não encontrado" });
    res.json({ message: "Fundo removido" });
  } catch (err) {
    console.error("Erro ao deletar fundo:", err);
    res.status(400).json({ error: "Erro ao deletar fundo" });
  }
}
