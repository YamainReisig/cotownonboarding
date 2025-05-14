import React from 'react';

interface Props {
  formData: { name: string; description: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isEditing: boolean;
}

export default function GroupForm({ formData, onChange, onSubmit, isEditing }: Props) {
  return (
    <form onSubmit={onSubmit} className="mb-6 p-4 border rounded space-y-4">
      <h2 className="text-lg font-semibold">{isEditing ? 'Edit Group' : 'Create Group'}</h2>
      <div>
        <label className="block font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        {isEditing ? 'Update Group' : 'Create Group'}
      </button>
    </form>
  );
}
