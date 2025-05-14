import React from 'react';

interface Props {
  formData: { name: string; email: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export default function VolunteerForm({ formData, onChange, onSubmit }: Props) {
  return (
    <div className="flex gap-2 mt-2">
      <input name="name" placeholder="Name" value={formData.name} onChange={onChange} className="p-1 border rounded" />
      <input name="email" placeholder="Email" value={formData.email} onChange={onChange} className="p-1 border rounded" />
      <button onClick={onSubmit} className="bg-blue-500 text-white px-2 py-1 rounded">Add</button>
    </div>
  );
}
