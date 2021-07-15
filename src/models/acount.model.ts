import { Schema, Document, model } from "mongoose";

export interface IAcount {
  username: string;
  password: string;
  email: string;
  avatarURL: string;
  validatePassword: (password: string) => boolean;
}

export type AcountDocumentType = IAcount & Document;

const AcountSchema = new Schema<AcountDocumentType>({
  username: String,
  password: String,
  email: String,
  avatarURL: String,
});

export const Model = model<AcountDocumentType>("Acount", AcountSchema);
