import { BaseEntity } from "src/utils/base-entity";
import { BaseRepository } from "../domain/abstracts/base-repository";

export class InMemoryBaseRepository<T = BaseEntity> extends BaseRepository<T> {
    private items: T[] = [];

    async create(item: T): Promise<T> {
        this.items.push(item);
        return item;
    }

    async findById(id: string): Promise<T | null> {
        return this.items.find(item => (item as any).id === id) || null;
    }

    async findAll(): Promise<T[]> {
        return this.items;
    }

    async update(id: string, item: Partial<T>): Promise<T | null> {
        const index = this.items.findIndex(item => (item as any).id === id);
        if (index === -1) return null;
        this.items[index] = { ...this.items[index], ...item };
        return this.items[index];
    }
}