import { IsNotEmpty, IsString } from "class-validator";
import { TaskStatus } from "../enum";

export class TaskDTO {
    @IsString()
    @IsNotEmpty()
    title: string;
    @IsString()
    @IsNotEmpty()
    description: string;
    status: TaskStatus;
};