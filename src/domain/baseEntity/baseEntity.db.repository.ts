import { BaseEntity } from "./baseEntity";

export default interface IBaseEntityDbRepository {
  create(data: BaseEntity): Promise<BaseEntity>;
  update(id: string, data: Partial<BaseEntity>): Promise<BaseEntity | null>;
  delete(id: string): Promise<BaseEntity>;
  getById(id: string): Promise<BaseEntity | null>;
  getAll(): Promise<BaseEntity[]>;
}
