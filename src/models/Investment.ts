import { Schema, model, Document } from "mongoose";

export interface InvestmentDocument extends Document {
  userId: string;
  asset: string;
  quantity: number;
  unitPrice: number;
  currency: string;
  description?: string;
  createdAt: Date;
}

const InvestmentSchema = new Schema<InvestmentDocument>({
  userId: { type: String, required: true },
  asset: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  currency: { type: String, default: "EUR" },
  description: { type: String, required: false },
  createdAt: { type: Date, default: Date.now }
});

export default model<InvestmentDocument>("Investment", InvestmentSchema);
