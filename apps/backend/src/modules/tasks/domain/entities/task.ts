import { BaseEntity } from "../../../../utils/base-entity";
import { TaskStatus } from "../enum";

export class Task extends BaseEntity {
    title: string;
    description: string;
    status: TaskStatus;
};
