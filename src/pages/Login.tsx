import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError('Falha no login. Verifique seu e-mail e senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="absolute left-0 top-0 flex w-full items-center justify-between px-6 py-4 sm:px-10 z-10">
          <div className="flex items-center gap-3 text-white">
            <div className="size-6 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-white text-lg font-bold">DocGen IA</h2>
          </div>
        </header>

        <main className="flex flex-1 items-center justify-center py-5">
          <div className="w-full max-w-7xl px-4">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Image Section */}
              <div className="hidden items-center justify-center lg:flex">
                <div 
                  className="h-[400px] w-full max-w-md rounded-xl bg-center bg-no-repeat bg-cover shadow-2xl shadow-primary/20" 
                  style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")' }}
                ></div>
              </div>

              {/* Form Section */}
              <div className="flex items-center justify-center">
                <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col items-center gap-8">
                  <div className="flex w-full flex-col gap-2 text-center">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Acesse sua conta</h1>
                    <h2 className="text-sm text-slate-600 dark:text-slate-400">Bem-vindo de volta! Faça login para continuar.</h2>
                  </div>
                  
                  {error && (
                    <div className="w-full p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg text-center font-medium border border-red-200 dark:border-red-900">
                      {error}
                    </div>
                  )}

                  <div className="flex w-full flex-col gap-6">
                    <div className="flex w-full flex-col gap-4">
                      <label className="flex flex-col">
                        <p className="pb-2 text-sm font-medium text-slate-700 dark:text-slate-300">E-mail</p>
                        <div className="flex w-full flex-1 items-stretch rounded-lg">
                          <div className="text-slate-500 dark:text-slate-400 flex items-center justify-center rounded-l-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/40 pl-4 border-r-0">
                            <span className="material-symbols-outlined text-lg">mail</span>
                          </div>
                          <input 
                            required
                            type="email" 
                            className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 dark:focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/40 h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-3 text-sm font-normal" 
                            placeholder="seuemail@exemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </label>
                      
                      <label className="flex flex-col">
                        <div className="flex items-center justify-between pb-2">
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Senha</p>
                          <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">Esqueci minha senha</Link>
                        </div>
                        <div className="flex w-full flex-1 items-stretch rounded-lg">
                          <div className="text-slate-500 dark:text-slate-400 flex items-center justify-center rounded-l-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/40 pl-4 border-r-0">
                            <span className="material-symbols-outlined text-lg">lock</span>
                          </div>
                          <input 
                            required
                            type="password" 
                            className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 dark:focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/40 h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-3 text-sm font-normal" 
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </label>
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 w-full bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span className="truncate">{loading ? 'Entrando...' : 'Entrar'}</span>
                    </button>
                  </div>
                  
                  <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                    Não tem uma conta? <Link to="/register" className="font-semibold text-primary hover:underline">Cadastre-se</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="flex w-full items-center justify-center p-6">
          <p className="text-xs text-slate-500 dark:text-slate-400">© 2024 DocGen IA. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default Login;