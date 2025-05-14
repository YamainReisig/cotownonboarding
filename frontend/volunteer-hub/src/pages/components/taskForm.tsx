import React from 'react';

interface Props {
  formData: { title: string; description: string; due_date: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isEditing: boolean;
}

export default function TaskForm({ formData, onChange, onSubmit, isEditing }: Props) {
  return (
    <form onSubmit={onSubmit} className="mb-6 p-4 border rounded space-y-4">
      <h2 className="text-lg font-semibold">{isEditing ? 'Edit Task' : 'Create Task'}</h2>
      <input name="title" value={formData.title} onChange={onChange} placeholder="Title" className="w-full p-2 border rounded" />
      <textarea name="description" value={formData.description} onChange={onChange} placeholder="Description" className="w-full p-2 border rounded" />
      <input type="date" name="due_date" value={formData.due_date} onChange={onChange} className="w-full p-2 border rounded" />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">{isEditing ? 'Update' : 'Create'}</button>
    </form>
  );
}
