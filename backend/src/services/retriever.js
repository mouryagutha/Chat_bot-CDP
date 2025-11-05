const { GoogleGenerativeAI } = require("@google/generative-ai");
const { index, docStore } = require("./indexer");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Retrieve answer from indexed documentation
const retrieveAnswer = async (query) => {
  try {
    // Convert query to vector (Replace with real embeddings)
    let queryVector = Array.from({length: 512}, () => Math.random());

    // Check if index is empty
    if (index.ntotal === 0) {
      return "Please index some documentation first before asking questions.";
    }

    // Search in FAISS index
    const result = index.search(queryVector, 1);
    const docId = result.labels[0];
    const context = docStore[docId];

    // Generate response using Gemini AI
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Context: ${context}\n\nQuestion: ${query}\n\nPlease answer the question based on the given context.`;
    const response = await model.generateContent(prompt);

    return response.response.text();
  } catch (error) {
    if (error.message.includes('models/gemini-pro is not found')) {
      throw new Error('Gemini API configuration error. Please check your API key and model version.');
    }
    throw error;
  }
};

module.exports = { retrieveAnswer };