import { encode, decode } from "jwt-simple";
import moment from "moment";

type PayloadType = {
  exp: number;
  iat: number;
  sub: string;
};

export class JWTService {
  createToken<T extends { sub: string }>(data: T): string {
    const payload = {
      iat: moment().unix(),
      exp: moment().add(15, "day").unix(),
      ...data,
    };
    if (process.env.SECRET_TOKEN) {
      return encode(payload, process.env.SECRET_TOKEN);
    }
    throw new Error("Create token failed: SECRET_TOKEN is not defined");
  }

  decodeToken<T>(token: string): PayloadType & T {
    if (process.env.SECRET_TOKEN) {
      return decode(token, process.env.SECRET_TOKEN);
    }
    throw new Error("Decode token failed: SECRET_TOKEN is not defined");
  }
}
