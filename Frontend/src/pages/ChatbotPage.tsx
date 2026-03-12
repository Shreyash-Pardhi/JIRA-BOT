import React, { useState, useRef, useEffect } from 'react';
import chatbotService, { type ChatMessage } from '../services/chatbot.service';
import Button from '../components/common/Button';
import Header from '../components/common/Header';

export const ChatbotPage: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: chatbotService.generateMessageId(),
            text: "Hello! I'm your AI assistant. How can I help you with your projects today?",
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!inputValue.trim()) return;

        // Add user message
        const userMessage: ChatMessage = {
            id: chatbotService.generateMessageId(),
            text: inputValue.trim(),
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            // Get AI response
            const aiResponseText = await chatbotService.getAIResponse(userMessage.text);

            const botMessage: ChatMessage = {
                id: chatbotService.generateMessageId(),
                text: aiResponseText,
                sender: 'bot',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error getting AI response:', error);

            const errorMessage: ChatMessage = {
                id: chatbotService.generateMessageId(),
                text: 'Sorry, I encountered an error. Please try again.',
                sender: 'bot',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
            inputRef.current?.focus();
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-100 flex flex-col">
            {/* Navigation */}
            <Header />

            {/* Main Chat Container */}
            <div className="flex-1 overflow-hidden flex flex-col">
                <div className="max-w-6xl mx-auto w-full h-full flex flex-col px-4 sm:px-6 lg:px-8 py-8">
                    {/* Chat Header */}
                    <div className="mb-6 pb-6 border-b border-gray-200">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Assistant</h1>
                        <p className="text-gray-600">Ask me anything about your projects and issues</p>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 overflow-y-auto mb-6 space-y-4 pr-2">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-md lg:max-w-2xl px-6 py-4 rounded-2xl shadow-sm transition-all duration-200 ${message.sender === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none'
                                        }`}
                                >
                                    <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                                        {message.text}
                                    </p>
                                    <div
                                        className={`text-xs mt-2 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                                            }`}
                                    >
                                        {message.timestamp.toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Loading Indicator */}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-6 py-4">
                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Scroll target */}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Section */}
                    <div className="border-t border-gray-200 pt-6">
                        <form onSubmit={handleSendMessage} className="flex gap-4">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type your question here..."
                                disabled={isLoading}
                                className="flex-1 px-6 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200"
                            />
                            <Button
                                type="submit"
                                disabled={isLoading || !inputValue.trim()}
                                variant="primary"
                                className="px-8 rounded-2xl whitespace-nowrap"
                            >
                                {isLoading ? 'Sending...' : 'Send'}
                            </Button>
                        </form>
                        <p className="text-xs text-gray-500 mt-3 text-center">
                            This is a demo version. Regular responses are being used for testing.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
