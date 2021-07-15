import { IEndpoint } from "@/utils";

export const AcountEndpoints: IEndpoint[] = [
  /** Register */
  {
    method: "post",
    path: "/register",
    action: async (req, res) => {
      res.json({ message: "Register endpoint works!" });
    },
  },
];
