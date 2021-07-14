import { Model, Types } from "mongoose";

export abstract class ModelService<T> {
  protected model: Model<T>;

  protected async create<D>(data: D): Promise<Types.ObjectId> {
    const { _id } = await this.model.create(data);
    return _id;
  }

  protected async updateById<U>(updates: U, id: string): Promise<void> {
    await this.model.findByIdAndUpdate(id, updates);
  }

  protected async removeById(id: string) {
    await this.model.findByIdAndRemove(id);
  }
}
