import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import PanelPage from './pages/PanelPage.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/panel"
        element={
          <PrivateRoute>
            <PanelPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/panel" replace />} />
    </Routes>
  )
}
