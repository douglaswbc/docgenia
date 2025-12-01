import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Document } from '../types';

const MyDocuments: React.FC = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user) {
      fetchDocuments();
    }
  }, [user]);

  const fetchDocuments = async () => {
    try {
      // Busca documentos do usuário logado
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        // Mapeia os dados do banco (snake_case) para o tipo frontend (camelCase)
        const formattedDocs: Document[] = data.map((doc: any) => ({
          id: doc.id,
          title: doc.title,
          specialty: doc.specialty,
          type: doc.type,
          createdAt: new Date(doc.created_at).toLocaleDateString('pt-BR'),
          updatedAt: new Date(doc.updated_at).toLocaleDateString('pt-BR'),
          status: doc.status,
        }));
        setDocuments(formattedDocs);
      }
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDocs = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center w-full flex-1">
      <div className="w-full max-w-[1280px] px-4 md:px-10 py-5">
        
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-4 py-6">
          <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] text-gray-900 dark:text-white min-w-72">Meus Documentos</h1>
          <Link to="/create-document" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined mr-2">add</span>
            <span className="truncate">Gerar Novo Documento</span>
          </Link>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="flex-grow">
            <div className="flex w-full items-center rounded-lg h-12 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-800 px-4">
              <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">search</span>
              <input 
                className="flex w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 px-3 text-base" 
                placeholder="Buscar por nome do documento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
             {/* Filtros visuais - lógica pode ser adicionada depois */}
            {['Especialidade', 'Status', 'Data'].map((filter) => (
               <button key={filter} className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-800 pl-4 pr-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-gray-700 dark:text-gray-200 text-sm font-medium">
                {filter}
                <span className="material-symbols-outlined text-base">expand_more</span>
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111318] shadow-sm min-h-[300px]">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <span className="material-symbols-outlined animate-spin text-primary text-3xl">progress_activity</span>
            </div>
          ) : filteredDocs.length === 0 ? (
             <div className="flex flex-col h-64 items-center justify-center text-gray-500 dark:text-gray-400">
               <span className="material-symbols-outlined text-4xl mb-2">folder_open</span>
               <p>Nenhum documento encontrado.</p>
             </div>
          ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-[#1c1f27] border-b border-gray-200 dark:border-gray-800">
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white text-sm font-semibold leading-normal">Nome do Documento</th>
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white text-sm font-semibold leading-normal hidden md:table-cell">Especialidade</th>
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white text-sm font-semibold leading-normal hidden lg:table-cell">Data</th>
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white text-sm font-semibold leading-normal hidden lg:table-cell">Status</th>
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white text-sm font-semibold leading-normal">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-[#1c1f27]/50 transition-colors">
                    <td className="px-6 py-4 text-gray-900 dark:text-white text-sm font-medium">
                      {doc.title}
                      <span className="md:hidden block text-xs text-gray-500 mt-1">{doc.specialty}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-[#9da6b9] text-sm hidden md:table-cell">{doc.specialty}</td>
                    <td className="px-6 py-4 text-gray-500 dark:text-[#9da6b9] text-sm hidden lg:table-cell">{doc.createdAt}</td>
                    <td className="px-6 py-4 text-sm hidden lg:table-cell">
                      <span className={`px-2 py-1 rounded text-xs font-medium 
                        ${doc.status === 'Final' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                          doc.status === 'Review' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 
                          'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-[#282e39] dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors" title="Visualizar">
                          <span className="material-symbols-outlined text-xl">visibility</span>
                        </button>
                        <button className="p-2 rounded-md text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors" title="Excluir">
                          <span className="material-symbols-outlined text-xl">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyDocuments;