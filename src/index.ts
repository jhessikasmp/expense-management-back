import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import travelFundRoutes from "./routes/travelFundRoutes";
import investmentRoutes from "./routes/investmentRoutes";
import userRoutes from "./routes/userRoutes";
import expenseRoutes from "./routes/expenseRoutes";
import salaryRoutes from "./routes/salaryRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import { errorHandler, notFoundHandler } from './middlewares/errorMiddleware';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/travel-funds", travelFundRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/salaries", salaryRoutes);
app.use("/api/dashboard", dashboardRoutes);


app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI as string;

// Improved MongoDB connection with retry logic
const connectWithRetry = () => {
  console.log('Tentando conectar ao MongoDB...');
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("MongoDB conectado com sucesso.");
      app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
    })
    .catch((err) => {
      console.error("Erro ao conectar ao MongoDB:", err);
      console.log("Tentando reconectar em 5 segundos...");
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();
