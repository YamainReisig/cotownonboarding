import React from 'react';

interface Props {
  title: string;
  description: string;
  dueDate: string;
}

export default function TaskHeader({ title, description, dueDate }: Props) {
  return (
    <>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm">{description}</p>
      <p className="text-xs text-gray-500">Due: {dueDate}</p>
    </>
  );
}
