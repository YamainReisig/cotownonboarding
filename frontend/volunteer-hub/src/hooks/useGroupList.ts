import { useEffect, useState } from 'react';
import axios from 'axios';

export interface Group {
  id: number;
  name: string;
  description: string;
}

export default function useGroup(groupId: number) {
  const [group, setGroup] = useState<Group | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/groups/${groupId}/`)
      .then(res => setGroup(res.data))
      .catch(err => console.error('Failed to fetch group:', err));
  }, [groupId]);

  return group;
}
