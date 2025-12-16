import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Explicitly using Gemini 2.5 Flash Image as requested
const MODEL_NAME = 'gemini-2.5-flash-image';

/**
 * Parses a Data URL to extract the MIME type and the raw base64 data.
 */
const parseImage = (dataUrl: string) => {
  const matches = dataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
  if (matches && matches.length === 3) {
    return {
      mimeType: matches[1],
      data: matches[2]
    };
  }
  // Fallback: assume jpeg if no prefix found or unexpected format
  return {
    mimeType: 'image/jpeg',
    data: dataUrl.replace(/^data:image\/\w+;base64,/, "")
  };
};

/**
 * General image editing based on text prompt.
 * Used for both General Edit and Action Swap modes.
 */
export const editImage = async (
  sourceImage: string,
  instruction: string
): Promise<string> => {
  try {
    const source = parseImage(sourceImage);

    // Optimized prompt for Gemini 2.5 Flash Image capabilities
    const prompt = `
      Task: Edit the provided image according to the following instruction: "${instruction}".
      
      Guidelines:
      1. The instruction might be in English or Indonesian (Bahasa Indonesia). Process it accurately.
      2. If the instruction is an action (e.g., "eating", "makan", "sleeping", "tidur"), modify the subject's pose and context to perform that action naturally while preserving the subject's identity.
      3. For general edits, strictly follow the visual changes described (e.g., lighting, background, style).
      4. Ensure the output is high-quality and photorealistic unless specified otherwise.
      5. Return ONLY the edited image.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            text: prompt
          },
          {
            inlineData: {
              mimeType: source.mimeType,
              data: source.data
            }
          }
        ]
      }
    });

    return extractImageFromResponse(response);
  } catch (error) {
    console.error("Image Edit Error:", error);
    throw error;
  }
};

// Helper to extract the image bytes from the complex response structure
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extractImageFromResponse = (response: any): string => {
  // Check candidates for inline data (generated image)
  const candidates = response.candidates;
  if (candidates && candidates.length > 0) {
    for (const part of candidates[0].content.parts) {
      if (part.inlineData && part.inlineData.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  }
  
  throw new Error("Tidak ada gambar yang dihasilkan oleh AI.");
};