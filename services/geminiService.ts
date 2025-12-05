import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateGeminiResponse = async (prompt: string, systemInstruction?: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "Não foi possível gerar uma resposta no momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Erro ao contatar a IA. Por favor, verifique sua conexão ou tente novamente mais tarde.";
  }
};