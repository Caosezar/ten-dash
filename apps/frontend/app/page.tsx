import { CreateTaskDialog } from "./features/task/components/create-task/create-task-dialog";
import { TaskTable } from "./features/task/components/task-table/task-table";
import { Container } from "@/components/custom/container";

export default function Home() {
  return (
    <Container>
      <div className="">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
          <CreateTaskDialog />
        </div>
        <TaskTable />
      </div>
    </Container>
  );
}
