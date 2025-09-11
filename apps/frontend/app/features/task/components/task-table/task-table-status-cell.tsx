import React from "react"
import { TaskStatusCellProps, StatusColorsMap } from "../../types"
import { TaskStatus } from "../../types"

const STATUS_COLORS: StatusColorsMap = {
  [TaskStatus.PENDING]: "bg-yellow-100 text-yellow-800 border-yellow-200",
  [TaskStatus.COMPLETED]: "bg-green-100 text-green-800 border-green-200",
}

export const TaskStatusCell: React.FC<TaskStatusCellProps> = ({ status }) => {
  const displayStatus = status || TaskStatus.PENDING
  const colorClass = STATUS_COLORS[displayStatus]

  return (
    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
      {displayStatus}
    </div>
  )
}
