import { BaseEntity } from "../../../../utils/base-entity";

export abstract class BaseRepository<T = BaseEntity> {
    abstract create(item: T): Promise<T>;
    abstract findById(id: string): Promise<T | null>;
    abstract findAll(): Promise<T[]>;
    abstract update(id: string, item: Partial<T>): Promise<T | null>;
}