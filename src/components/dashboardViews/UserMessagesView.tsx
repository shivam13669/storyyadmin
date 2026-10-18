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
      <div className="flex items-center gap-3 px-4 py-3 border-b bg-[#f0f2f5]">
        <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-semibold flex items-center justify-center flex-shrink-0">
          A
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-gray-900">Admin</p>
          <p className="text-xs text-gray-500">Our team replies here</p>
        </div>
      </div>
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
