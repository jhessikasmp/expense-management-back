import { Schema, model, Document } from "mongoose";

export interface FundDocument extends Document {
  userId: string;
  name: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: 'travel' | 'emergency' | 'car' | 'allowance' | 'investment';
  currency: string;
  createdAt: Date;
}

const FundSchema = new Schema<FundDocument>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  category: { type: String, enum: ['travel', 'emergency', 'car', 'allowance', 'investment'], required: true },
  currency: { type: String, default: "EUR" },
  createdAt: { type: Date, default: Date.now },
});

export default model<FundDocument>("Fund", FundSchema);