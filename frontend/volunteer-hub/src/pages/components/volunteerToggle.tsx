import React from 'react';

interface Props {
  count: number;
  onClick: () => void;
}

export default function VolunteerToggle({ count, onClick }: Props) {
  return (
    <button onClick={onClick} className="text-blue-600 mt-2 hover:underline">
      Volunteers: {count}
    </button>
  );
}
