import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import InputBox from "./input-box";
import { sendMessage } from "../../utils/ai";

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
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

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
      <InputBox sendMessage={(inputText) => sendMessage(inputText, setMessages, setLoading)} loading={loading} />
    </div>
  );
}
