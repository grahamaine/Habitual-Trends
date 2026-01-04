
import { GoogleGenAI, Type, Modality } from "@google/genai";

// Ensure process.env.API_KEY is handled externally as per instructions
const getClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getFastResponse = async (prompt: string) => {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-lite-latest',
    contents: prompt,
  });
  return response.text;
};

export const startSmartChat = (systemInstruction: string) => {
  const ai = getClient();
  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction,
    },
  });
};

export const searchWellnessInfo = async (query: string) => {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: query,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });
  
  const text = response.text;
  const groundingLinks = response.candidates?.[0]?.groundingMetadata?.groundingChunks
    ?.filter(chunk => chunk.web)
    ?.map(chunk => ({
      uri: chunk.web?.uri || '',
      title: chunk.web?.title || 'Related Source'
    })) || [];
    
  return { text, groundingLinks };
};

export const findWellnessPlaces = async (query: string, latitude?: number, longitude?: number) => {
  const ai = getClient();
  const config: any = {
    tools: [{ googleMaps: {} }, { googleSearch: {} }],
  };

  if (latitude && longitude) {
    config.toolConfig = {
      retrievalConfig: {
        latLng: { latitude, longitude }
      }
    };
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: query,
    config,
  });

  const text = response.text;
  const groundingLinks = response.candidates?.[0]?.groundingMetadata?.groundingChunks
    ?.filter(chunk => chunk.maps)
    ?.map(chunk => ({
      uri: chunk.maps?.uri || '',
      title: chunk.maps?.title || 'Map Location'
    })) || [];

  return { text, groundingLinks };
};

export const generateWellnessImage = async (prompt: string, imageSize: '1K' | '2K' | '4K' = '1K') => {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: {
      parts: [{ text: prompt }],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1",
        imageSize,
      },
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("No image data returned from Gemini");
};

export const editWellnessImage = async (base64Image: string, prompt: string) => {
  const ai = getClient();
  // Extract base64 without prefix
  const pureBase64 = base64Image.split(',')[1] || base64Image;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: pureBase64,
            mimeType: 'image/png',
          },
        },
        { text: prompt },
      ],
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};
