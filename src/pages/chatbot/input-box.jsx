import { useState } from "react";

export default function InputBox({ sendMessage, loading }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container mx-auto pb-4 flex justify-between items-center border-t border-gray-600 pt-4"
    >
      {loading && (
        <div className="border-t-4 border-b-4 border-black rounded-full w-8 h-8 animate-spin inline mr-4"></div>
      )}
      <input
        disabled={loading}
        type="text"
        className="w-full px-4 py-2 bg-black text-white placeholder-white rounded-lg focus:outline-none"
        placeholder="Ask me something..."
        value={loading ? "Loading..." : input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-500"
      >
        Send
      </button>
    </form>
  );
}
