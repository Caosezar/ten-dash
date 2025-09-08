import { BaseEntity } from "src/utils/base-entity";
import { TaskStatus } from "../enum";

export class Task extends BaseEntity {
    title: string;
    description: string;
    status: TaskStatus;
};
