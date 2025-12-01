import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname.startsWith(path) 
      ? "text-primary dark:text-primary" 
      : "text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary";
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-gray-200 dark:border-gray-800 px-6 sm:px-10 h-16 bg-white/80 dark:bg-background-dark/80 backdrop-blur-sm">
      <div className="flex items-center gap-4 text-gray-900 dark:text-white">
        <div className="size-6 text-primary">
           <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor"></path>
          </svg>
        </div>
        <Link to="/dashboard">
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] hover:opacity-80 transition-opacity">DocGen IA</h2>
        </Link>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex flex-1 justify-center items-center gap-9">
        <Link to="/dashboard" className={`text-sm font-medium leading-normal transition-colors ${isActive('/dashboard')}`}>Dashboard</Link>
        <Link to="/my-documents" className={`text-sm font-medium leading-normal transition-colors ${isActive('/my-documents')}`}>Documentos</Link>
        <Link to="/settings" className={`text-sm font-medium leading-normal transition-colors ${isActive('/settings')}`}>Configurações</Link>
      </nav>

      <div className="flex items-center gap-4">
        <button className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-xl">notifications</span>
        </button>
        <div 
          className="size-10 rounded-full bg-cover bg-center bg-no-repeat ring-2 ring-transparent hover:ring-primary/50 transition-all cursor-pointer" 
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAoMiDXKbI0p7amu0uYp41NHRvT0mzVKhqatEX1cD1jQbxvBc6fxNGK2jJswXkEN6ix-atdcsCfLtBodq0eRrcwPRujhbRaM_EhrMtlQB-aNNhYzmCHr6VKQ0jnx88e42LX3nWZ2hCv0WaKC6IXhAbrPMMRwbZFkb8Fdutb583Aga46lxqRPYaZYHH8M_w8ciiHCEyjVOoNvD5WWizg_n6j7hBvYOAxCz7SYruLrPAYtW4Qcfh6HYBtU177oAlNj_PU6DSCjWLgdxs")' }}
          title="User Profile"
        ></div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/5"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-background-dark border-b border-gray-200 dark:border-gray-800 p-4 flex flex-col gap-4 md:hidden shadow-xl">
          <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded">Dashboard</Link>
          <Link to="/my-documents" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded">Documentos</Link>
          <Link to="/settings" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded">Configurações</Link>
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded">Sair</Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
