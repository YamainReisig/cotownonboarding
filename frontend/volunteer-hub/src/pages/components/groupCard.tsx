import React from 'react';
import { Link } from 'react-router-dom';

interface Group {
  id: number;
  name: string;
  description: string;
}

interface Props {
  group: Group;
  onEdit: () => void;
  onDelete: () => void;
}

export default function GroupCard({ group, onEdit, onDelete }: Props) {
  return (
    <li className="border p-2 rounded">
      <div className="flex justify-between items-center">
        <div>
          <Link to={`/groups/${group.id}`} className="font-semibold text-blue-600 hover:underline">
            {group.name}
          </Link>
          <p className="text-sm text-gray-600">{group.description}</p>
        </div>
        <div className="space-x-2">
          <button
            onClick={onEdit}
            className="px-2 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}