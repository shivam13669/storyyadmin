import { useEffect, useState } from "react";
import { format, isToday } from "date-fns";
import { ArrowLeft, Settings } from "lucide-react";
import { ChatThread } from "@/components/messaging/ChatThread";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { usePolling } from "@/hooks/usePolling";
import { useToast } from "@/hooks/use-toast";
import {
  ChatMessage,
  MessageConversation,
  ReadReceiptOverride,
  ReadReceiptState,
  getAdminThread,
  getMessageConversations,
  getMessageSettings,
  markAdminThreadSeen,
  sendAdminReply,
  updateCustomerReadReceipts,
  updateMessageSettings,
} from "@/lib/api";
import { conversationsCache, prefetchAdminThread, threadCache, threadKey } from "@/lib/adminMessagesCache";

const LIST_POLL_INTERVAL_MS = 3000;
const THREAD_POLL_INTERVAL_MS = 2000;

const formatListTime = (iso: string) => {
  const date = new Date(iso);
  return isToday(date) ? format(date, "HH:mm") : format(date, "dd MMM");
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "?";

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
  const cacheKey = threadKey(adminId, customerId);
  const cached = threadCache.get(cacheKey);
  const [messages, setMessages] = useState<ChatMessage[]>(cached?.messages ?? []);
  const [isLoading, setIsLoading] = useState(!cached);
  const [receipts, setReceipts] = useState<ReadReceiptState | null>(cached?.readReceipts ?? null);
  const { toast } = useToast();

  useEffect(() => {
    if (receipts) {
      threadCache.set(cacheKey, { messages, readReceipts: receipts });
    }
  }, [cacheKey, messages, receipts]);

  usePolling(async () => {
    const { messages: latest, readReceipts } = await getAdminThread(adminId, customerId);
    setMessages(latest);
    setReceipts(readReceipts);
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

  const handleReceiptChange = async (override: ReadReceiptOverride) => {
    try {
      const { readReceipts } = await updateCustomerReadReceipts(adminId, customerId, override);
      setReceipts(readReceipts);
    } catch (error) {
      toast({
        title: "Could not update read receipts",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="flex items-center gap-3 px-4 py-3 border-b bg-[#f0f2f5]">
        <button onClick={onBack} className="md:hidden p-1 text-gray-600" aria-label="Back to conversations">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-semibold flex items-center justify-center flex-shrink-0">
          {getInitials(customerName)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-gray-900 truncate">{customerName}</p>
          <p className="text-xs text-gray-500 truncate">{customerEmail}</p>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <Select
            value={receipts?.override ?? "inherit"}
            onValueChange={(value) => handleReceiptChange(value as ReadReceiptOverride)}
            disabled={!receipts}
          >
            <SelectTrigger aria-label="Read receipts for this customer" className="h-8 w-44 text-xs bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inherit">Read receipts: Default</SelectItem>
              <SelectItem value="on">Read receipts: On</SelectItem>
              <SelectItem value="off">Read receipts: Off</SelectItem>
            </SelectContent>
          </Select>
          {receipts && !receipts.enabled && (
            <span className="text-[11px] text-amber-700">Blue ticks hidden from this customer</span>
          )}
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
  const [conversations, setConversations] = useState<MessageConversation[]>(
    () => conversationsCache.get(adminId) ?? []
  );
  const [isLoading, setIsLoading] = useState(() => !conversationsCache.has(adminId));
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [globalReadReceipts, setGlobalReadReceipts] = useState<boolean | null>(null);
  const [isSavingGlobal, setIsSavingGlobal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    getMessageSettings(adminId)
      .then(({ readReceiptsEnabled }) => setGlobalReadReceipts(readReceiptsEnabled))
      .catch(() => setGlobalReadReceipts(true));
  }, [adminId]);

  usePolling(async () => {
    const { conversations: latest } = await getMessageConversations(adminId);
    conversationsCache.set(adminId, latest);
    setConversations(latest);
    setIsLoading(false);
  }, LIST_POLL_INTERVAL_MS);

  const handleGlobalToggle = async (enabled: boolean) => {
    const previous = globalReadReceipts;
    setGlobalReadReceipts(enabled);
    setIsSavingGlobal(true);

    try {
      const { readReceiptsEnabled } = await updateMessageSettings(adminId, enabled);
      setGlobalReadReceipts(readReceiptsEnabled);
    } catch (error) {
      setGlobalReadReceipts(previous);
      toast({
        title: "Could not update message settings",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSavingGlobal(false);
    }
  };

  const selected = conversations.find((conversation) => conversation.customerId === selectedId);

  return (
    <div className="flex h-[70vh] min-h-[420px] bg-white rounded-2xl shadow-md overflow-hidden">
      <div
        className={`${selectedId !== null ? "hidden md:flex" : "flex"} w-full md:w-80 flex-shrink-0 flex-col border-r`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b bg-[#f0f2f5]">
          <h3 className="font-semibold text-gray-900">Chats</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSettingsOpen(true)}
            aria-label="Message settings"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">
              {isLoading ? "Loading conversations..." : "No customer messages yet."}
            </p>
          ) : (
            conversations.map((conversation) => (
              <button
                key={conversation.customerId}
                onPointerDown={() => prefetchAdminThread(adminId, conversation.customerId)}
                onClick={() => setSelectedId(conversation.customerId)}
                className={`w-full flex items-center gap-3 text-left px-4 py-3 border-b hover:bg-gray-50 ${
                  conversation.customerId === selectedId ? "bg-emerald-50" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">
                  {getInitials(conversation.fullName)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-sm text-gray-900 truncate">{conversation.fullName}</span>
                    <span className="text-[11px] text-gray-500 flex-shrink-0">
                      {formatListTime(conversation.lastCreatedAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-0.5">
                    <span className="text-xs text-gray-600 truncate">{conversation.lastBody}</span>
                    {conversation.unreadCount > 0 && (
                      <span className="flex-shrink-0 min-w-[20px] h-5 px-1.5 rounded-full bg-emerald-500 text-white text-[11px] flex items-center justify-center">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      <div className={`${selectedId === null ? "hidden md:flex" : "flex"} flex-1 min-w-0 flex-col`}>
        {selectedId === null ? (
          <div className="flex-1 flex items-center justify-center bg-[#f0f2f5] text-sm text-gray-500">
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

      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message settings</DialogTitle>
            <DialogDescription>Control what customers see about their messages.</DialogDescription>
          </DialogHeader>

          <div className="flex items-start justify-between gap-4 rounded-lg border p-4">
            <div className="min-w-0">
              <label htmlFor="global-read-receipts" className="font-medium text-sm text-gray-900">
                Read receipts (blue ticks)
              </label>
              <p className="text-xs text-gray-500 mt-1">
                When off, customers do not see blue ticks on their messages. Customers with their own
                setting in a chat ignore this.
              </p>
            </div>
            <Switch
              id="global-read-receipts"
              checked={globalReadReceipts ?? true}
              disabled={globalReadReceipts === null || isSavingGlobal}
              onCheckedChange={handleGlobalToggle}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
