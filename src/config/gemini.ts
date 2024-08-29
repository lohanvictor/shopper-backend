import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = new GoogleGenerativeAI(process.env.API_KEY ?? "");

export default gemini;
