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

// Remover índice único do email que pode ter ficado do schema anterior
const UserModel = model<UserDocument>("User", UserSchema);

// Tentar remover o índice do email se existir
UserModel.collection.dropIndex('email_1').catch(() => {
  // Ignora erro se o índice não existir
});

export default UserModel;

