// src/hooks/useGroups.ts
import { useEffect, useState } from 'react';
import axios from 'axios';

export interface Group {
  id: number;
  name: string;
  description: string;
}

export default function useGroups() {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/groups/')
      .then(res => setGroups(res.data))
      .catch(err => console.error('Error fetching groups:', err));
  }, []);

  const createGroup = async (group: Omit<Group, 'id'>) => {
    const res = await axios.post('http://localhost:8000/api/groups/', group);
    setGroups(prev => [...prev, res.data]);
  };

  const updateGroup = async (id: number, group: Omit<Group, 'id'>) => {
    const res = await axios.put(`http://localhost:8000/api/groups/${id}/`, group);
    setGroups(prev => prev.map(g => g.id === id ? res.data : g));
  };

  const deleteGroup = async (id: number) => {
    await axios.delete(`http://localhost:8000/api/groups/${id}/`);
    setGroups(prev => prev.filter(g => g.id !== id));
  };

  return {
    groups,
    createGroup,
    updateGroup,
    deleteGroup,
    setGroups,
  };
}
