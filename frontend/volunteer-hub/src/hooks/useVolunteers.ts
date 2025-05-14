import { useEffect, useState } from 'react';
import axios from 'axios';

export interface Volunteer {
  id: number;
  name: string;
  email: string;
  task: number;
}

export default function useVolunteers() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/volunteers/')
      .then(res => setVolunteers(res.data))
      .catch(err => console.error('Failed to fetch volunteers:', err));
  }, []);

  return { volunteers, setVolunteers };
}
