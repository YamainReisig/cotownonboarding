import React from 'react';

interface Props {
  name: string;
  email: string;
  onDelete: () => void;
}

export default function VolunteerItem({ name, email, onDelete }: Props) {
  return (
    <li className="flex justify-between items-center border-b pb-1">
      <span>{name} ({email})</span>
      <button onClick={onDelete} className="text-red-600 hover:underline text-xs">Delete</button>
    </li>
  );
}
