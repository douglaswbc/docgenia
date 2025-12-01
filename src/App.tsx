import React from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Specialties from './pages/Specialties';
import CreateDocument from './pages/CreateDocument';
import MyDocuments from './pages/MyDocuments';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';

// Componente para proteger rotas privadas
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark text-primary">
        <span className="material-symbols-outlined animate-spin text-4xl">progress_activity</span>
      </div>
    );
  }
  
  if (!session) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

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
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Rotas Protegidas */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/specialties/:category" element={<ProtectedRoute><Specialties /></ProtectedRoute>} />
            <Route path="/create-document" element={<ProtectedRoute><CreateDocument /></ProtectedRoute>} />
            <Route path="/my-documents" element={<ProtectedRoute><MyDocuments /></ProtectedRoute>} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;