import { Schema, model, Document } from "mongoose";

export interface TravelFundDocument extends Document {
  name: string;
  participants: { userId: string; contribution: number }[];
  total: number;
  currency: string;
  createdAt: Date;
}

const TravelFundSchema = new Schema<TravelFundDocument>({
  name: { type: String, required: true },
  participants: [
    {
      userId: { type: String, required: true },
      contribution: { type: Number, required: true }
    }
  ],
  total: { type: Number, default: 0 },
  currency: { type: String, default: "EUR" },
  createdAt: { type: Date, default: Date.now }
});

export default model<TravelFundDocument>("TravelFund", TravelFundSchema);
