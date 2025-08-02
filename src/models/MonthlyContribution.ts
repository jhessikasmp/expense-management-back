import { Schema, model, Document } from "mongoose";

export interface MonthlyContributionDocument extends Document {
  userId: string;
  fundId: string;
  amount: number;
  dayOfMonth: number;
  isActive: boolean;
  currency: string;
  createdAt: Date;
}

const MonthlyContributionSchema = new Schema<MonthlyContributionDocument>({
  userId: { type: String, required: true },
  fundId: { type: String, required: true },
  amount: { type: Number, required: true },
  dayOfMonth: { type: Number, required: true, min: 1, max: 31 },
  isActive: { type: Boolean, default: true },
  currency: { type: String, default: "EUR" },
  createdAt: { type: Date, default: Date.now },
});

export default model<MonthlyContributionDocument>("MonthlyContribution", MonthlyContributionSchema);
