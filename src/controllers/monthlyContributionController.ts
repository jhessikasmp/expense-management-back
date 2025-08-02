import { Request, Response } from "express";
import MonthlyContribution from "../models/MonthlyContribution";
import Fund from "../models/Fund";

export async function createMonthlyContribution(req: Request, res: Response) {
  try {
    // Verificar se o fundo existe
    const fund = await Fund.findById(req.body.fundId);
    if (!fund) {
      return res.status(404).json({ error: "Fundo não encontrado" });
    }

    const contribution = await MonthlyContribution.create(req.body);
    res.status(201).json(contribution);
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Erro ao criar contribuição mensal" });
  }
}

export async function listMonthlyContributions(req: Request, res: Response) {
  try {
    const { userId, fundId } = req.query;
    const filter: any = {};
    if (userId) filter.userId = userId;
    if (fundId) filter.fundId = fundId;
    
    const contributions = await MonthlyContribution.find(filter).sort({ createdAt: -1 });
    res.json(contributions);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar contribuições mensais" });
  }
}

export async function updateMonthlyContribution(req: Request, res: Response) {
  try {
    const contribution = await MonthlyContribution.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!contribution) {
      return res.status(404).json({ error: "Contribuição não encontrada" });
    }
    
    res.json(contribution);
  } catch (err) {
    res.status(400).json({ error: "Erro ao atualizar contribuição" });
  }
}

export async function deleteMonthlyContribution(req: Request, res: Response) {
  try {
    const contribution = await MonthlyContribution.findByIdAndDelete(req.params.id);
    if (!contribution) {
      return res.status(404).json({ error: "Contribuição não encontrada" });
    }
    res.json({ message: "Contribuição excluída com sucesso" });
  } catch (err) {
    res.status(400).json({ error: "Erro ao excluir contribuição" });
  }
}

export async function getActiveContributions(req: Request, res: Response) {
  try {
    const contributions = await MonthlyContribution.find({
      isActive: true,
      ...(req.query.userId && { userId: req.query.userId })
    });
    res.json(contributions);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar contribuições ativas" });
  }
}
