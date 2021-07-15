import { ModelService } from "@/utils/modelService";
import { Acount } from "@/models";
import { Types } from "mongoose";

export class AcountService extends ModelService<Acount.AcountDocumentType> {
  protected model = Acount.Model;

  async create(data: any): Promise<Types.ObjectId> {
    const id = await super.create(data);
    return id;
  }

  async updateById(data: any, id: string): Promise<any> {
    const updatedDocument = await super.updateById(data, id);
    return updatedDocument;
  }

  async removeById(id: string): Promise<void> {
    await super.removeById(id);
  }
}
