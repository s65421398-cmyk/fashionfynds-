import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GOOGLE_GEMINI_API_KEY) {
  console.warn("GOOGLE_GEMINI_API_KEY is not defined in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

export const fashionModel = genAI.getGenerativeModel({
  model: "gemini-pro",
  generationConfig: {
    temperature: 0.7,
    topK: 1,
    topP: 1,
    maxOutputTokens: 500,
  },
});

export const SYSTEM_PROMPT = `
You are the FashionFynds AI Personal Stylist. You are an expert in Indian and global fashion trends.
Your goal is to help users find the perfect outfit from our curated catalog of emerging brands.
Be friendly, professional, and descriptive. Give specific advice on colors, fabrics, and how to style items together.
Always mention that you're picking these ideas specifically to bridge the 'Discovery Gap' for Indian fashion seekers.
`;
