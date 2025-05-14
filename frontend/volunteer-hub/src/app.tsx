import { Routes, Route, Navigate } from 'react-router-dom'
import Groups from './pages/groups'
import GroupDetailPage from './pages/groupDetail'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/groups" />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/groups/:id" element={<GroupDetailPage />} />
    </Routes>
  )
}
