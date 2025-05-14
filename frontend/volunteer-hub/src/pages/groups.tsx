// src/pages/groups.tsx
import { useState } from 'react';
import useGroups from '../hooks/useGroups';
import GroupForm from './components/groupForm';
import GroupCard from './components/groupCard';

export default function Groups() {
  const {
    groups,
    createGroup,
    updateGroup,
    deleteGroup,
  } = useGroups(); //check notes

  const [formData, setFormData] = useState({ name: '', description: '' }); //check notes
  const [editingGroupId, setEditingGroupId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingGroupId !== null) {
        await updateGroup(editingGroupId, formData);
      } else {
        await createGroup(formData);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving group:', error);
    }
  };

  const handleEdit = (group: { id: number; name: string; description: string }) => {
    setFormData({ name: group.name, description: group.description });
    setEditingGroupId(group.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ name: '', description: '' });
    setEditingGroupId(null);
    setShowForm(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Groups</h1>
      <button
        onClick={() => {
          setShowForm(!showForm);
          resetForm();
        }}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {showForm ? 'Cancel' : 'Add Group'}
      </button>

      {showForm && (
        <GroupForm
          formData={formData}
          isEditing={editingGroupId !== null}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      )}

      <ul className="space-y-2">
        {groups.map(group => (
          <GroupCard
            key={group.id}
            group={group}
            onEdit={() => handleEdit(group)}
            onDelete={() => deleteGroup(group.id)}
          />
        ))}
      </ul>
    </div>
  );
}
