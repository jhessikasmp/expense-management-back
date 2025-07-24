import { Schema, model, Document } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password?: string;
  salary: number;
  currency: string;
  createdAt: Date;
}

const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  salary: { type: Number, default: 0 },
  currency: { type: String, default: "EUR" },
  createdAt: { type: Date, default: Date.now },
});

export default model<UserDocument>("User", UserSchema);

