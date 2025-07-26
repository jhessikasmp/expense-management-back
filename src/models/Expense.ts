import { Schema, model, Document } from "mongoose";

export interface ExpenseDocument extends Document {
  userId: string;
  name: string;
  description?: string;
  amount: number;
  category: string;
  currency: string;
  createdAt: Date;
}

const ExpenseSchema = new Schema<ExpenseDocument>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  currency: { type: String, default: "EUR" },
  createdAt: { type: Date, default: Date.now },
});

export default model<ExpenseDocument>("Expense", ExpenseSchema);
