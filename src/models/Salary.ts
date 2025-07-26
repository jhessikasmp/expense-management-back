import { Schema, model, Document } from "mongoose";

export interface SalaryDocument extends Document {
  userId: string;
  amount: number;
  month: number;
  year: number;
  currency: string;
  createdAt: Date;
}

const SalarySchema = new Schema<SalaryDocument>({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  currency: { type: String, default: "EUR" },
  createdAt: { type: Date, default: Date.now },
});

export default model<SalaryDocument>("Salary", SalarySchema);