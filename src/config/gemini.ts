import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

const geminiAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

export const geminiFileManager = new GoogleAIFileManager(
  process.env.GEMINI_API_KEY ?? ""
);

export const geminiModel = geminiAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
