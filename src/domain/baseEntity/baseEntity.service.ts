import { BaseEntity } from "./baseEntity";
import IBaseEntityDbRepository from "./baseEntity.db.repository";

export default interface IBaseEntityService {
  create(data: BaseEntity): Promise<BaseEntity>;
  update(id: string, data: Partial<BaseEntity>): Promise<BaseEntity | null>;
  delete(id: string): Promise<BaseEntity>;
  getById(id: string): Promise<BaseEntity | null>;
  getAll(): Promise<BaseEntity[]>;
}

class BaseEntityService implements IBaseEntityService {
  private baseEntityDbRepository: IBaseEntityDbRepository;

  constructor(baseEntityDbRepository: IBaseEntityDbRepository) {
    this.baseEntityDbRepository = baseEntityDbRepository;
  }

  create(data: BaseEntity): Promise<BaseEntity> {
    return this.baseEntityDbRepository.create(data);
  }

  update(id: string, data: Partial<BaseEntity>): Promise<BaseEntity | null> {
    return this.baseEntityDbRepository.update(id, data);
  }

  delete(id: string): Promise<BaseEntity> {
    return this.baseEntityDbRepository.delete(id);
  }

  getById(id: string): Promise<BaseEntity | null> {
    return this.baseEntityDbRepository.getById(id);
  }

  getAll(): Promise<BaseEntity[]> {
    return this.baseEntityDbRepository.getAll();
  }
}

export function NewBaseEntityService(baseEntityDbRepository: IBaseEntityDbRepository): BaseEntityService {
  return new BaseEntityService(baseEntityDbRepository);
}
