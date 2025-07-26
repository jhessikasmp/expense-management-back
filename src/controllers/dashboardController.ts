import { Request, Response } from 'express';
import User from '../models/User';
import Expense from '../models/Expense';
import Investment from '../models/Investment';
import TravelFund from '../models/TravelFund';
import { getAssetPrice, getCryptoPrice } from '../services/alphaVantageService';

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

      const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
      
      monthlyData.push({
        month,
        expenses: totalExpenses,
        count: expenses.length
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
    const pricesPromises = investments.map(async (investment) => {
      try {
        const currentPrice = investment.asset.includes('BTC') || investment.asset.includes('ETH') 
          ? await getCryptoPrice(investment.asset)
          : await getAssetPrice(investment.asset);
        
        const totalValue = investment.quantity * currentPrice;
        const profit = totalValue - (investment.quantity * investment.unitPrice);
        
        return {
          ...investment.toObject(),
          currentPrice,
          totalValue,
          profit
        };
      } catch (error) {
        return {
          ...investment.toObject(),
          currentPrice: investment.unitPrice,
          totalValue: investment.quantity * investment.unitPrice,
          profit: 0,
          error: 'Limite de API atingido'
        };
      }
    });

    const investmentsWithPrices = await Promise.all(pricesPromises);
    res.json(investmentsWithPrices);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar preços dos investimentos' });
  }
};