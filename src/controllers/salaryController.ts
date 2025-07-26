import { Request, Response } from "express";
import Salary from "../models/Salary";

// Adicionar salário mensal
export async function addSalary(req: Request, res: Response) {
  try {
    const { userId, amount, month, year } = req.body;
    
    // Verificar se já existe salário para este mês/ano
    const existingSalary = await Salary.findOne({ userId, month, year });
    
    if (existingSalary) {
      // Atualizar salário existente
      existingSalary.amount = amount;
      await existingSalary.save();
      res.json(existingSalary);
    } else {
      // Criar novo registro de salário
      const salary = await Salary.create({ userId, amount, month, year, currency: "EUR" });
      res.status(201).json(salary);
    }
  } catch (err) {
    res.status(400).json({ error: "Erro ao adicionar salário", details: err });
  }
}

// Listar salários anuais
export async function getAnnualSalaries(req: Request, res: Response) {
  try {
    const { year } = req.params;
    const salaries = await Salary.find({ year: parseInt(year) }).sort({ month: 1 });
    res.json(salaries);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar salários" });
  }
}