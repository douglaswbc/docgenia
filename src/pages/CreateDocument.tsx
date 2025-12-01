import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { generateDocumentContent } from '../services/geminiService';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify'; // Importe o toast

const CreateDocument: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || '';
  
  const [clientName, setClientName] = useState('');
  const [details, setDetails] = useState('');
  const [docType, setDocType] = useState(initialType);
  const [specialty, setSpecialty] = useState('Jurídico');
  
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (initialType) setDocType(initialType);
  }, [initialType]);

  const handleGenerate = async () => {
    if (!clientName || !details) {
      toast.warn('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    setIsGenerating(true);
    setGeneratedContent(''); // Clear previous content

    try {
      const content = await generateDocumentContent(specialty, docType, clientName, details);
      setGeneratedContent(content);
      toast.success('Documento gerado com sucesso!');
    } catch (err) {
      toast.error('Erro ao conectar com a IA. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!generatedContent || !user) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase.from('documents').insert({
        user_id: user.id,
        title: `${docType} - ${clientName}`,
        specialty,
        type: docType,
        status: 'Draft',
        content: generatedContent
      });

      if (error) throw error;
      
      toast.success('Documento salvo no histórico!');
      navigate('/my-documents');
    } catch (err: any) {
      console.error(err);
      toast.error('Erro ao salvar o documento.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 w-full max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-8 h-full">
        {/* Left Panel: Form */}
        <div className="w-full lg:w-2/5 xl:w-1/3 flex flex-col gap-6">
          <div>
            <h1 className="text-gray-900 dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">Criação de Novo Documento</h1>
          </div>
          
          <div className="space-y-6 bg-white dark:bg-card-dark p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="text-gray-900 dark:text-white tracking-tight text-xl font-bold leading-tight">Preencha os Dados para Geração</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col col-span-2 sm:col-span-1">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 pb-2">Especialidade</p>
                <select 
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="flex w-full min-w-0 flex-1 rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-background-dark h-12 px-3 text-base font-normal leading-normal"
                >
                  <option>Jurídico</option>
                  <option>Marketing</option>
                  <option>Recursos Humanos</option>
                  <option>Tecnologia</option>
                  <option>Finanças</option>
                </select>
              </label>
              <label className="flex flex-col col-span-2 sm:col-span-1">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 pb-2">Tipo de Documento</p>
                <select 
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="flex w-full min-w-0 flex-1 rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-background-dark h-12 px-3 text-base font-normal leading-normal"
                >
                   {/* Dynamically populate based on specialty if needed, for now mostly generic + passed param */}
                  <option value={docType}>{docType || 'Selecione...'}</option>
                  <option>Contrato de Prestação de Serviços</option>
                  <option>Notificação Extrajudicial</option>
                  <option>Termos de Uso</option>
                  <option>Política de Privacidade</option>
                  <option>Relatório Mensal</option>
                </select>
              </label>
            </div>

            <label className="flex flex-col">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 pb-2">Nome do Cliente</p>
              <input 
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="flex w-full min-w-0 flex-1 rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-background-dark h-12 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-3 text-base font-normal leading-normal" 
                placeholder="Insira o nome completo do cliente"
              />
            </label>

            <label className="flex flex-col">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 pb-2">Objeto do Documento</p>
              <textarea 
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="flex w-full min-w-0 flex-1 rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-background-dark placeholder:text-gray-400 dark:placeholder:text-gray-500 p-3 text-base font-normal leading-normal resize-none" 
                placeholder="Descreva brevemente o principal objetivo do documento (ex: valores, prazos, obrigações)..."
              ></textarea>
            </label>

            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`flex w-full items-center justify-center gap-2 rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-wide hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark transition-colors ${isGenerating ? 'opacity-70 cursor-wait' : ''}`}
            >
               {isGenerating ? (
                 <>
                   <span className="material-symbols-outlined animate-spin">progress_activity</span>
                   Gerando...
                 </>
               ) : (
                 <>
                   <span className="material-symbols-outlined">auto_awesome</span>
                   Gerar Documento
                 </>
               )}
            </button>
          </div>
        </div>

        {/* Right Panel: Document Viewer */}
        <div className="w-full lg:w-3/5 xl:w-2/3">
          <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-800 h-full min-h-[500px] flex flex-col shadow-sm">
            {!generatedContent && !isGenerating ? (
              /* Initial State */
              <div className="flex flex-col items-center justify-center text-center p-8 flex-1 animate-in fade-in zoom-in duration-300">
                <div className="flex items-center justify-center size-20 rounded-full bg-gray-100 dark:bg-background-dark mb-6">
                  <span className="material-symbols-outlined text-5xl text-gray-400 dark:text-gray-500">description</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Seu documento aparecerá aqui</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm">Preencha o formulário à esquerda e clique em "Gerar Documento" para que a nossa IA crie o conteúdo para você.</p>
              </div>
            ) : isGenerating ? (
               /* Loading State */
              <div className="flex flex-col items-center justify-center text-center p-8 flex-1">
                 <div className="flex items-center justify-center size-20 rounded-full bg-primary/10 mb-6 animate-pulse">
                   <span className="material-symbols-outlined text-5xl text-primary">auto_awesome</span>
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Criando documento...</h3>
                 <p className="text-gray-500 dark:text-gray-400">A inteligência artificial está redigindo o conteúdo.</p>
              </div>
            ) : (
              /* Generated State */
              <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">Documento Gerado</h3>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex items-center justify-center gap-2 rounded-lg h-9 px-4 bg-green-600 text-white text-sm font-bold hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      {isSaving ? <span className="material-symbols-outlined animate-spin text-sm">sync</span> : <span className="material-symbols-outlined text-lg">save</span>}
                      {isSaving ? 'Salvando...' : 'Salvar no Histórico'}
                    </button>
                    <button className="flex items-center justify-center gap-2 rounded-lg h-9 px-4 bg-primary/10 dark:bg-primary/20 text-primary text-sm font-bold hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors">
                      <span className="material-symbols-outlined text-lg">content_copy</span>
                      Copiar
                    </button>
                  </div>
                </div>
                <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
                  <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none whitespace-pre-wrap font-serif">
                    {generatedContent}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDocument;