import express from 'express';
import { getDashboardData, getAnnualData, getInvestmentPrices } from '../controllers/dashboardController';

const router = express.Router();

router.get('/monthly', getDashboardData);
router.get('/annual', getAnnualData);
router.get('/investments-prices', getInvestmentPrices);

export default router;