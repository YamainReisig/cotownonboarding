import React from 'react';
import VolunteerItem from './volunteerItem';

interface Volunteer {
  id: number;
  name: string;
  email: string;
}

interface Props {
  volunteers: Volunteer[];
  onDelete: (id: number) => void;
}

export default function VolunteerList({ volunteers, onDelete }: Props) {
  return (
    <ul className="mb-2 space-y-1 text-sm">
      {volunteers.map(v => (
        <VolunteerItem
          key={v.id}
          name={v.name}
          email={v.email}
          onDelete={() => onDelete(v.id)}
        />
      ))}
    </ul>
  );
}
