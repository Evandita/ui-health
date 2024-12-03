"use client"

import React, { useState, useRef, useEffect } from "react";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyDkGT5897ffEhsB39o2tEkcJaLGFpgGvx8";


const AiPage = () => {
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);
  const [userInput, setUserInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const sendMessage = async (prompt: string) => {
    setIsLoading(true);

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    try {
      const result = await chatSession.sendMessage(prompt);
      const aiResponse = await result.response.text();

      setMessages((prev) => [
        ...prev,
        { role: "user", text: prompt },
        { role: "ai", text: aiResponse },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "user", text: prompt },
        { role: "ai", text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
      setUserInput(""); // Clear input after submission
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"; // Reset height
      }
    }
  };

  const handleSubmit = async () => {
    if (userInput.trim() === "") return;
    await sendMessage(userInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        200,
        textareaRef.current.scrollHeight
      )}px`;
    }
  };

  // Scroll to bottom when new message is added
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Sidebar Toggle Button */}
      <div className="fixed top-0 left-0 h-full flex items-center z-10">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="bg-blue-500 text-white p-2 rounded-md shadow-lg"
        >
          Open Chat
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-20 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-80`}
      >
        <div className="flex flex-col h-full">

          {/* Chat History */}
          <div
            className="flex-1 overflow-y-auto bg-gray-50 border rounded-lg p-4 flex flex-col"
            ref={chatHistoryRef}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-100 text-blue-800 self-end"
                    : "bg-gray-200 text-gray-800 self-start"
                }`}
              >
                <strong>{msg.role === "user" ? "You" : "AI"}:</strong>
                <p>{msg.text}</p>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center justify-start mt-2">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 animate-spin"></div>
                <p className="ml-2 text-gray-600">AI is typing...</p>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="mt-4 flex items-start p-4 border-t"
          >
            <textarea
              ref={textareaRef}
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter your message..."
              rows={1}
              className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none resize-none overflow-hidden"
              style={{ maxHeight: "200px" }}
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 flex-shrink-0 ${
                isLoading ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
        />
      )}

      {/* Loader CSS */}
      <style jsx>{`
        .loader {
          border-top-color: #3498db;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default AiPage;