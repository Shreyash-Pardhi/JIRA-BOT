// Dummy responses for the chatbot
const dummyResponses = [
    "That's a great question! I can help you with that.",
    "I understand what you're asking. Let me provide some insights.",
    "Based on your project data, here's what I found.",
    "That's an interesting point. You might want to consider...",
    "I have some suggestions that could help optimize this.",
    "Let me analyze this for you...",
    "That's a common challenge. Here are some best practices...",
    "I can assist with that. Here's what I recommend...",
    "Great question! This is something many teams struggle with.",
    "I'm here to help! Let me break this down for you.",
];

export interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

class ChatbotService {
    /**
     * Get a dummy AI response
     */
    async getAIResponse(userMessage: string): Promise<string> {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Return a random dummy response
        const randomResponse = dummyResponses[Math.floor(Math.random() * dummyResponses.length)];
        return `${randomResponse}\n\nYour message: "${userMessage}"\n\n(This is a dummy response. Real AI integration coming soon!)`;
    }

    /**
     * Generate a unique message ID
     */
    generateMessageId(): string {
        return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}

export default new ChatbotService();
