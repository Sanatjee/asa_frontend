import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/Auth/Login';
import DashBoard from '../pages/Dashboard/DashBoard';
import Users from '../pages/Users/Users';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';
import Chat from '../pages/Chats/Chat';
import RolePermissionPage from '../pages/RBAC/RolePermissionPage';

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Private */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={<DashBoard />}
          />

          <Route
            path="/users"
            element={<Users />}
          />

          <Route
            path="/chats"
            element={<Chat />}
          />

           <Route
            path="/roles-and-permissions"
            element={<RolePermissionPage />}
          />
          
        </Route>
      </Route>

      <Route
        path="*"
        element={<Navigate to="/dashboard" />}
      />
    </Routes>
  );
}

export default AppRoutes;