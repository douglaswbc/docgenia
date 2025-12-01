import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) throw error;
      
      // Sucesso
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4">
      <header className="absolute top-0 left-0 flex w-full items-center justify-between whitespace-nowrap p-6 sm:p-10">
        <div className="flex items-center gap-4 text-gray-800 dark:text-white">
          <div className="size-6 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path></svg>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">DocGen IA</h2>
        </div>
      </header>

      <main className="w-full max-w-md">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-black leading-tight tracking-[-0.033em] text-gray-900 dark:text-white">Crie sua Conta</h1>
            <p className="text-base font-normal leading-normal text-gray-600 dark:text-[#9da6b9]">Comece a criar documentos inteligentes hoje</p>
          </div>

          <div className="flex flex-col gap-6">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium text-center border border-red-200 dark:border-red-800">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col">
                <p className="pb-2 text-sm font-medium leading-normal text-gray-800 dark:text-white">Nome</p>
                <input 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex h-12 w-full flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-white p-3 text-base font-normal leading-normal text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-[#3b4354] dark:bg-[#1c1f27] dark:text-white dark:placeholder:text-[#9da6b9] dark:focus:border-primary" 
                  placeholder="Seu nome completo" 
                  type="text"
                />
              </label>
              <label className="flex flex-col">
                <p className="pb-2 text-sm font-medium leading-normal text-gray-800 dark:text-white">E-mail</p>
                <input 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex h-12 w-full flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-white p-3 text-base font-normal leading-normal text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-[#3b4354] dark:bg-[#1c1f27] dark:text-white dark:placeholder:text-[#9da6b9] dark:focus:border-primary" 
                  placeholder="seuemail@exemplo.com" 
                  type="email"
                />
              </label>
              <label className="flex flex-col">
                <p className="pb-2 text-sm font-medium leading-normal text-gray-800 dark:text-white">Senha</p>
                <input 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex h-12 w-full flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-white p-3 text-base font-normal leading-normal text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-[#3b4354] dark:bg-[#1c1f27] dark:text-white dark:placeholder:text-[#9da6b9] dark:focus:border-primary" 
                  placeholder="Crie uma senha forte (mín. 6 chars)" 
                  type="password"
                />
              </label>
              <label className="flex flex-col">
                <p className="pb-2 text-sm font-medium leading-normal text-gray-800 dark:text-white">Confirmar Senha</p>
                <input 
                  required 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="flex h-12 w-full flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-white p-3 text-base font-normal leading-normal text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-[#3b4354] dark:bg-[#1c1f27] dark:text-white dark:placeholder:text-[#9da6b9] dark:focus:border-primary" 
                  placeholder="Repita sua senha" 
                  type="password"
                />
              </label>
              
              <button 
                type="submit" 
                disabled={loading}
                className="mt-2 flex h-12 w-full items-center justify-center rounded-lg bg-primary px-6 text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Criando conta...' : 'Registrar'}
              </button>
            </form>
          </div>
          
          <p className="text-center text-sm text-gray-600 dark:text-[#9da6b9]">
            Já tem uma conta? <Link to="/" className="font-medium text-primary hover:underline">Entre aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;