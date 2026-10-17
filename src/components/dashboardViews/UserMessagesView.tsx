import { useState } from "react";
import { ChatThread } from "@/components/messaging/ChatThread";
import { usePolling } from "@/hooks/usePolling";
import { ChatMessage, getMyMessages, markMyMessagesSeen, sendMyMessage } from "@/lib/api";

const POLL_INTERVAL_MS = 2000;

export const UserMessagesView = ({ userId }: { userId: number }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  usePolling(async () => {
    const { messages: latest } = await getMyMessages(userId);
    setMessages(latest);
    setIsLoading(false);

    const hasUnseenFromAdmin = latest.some((message) => message.senderRole === "admin" && !message.seenAt);
    if (hasUnseenFromAdmin && document.visibilityState === "visible") {
      await markMyMessagesSeen(userId);
    }
  }, POLL_INTERVAL_MS);

  const handleSend = async (body: string) => {
    const { message } = await sendMyMessage(userId, body);
    setMessages((previous) => [...previous, message]);
  };

  return (
    <div className="flex flex-col h-[70vh] min-h-[420px] bg-white rounded-2xl shadow-md overflow-hidden">
      <ChatThread
        messages={messages}
        currentRole="user"
        onSend={handleSend}
        isLoading={isLoading}
        emptyText="No messages yet. Send a message and our team will reply here."
      />
    </div>
  );
};
