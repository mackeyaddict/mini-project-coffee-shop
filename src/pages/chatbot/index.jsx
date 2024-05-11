import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import InputBox from "./input-box";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_API_KEY_GEMINI;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const generationConfig = {
  temperature: 1,
  topK: 0,
  topP: 0.95,
  maxOutputTokens: 8192,
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

const Header = () => {
  return (
    <div className="container mx-auto text-black pt-[141px]">
      <h1 className="text-center font-semibold text-3xl">
        Hello Coffee Fellas
      </h1>
      <p className="text-center font-medium text-lg">
        Ask Me Anything About Coffee
      </p>
    </div>
  );
};

export default function ChatWindow() {
  const chatContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Auto-scroll to the bottom of the chat container when new messages are added
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async (inputText) => {
    if (!inputText) {
      return;
    }

    // Update messages with the user message
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

      // Update messages with the AI response
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
  };

  return (
    <div className="bg-white h-screen flex flex-col justify-between px-4">
      <Header />
      <div
        className="container mx-auto flex-grow overflow-y-auto pt-4"
        ref={chatContainerRef}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.sender === "user"
                ? "self-end bg-gray-300 text-black"
                : "self-start bg-black text-white"
            } p-3 mb-4 rounded-lg`}
          >
            <p className="message-text">{message.text}</p>
            <span
              className={`time ${
                message.sender === "user" ? "text-black" : "text-white"
              } text-xs`}
            >
              {message.timestamp
                ? dayjs(message.timestamp).format("DD MMMM YYYY")
                : ""}
            </span>
          </div>
        ))}
      </div>
      <InputBox sendMessage={sendMessage} loading={loading} />
    </div>
  );
}
