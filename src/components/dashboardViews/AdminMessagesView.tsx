import { useState } from "react";
import { format, isToday } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { ChatThread } from "@/components/messaging/ChatThread";
import { usePolling } from "@/hooks/usePolling";
import {
  ChatMessage,
  MessageConversation,
  getAdminThread,
  getMessageConversations,
  markAdminThreadSeen,
  sendAdminReply,
} from "@/lib/api";

const LIST_POLL_INTERVAL_MS = 3000;
const THREAD_POLL_INTERVAL_MS = 2000;

const formatListTime = (iso: string) => {
  const date = new Date(iso);
  return isToday(date) ? format(date, "HH:mm") : format(date, "dd MMM");
};

interface AdminConversationThreadProps {
  adminId: number;
  customerId: number;
  customerName: string;
  customerEmail: string;
  onBack: () => void;
}

const AdminConversationThread = ({
  adminId,
  customerId,
  customerName,
  customerEmail,
  onBack,
}: AdminConversationThreadProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  usePolling(async () => {
    const { messages: latest } = await getAdminThread(adminId, customerId);
    setMessages(latest);
    setIsLoading(false);

    const hasUnseenFromCustomer = latest.some((message) => message.senderRole === "user" && !message.seenAt);
    if (hasUnseenFromCustomer && document.visibilityState === "visible") {
      await markAdminThreadSeen(adminId, customerId);
    }
  }, THREAD_POLL_INTERVAL_MS);

  const handleSend = async (body: string) => {
    const { message } = await sendAdminReply(adminId, customerId, body);
    setMessages((previous) => [...previous, message]);
  };

  return (
    <>
      <div className="flex items-center gap-3 px-4 py-3 border-b bg-white">
        <button onClick={onBack} className="md:hidden p-1 text-gray-600" aria-label="Back to conversations">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="min-w-0">
          <p className="font-semibold text-gray-900 truncate">{customerName}</p>
          <p className="text-xs text-gray-500 truncate">{customerEmail}</p>
        </div>
      </div>
      <ChatThread
        messages={messages}
        currentRole="admin"
        onSend={handleSend}
        isLoading={isLoading}
        emptyText="No messages in this conversation yet."
      />
    </>
  );
};

export const AdminMessagesView = ({ adminId }: { adminId: number }) => {
  const [conversations, setConversations] = useState<MessageConversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  usePolling(async () => {
    const { conversations: latest } = await getMessageConversations(adminId);
    setConversations(latest);
    setIsLoading(false);
  }, LIST_POLL_INTERVAL_MS);

  const selected = conversations.find((conversation) => conversation.customerId === selectedId);

  return (
    <div className="flex h-[70vh] min-h-[420px] bg-white rounded-2xl shadow-md overflow-hidden">
      <div
        className={`${selectedId !== null ? "hidden md:flex" : "flex"} w-full md:w-80 flex-shrink-0 flex-col overflow-y-auto border-r`}
      >
        {conversations.length === 0 ? (
          <p className="p-4 text-sm text-gray-500">
            {isLoading ? "Loading conversations..." : "No customer messages yet."}
          </p>
        ) : (
          conversations.map((conversation) => (
            <button
              key={conversation.customerId}
              onClick={() => setSelectedId(conversation.customerId)}
              className={`w-full text-left px-4 py-3 border-b hover:bg-gray-50 ${
                conversation.customerId === selectedId ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-sm text-gray-900 truncate">{conversation.fullName}</span>
                <span className="text-[11px] text-gray-500 flex-shrink-0">
                  {formatListTime(conversation.lastCreatedAt)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 mt-1">
                <span className="text-xs text-gray-600 truncate">{conversation.lastBody}</span>
                {conversation.unreadCount > 0 && (
                  <span className="flex-shrink-0 min-w-[20px] h-5 px-1.5 rounded-full bg-emerald-500 text-white text-[11px] flex items-center justify-center">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </button>
          ))
        )}
      </div>

      <div className={`${selectedId === null ? "hidden md:flex" : "flex"} flex-1 min-w-0 flex-col`}>
        {selectedId === null ? (
          <div className="flex-1 flex items-center justify-center text-sm text-gray-500">
            Select a customer to view messages
          </div>
        ) : (
          <AdminConversationThread
            key={selectedId}
            adminId={adminId}
            customerId={selectedId}
            customerName={selected?.fullName ?? "Customer"}
            customerEmail={selected?.email ?? ""}
            onBack={() => setSelectedId(null)}
          />
        )}
      </div>
    </div>
  );
};
