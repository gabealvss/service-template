import { BaseEntity } from "@domain/baseEntity/baseEntity";
import IBaseEntityDbRepository from "@domain/baseEntity/baseEntity.db.repository";

export default class baseEntityDbRepository implements IBaseEntityDbRepository {
  create(data: BaseEntity): Promise<BaseEntity> {
    throw new Error("Method not implemented.");
  }
  update(id: string, data: Partial<BaseEntity>): Promise<BaseEntity | null> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<BaseEntity> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<BaseEntity | null> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<BaseEntity[]> {
    throw new Error("Method not implemented.");
  }
}
