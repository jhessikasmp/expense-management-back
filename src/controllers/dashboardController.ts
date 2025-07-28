import { Request, Response } from 'express';
import User from '../models/User';
import Expense from '../models/Expense';
import Investment from '../models/Investment';
import TravelFund from '../models/TravelFund';
import { convertToEUR } from '../utils/currencyConverter';

  
export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const users = await User.find();
    const monthlyExpenses = await Expense.find({
      createdAt: {
        $gte: new Date(currentYear, currentMonth - 1, 1),
        $lt: new Date(currentYear, currentMonth, 1)
      }
    });

    const investments = await Investment.find();
    const travelFunds = await TravelFund.find();

    // Salários agora são gerenciados via modelo Salary separado
    const totalExpenses = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalInvestments = investments.reduce((sum, inv) => sum + (inv.quantity * inv.unitPrice), 0);
    const totalTravelFunds = travelFunds.reduce((sum, fund) => sum + fund.total, 0);

    const remainingBalance = -totalExpenses - totalInvestments - totalTravelFunds;

    res.json({
      month: currentMonth,
      year: currentYear,
      // totalSalaries removido - usar endpoint /salaries
      totalExpenses,
      totalInvestments,
      totalTravelFunds,
      remainingBalance,
      users: users.length,
      expenses: monthlyExpenses.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados do dashboard' });
  }
};

export const getAnnualData = async (req: Request, res: Response) => {
  try {
    const year = 2025;
    const monthlyData = [];

    for (let month = 1; month <= 12; month++) {
      const expenses = await Expense.find({
        createdAt: {
          $gte: new Date(year, month - 1, 1),
          $lt: new Date(year, month, 1)
        }
      });

      // Filtra apenas as despesas do ano de 2025
      const expenses2025 = expenses.filter(expense => {
        const expenseDate = new Date(expense.createdAt);
        return expenseDate.getFullYear() === 2025;
      });

      const totalExpenses = expenses2025.reduce((sum, expense) => sum + expense.amount, 0);
      
      monthlyData.push({
        month,
        expenses: totalExpenses,
        count: expenses2025.length
      });
    }

    res.json({ year, data: monthlyData });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados anuais' });
  }
};

export const getInvestmentPrices = async (req: Request, res: Response) => {
  try {
    const investments = await Investment.find();
    // Retorna apenas os dados salvos, sem buscar preço atual
    const investmentsWithPrices = investments.map((investment) => {
      const totalValue = investment.quantity * investment.unitPrice;
      
      // Valor em EUR (para cálculos consistentes)
      const totalValueEUR = convertToEUR(totalValue, investment.currency);
      
      return {
        ...investment.toObject(),
        currentPrice: investment.unitPrice,
        totalValue,
        totalValueEUR,
        profit: 0,
        info: 'Preço atual não disponível (API removida)'
      };
    });
    res.json(investmentsWithPrices);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar preços dos investimentos' });
  }
};