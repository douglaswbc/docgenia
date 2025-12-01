import React from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
// IMPORTS DO TOASTIFY
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Specialties from './pages/Specialties';
import CreateDocument from './pages/CreateDocument';
import MyDocuments from './pages/MyDocuments';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';

// ... (Mantenha o componente ProtectedRoute igual) ...
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, loading } = useAuth();
  if (loading) return <div className="flex min-h-screen items-center justify-center"><span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span></div>;
  if (!session) return <Navigate to="/" replace />;
  return <>{children}</>;
};

// ... (Mantenha o componente Layout igual) ...
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const hideNavbarPaths = ['/', '/register', '/forgot-password'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {showNavbar && <Navbar />}
      <main className="flex-grow flex flex-col">
        {children}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Layout>
          {/* ADICIONE O TOASTCONTAINER AQUI */}
          <ToastContainer 
            position="top-right" 
            autoClose={3000} 
            theme="colored" 
          />
          
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/specialties/:category" element={<ProtectedRoute><Specialties /></ProtectedRoute>} />
            <Route path="/create-document" element={<ProtectedRoute><CreateDocument /></ProtectedRoute>} />
            <Route path="/my-documents" element={<ProtectedRoute><MyDocuments /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;