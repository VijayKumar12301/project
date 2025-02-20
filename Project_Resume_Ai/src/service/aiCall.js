import axios from "axios";

export async function simpleChat(text) {
  try {
    const { data } = await axios.post("/api/ai/analzeresume", { text });
    return data.data;
  } catch (error) {
    console.error("Error calling /api/process:", error);
    throw error;
  }
}

export async function jobAnalysis({ extractedText, jobDescription }) {
  try {
    const { data } = await axios.post("/api/ai/jobanalysis", { extractedText, jobDescription });
    return data;
  } catch (error) {
    console.error("Error calling /api/jobanalysis:", error);
    throw error;
  }
}
