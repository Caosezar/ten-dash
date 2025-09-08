import { Task } from "../domain/entities/task";
import { InMemoryBaseRepository } from "./base-in-memory-repository";

export class TaskInMemoryRepository extends InMemoryBaseRepository<Task> {

}