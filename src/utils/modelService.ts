import { Model, Types } from "mongoose";

export abstract class ModelService<T> {
  protected model: Model<T>;

  public async create(data: any): Promise<Types.ObjectId> {
    const newDocument = new this.model(data);
    await newDocument.save();
    return newDocument._id;
  }

  public async updateById(updates: any, id: string): Promise<any> {
    const updatedDocument = await this.model.findByIdAndUpdate(id, updates, {
      new: true,
    });
    return updatedDocument;
  }

  public async removeById(id: string) {
    await this.model.remove({ _id: id });
  }
}
