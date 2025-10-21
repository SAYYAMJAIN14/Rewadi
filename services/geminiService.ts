
import { GoogleGenAI } from "@google/genai";

// Fix: Initialize the GoogleGenAI client once at the module level.
// This avoids creating a new instance on every function call.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getStudyRecommendations = async (studentName: string, weakSubjects: string[]): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY is not set. AI features will not work.");
    return "AI features are currently unavailable. Please check the API key configuration.";
  }

  const prompt = `
    You are an AI Learning Assistant for a student named ${studentName}.
    Their weak subjects are: ${weakSubjects.join(', ')}.
    Generate a friendly and encouraging message with personalized study recommendations.
    For each weak subject, create a daily micro-quiz with 2-3 simple multiple-choice questions to help them practice.
    Structure your response clearly with headings for each subject.
    Keep the tone positive and motivational.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating study recommendations:", error);
    return "Sorry, I couldn't generate recommendations at the moment. Please try again later.";
  }
};
