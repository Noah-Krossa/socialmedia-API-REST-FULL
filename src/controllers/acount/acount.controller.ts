import { Controller, IEndpoint } from "@/utils";
import { AcountEndpoints } from "./endpoints";

export class AcountController extends Controller {
  constructor() {
    super();
    this.indexEndpoints(AcountEndpoints);
  }

  public indexEndpoints(endpoints: IEndpoint[]) {
    super.indexEndpoints(endpoints);
  }
}
