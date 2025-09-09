import Image from "next/image";
import { TaskDialog } from "./features/components/task-dialog";
import { TaskTable } from "./features/components/task-table";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <TaskDialog />
      <TaskTable />
    </div>
  );
}
