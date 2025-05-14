import { useEffect, useState } from 'react';
import axios from 'axios';

export interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
  group: number;
}

export default function useTasks(groupId: number) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/tasks/')
      .then(res => {
        const filtered = res.data.filter((task: Task) => task.group === groupId);
        setTasks(filtered);
      })
      .catch(err => console.error('Failed to fetch tasks:', err));
  }, [groupId]);

  return { tasks, setTasks };
}
