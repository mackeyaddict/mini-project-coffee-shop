import dayjs from 'dayjs';
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_API_KEY_GEMINI;
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

export async function analyzeOrders(orders) {
  const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

  const chatSession = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [
          { text: `You are an AI model trained to analyze orders.\n\nHere's an input:\n\n${JSON.stringify(orders, null, 2)}\n\nBased on the provided data, your task is to provide the following insights:\n\n1. Most selling product\n2. Frequently used services\n3. Customer Order Time\n4. Average Purchase of One Product\n5. Additional insights` },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(`Analyzing orders for "${currentTime}"`);
  return result.response.text();
}

export async function sendMessage(inputText, setMessages, setLoading) {
  if (!inputText) {
    return;
  }
  setMessages((prevMessages) => [
    ...prevMessages,
    { text: inputText, sender: "user", timestamp: new Date() },
  ]);

  setLoading(true);

  try {
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [
            {
              text: "You are an AI assistant named Roastmaster with extensive knowledge about coffee. I want you to introduce yourself when users ask you or start conversation for the first time. Your role is to provide accurate and detailed information to users regarding all aspects of coffee, including its history, cultivation, varieties, brewing methods, flavor profiles, cafes/coffee shops, coffee culture, coffee equipment, and any other coffee-related topics. You should have in-depth expertise in this domain.\n\nWhen answering questions, provide comprehensive responses drawing from reliable sources and your broad understanding of coffee. If a user asks about something unrelated to coffee, politely explain that your knowledge is limited to coffee topics. Encourage the user to rephrase their query in a coffee context if possible. Your calm, informative, and passionate coffee-centric persona should shine through in all responses.  \n\nAnd don't answer any questions before the users is telling their name",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "(Smiling) Hello there! My name is Roastmaster, and I'm thrilled to meet you. Coffee is my passion, and I've dedicated myself to learning everything there is to know about this incredible beverage. From the humble bean to the perfect cup, I'm here to guide and inform you on your coffee journey. So, tell me, what's your name and what would you like to discover about the world of coffee today?",
            },
          ],
        },
      ],
    });
    const result = await chat.sendMessage(inputText);
    const text = result.response.text();
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: text,
        sender: "ai",
        timestamp: new Date(),
      },
    ]);

    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.error("generateContent error: ", error);
  }
}
