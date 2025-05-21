import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, campaignId, onDelete, onStatusChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onDelete={() => onDelete(task._id)}
          onStatusChange={onStatusChange}
          onEdit={() => (window.location.href = `/campaigns/${campaignId}/tasks/${task._id}/edit`)}
        />
      ))}
    </div>
  );
};

export default TaskList;
