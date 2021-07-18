import { Schema, Document, model } from "mongoose";
import { genSaltSync, hashSync, compareSync } from "bcrypt";

export interface IAcount {
  username: string;
  password: string;
  email: string;
  avatarURL: string;
  displayName: string;
  validatePassword: (password: string) => boolean;
}

export type AcountDocumentType = IAcount & Document;

const AcountSchema = new Schema<AcountDocumentType>({
  username: String,
  password: String,
  email: String,
  avatarURL: String,
  displayName: String,
});

AcountSchema.method("validatePassword", function (password: string) {
  return compareSync(password, this.password);
});

AcountSchema.pre("save", function (done) {
  const acount = this;
  if (acount.isModified(acount.password)) {
    acount.password = hashSync(acount.password, genSaltSync(10));
  }

  if (!acount.displayName) {
    acount.displayName = acount.username;
  }

  done();
});

export const Model = model<AcountDocumentType>("Acount", AcountSchema);
