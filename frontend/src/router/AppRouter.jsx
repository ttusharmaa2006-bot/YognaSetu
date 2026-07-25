import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AllSchemes from '../pages/AllSchemes';
import SchemeDetails from '../pages/SchemeDetails';
import UserProfile from '../pages/UserProfile';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageSchemes from '../pages/admin/ManageSchemes';
import CreateScheme from '../pages/admin/CreateScheme';
import EditScheme from '../pages/admin/EditScheme';
import NotFound from '../pages/NotFound';

const AppRouter = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="schemes" element={<AllSchemes />} />
            <Route path="schemes/:id" element={<SchemeDetails />} />

            {/* Protected User Profile Route */}
            <Route element={<ProtectedRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN']} />}>
              <Route path="profile" element={<UserProfile />} />
            </Route>

            {/* Protected Admin Portal Routes */}
            <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} />}>
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/schemes" element={<ManageSchemes />} />
              <Route path="admin/schemes/create" element={<CreateScheme />} />
              <Route path="admin/schemes/edit/:id" element={<EditScheme />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};


export default AppRouter;

