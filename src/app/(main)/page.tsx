import AffirmationCard from "@/components/chatbot/affirmation-card";
import ChatInterface from "@/components/chatbot/chat-interface";

export default function ChatPage() {
  return (
    <div className="h-full flex flex-col gap-8">
      <AffirmationCard />
      <div className="flex-grow">
        <ChatInterface />
      </div>
    </div>
  );
}
