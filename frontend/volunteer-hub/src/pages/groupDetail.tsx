import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useGroup from '../hooks/useGroupList'; //change the naming here it can be confusing
import useTasks from '../hooks/useTasks';
import useVolunteers from '../hooks/useVolunteers';
import TaskForm from './components/taskForm';
import TaskCard from './components/taskCard';
import VolunteerList from './components/volunteerList';
import VolunteerForm from './components/volunteerForm';

export default function GroupDetailPage() {
  const { id } = useParams();
  const groupId = Number(id);

  const group = useGroup(groupId);
  const { tasks, setTasks } = useTasks(groupId);
  const { volunteers, setVolunteers } = useVolunteers();

  const [formData, setFormData] = useState({ title: '', description: '', due_date: '' });
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [expandedTask, setExpandedTask] = useState<number | null>(null);
  const [newVolunteer, setNewVolunteer] = useState({ name: '', email: '', task: 0 });

  const getVolunteersForTask = (taskId: number) =>
    volunteers.filter(v => v.task === taskId);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVolunteerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewVolunteer({ ...newVolunteer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData, group: groupId };
    try {
      const res = await fetch(
        `http://localhost:8000/api/tasks/${editingTaskId ?? ''}`,
        {
          method: editingTaskId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
      const result = await res.json();
      if (editingTaskId) {
        setTasks(tasks.map(t => (t.id === editingTaskId ? result : t)));
      } else {
        setTasks([...tasks, result]);
      }
      resetForm();
    } catch (err) {
      console.error('Error saving task:', err);
    }
  };

  const handleAddVolunteer = (taskId: number) => {
    fetch('http://localhost:8000/api/volunteers/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newVolunteer, task: taskId }),
    })
      .then(res => res.json())
      .then(data => {
        setVolunteers([...volunteers, data]);
        setNewVolunteer({ name: '', email: '', task: 0 });
      });
  };

  const handleDeleteVolunteer = (volId: number) => {
    fetch(`http://localhost:8000/api/volunteers/${volId}/`, {
      method: 'DELETE',
    }).then(() => {
      setVolunteers(volunteers.filter(v => v.id !== volId));
    });
  };

  const handleDeleteTask = (id: number) => {
    fetch(`http://localhost:8000/api/tasks/${id}/`, { method: 'DELETE' }).then(() =>
      setTasks(tasks.filter(t => t.id !== id))
    );
  };

  const handleEditTask = (task: typeof tasks[number]) => {
    setFormData({ title: task.title, description: task.description, due_date: task.due_date });
    setEditingTaskId(task.id);
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', due_date: '' });
    setEditingTaskId(null);
  };

  if (!group) return <p className="p-4">Loading group details...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{group.name}</h1>
      <p className="mb-6 text-gray-600">{group.description}</p>

      <TaskForm
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        isEditing={editingTaskId !== null}
      />

      <h2 className="text-xl font-semibold mb-4">Tasks</h2>
      <ul className="space-y-4">
        {tasks.map(task => {
          const vols = getVolunteersForTask(task.id);
          return (
            <li key={task.id}>
              <TaskCard
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onToggleVolunteers={() =>
                  setExpandedTask(expandedTask === task.id ? null : task.id)
                }
                isExpanded={expandedTask === task.id}
                volunteerCount={vols.length}
              >
                <VolunteerList volunteers={vols} onDelete={handleDeleteVolunteer} />
                <VolunteerForm
                  formData={newVolunteer}
                  onChange={handleVolunteerChange}
                  onSubmit={() => handleAddVolunteer(task.id)}
                />
              </TaskCard>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
