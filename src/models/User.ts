import { Schema, model, Document } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  currency: string;
  createdAt: Date;
}

const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  currency: { type: String, default: "EUR" },
  createdAt: { type: Date, default: Date.now },
});

export default model<UserDocument>("User", UserSchema);

