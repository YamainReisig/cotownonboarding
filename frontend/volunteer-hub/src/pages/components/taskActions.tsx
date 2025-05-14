import React from 'react';

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

export default function TaskActions({ onEdit, onDelete }: Props) {
  return (
    <div className="space-x-2">
      <button onClick={onEdit} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
      <button onClick={onDelete} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
    </div>
  );
}
