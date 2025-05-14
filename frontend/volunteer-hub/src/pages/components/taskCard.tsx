import React from 'react';
import TaskHeader from './taskHeader';
import TaskActions from './taskActions';
import VolunteerToggle from './volunteerToggle';

interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
}

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggleVolunteers: () => void;
  isExpanded: boolean;
  volunteerCount: number;
  children?: React.ReactNode;
}

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggleVolunteers,
  isExpanded,
  volunteerCount,
  children,
}: Props) {
  return (
    <div className="border p-4 rounded">
      <div className="flex justify-between">
        <div>
          <TaskHeader
            title={task.title}
            description={task.description}
            dueDate={task.due_date}
          />
          <VolunteerToggle count={volunteerCount} onClick={onToggleVolunteers} />
        </div>
        <TaskActions
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task.id)}
        />
      </div>
      {isExpanded && children}
    </div>
  );
}
