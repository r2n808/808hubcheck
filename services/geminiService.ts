
import { GoogleGenAI } from "@google/genai";

// Fix: Initialize the GoogleGenAI client to make actual API calls.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Calls the Gemini API to get a bot response.
 * @param prompt The user's prompt to the bot.
 * @returns A promise that resolves to the bot's response.
 */
export const getBotResponse = async (prompt: string): Promise<string> => {
  // Fix: Replaced mock implementation with a real API call to the Gemini API.
  console.log(`Calling Gemini API with prompt: "${prompt}"`);
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a helpful assistant in a chat application. Keep your response concise and helpful. User prompt: "${prompt}"`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Sorry, I encountered an error. Please try again later.";
  }
};
