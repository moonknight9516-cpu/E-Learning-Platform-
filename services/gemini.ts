
import { GoogleGenAI } from "@google/genai";

export const aiAssistant = {
  getCourseSummary: async (courseTitle: string, description: string) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide a 3-point bulleted summary of what a student will learn in this course: "${courseTitle}". Description: ${description}`,
        config: {
          systemInstruction: "You are an educational assistant. Keep summaries concise and motivating."
        }
      });
      return response.text || "Summary unavailable.";
    } catch (error) {
      console.error("AI Error:", error);
      return "Unlock the secrets of this domain and accelerate your career with hands-on projects and expert guidance.";
    }
  },

  generateLessonQuiz: async (lessonTitle: string, content: string) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate one multiple-choice question to test knowledge of this lesson: "${lessonTitle}". Content: ${content}`,
        config: {
          systemInstruction: "You are an expert tutor. Provide the question, 4 options, and the correct answer index.",
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              question: { type: "string" },
              options: { type: "array", items: { type: "string" } },
              answerIndex: { type: "number" }
            },
            required: ["question", "options", "answerIndex"]
          }
        }
      });
      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("AI Error:", error);
      return null;
    }
  }
};
