import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY not found in environment variables");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateDocumentContent = async (
  specialty: string,
  docType: string,
  clientName: string,
  details: string
): Promise<string> => {
  const ai = getAiClient();
  if (!ai) {
    return "Erro: Chave de API não configurada. Por favor, configure a API_KEY no ambiente.";
  }

  const prompt = `
    Atue como um especialista em ${specialty}.
    Escreva um documento completo do tipo "${docType}" para o cliente "${clientName}".
    
    Detalhes e Objeto do documento:
    ${details}

    Diretrizes:
    1. Use uma linguagem profissional e técnica adequada para a área de ${specialty}.
    2. Formate o documento usando Markdown (títulos, listas, negrito).
    3. Inclua espaços reservados [ENTRE COLCHETES] para informações que precisariam ser preenchidas manualmente (ex: datas específicas, valores monetários se não informados).
    4. O documento deve ser estruturado de forma lógica e completa.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "Não foi possível gerar o conteúdo. Tente novamente.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ocorreu um erro ao gerar o documento. Verifique sua conexão e tente novamente.";
  }
};
