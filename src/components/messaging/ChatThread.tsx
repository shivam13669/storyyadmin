import { useEffect, useRef, useState } from "react";
import { Check, CheckCheck, Send } from "lucide-react";
import { format, isToday } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { ChatMessage } from "@/lib/api";

interface ChatThreadProps {
  messages: ChatMessage[];
  currentRole: "user" | "admin";
  onSend: (body: string) => Promise<void>;
  isLoading: boolean;
  emptyText: string;
}

const formatMessageTime = (iso: string) => {
  const date = new Date(iso);
  return isToday(date) ? format(date, "HH:mm") : format(date, "dd MMM, HH:mm");
};

const MessageStatusTicks = ({ message }: { message: ChatMessage }) => {
  if (message.seenAt) {
    return <CheckCheck aria-label="Seen" className="w-4 h-4 text-[#34b7f1]" />;
  }

  if (message.deliveredAt) {
    return <CheckCheck aria-label="Delivered" className="w-4 h-4 text-gray-400" />;
  }

  return <Check aria-label="Sent" className="w-4 h-4 text-gray-400" />;
};

export const ChatThread = ({ messages, currentRole, onSend, isLoading, emptyText }: ChatThreadProps) => {
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages.length]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const body = draft.trim();
    if (!body || isSending) return;

    setIsSending(true);
    try {
      await onSend(body);
      setDraft("");
    } catch (error) {
      toast({
        title: "Message not sent",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-gray-50">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-gray-500 text-center">
            {isLoading ? "Loading messages..." : emptyText}
          </div>
        ) : (
          messages.map((message) => {
            const isOwn = message.senderRole === currentRole;
            return (
              <div key={message.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] sm:max-w-[65%] rounded-2xl px-3 py-2 shadow-sm ${
                    isOwn ? "bg-emerald-100 rounded-br-sm" : "bg-white rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm text-gray-900 whitespace-pre-wrap break-words">{message.body}</p>
                  <div className="flex items-center justify-end gap-1 mt-1 text-[11px] text-gray-500">
                    <span>{formatMessageTime(message.createdAt)}</span>
                    {isOwn && <MessageStatusTicks message={message} />}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t bg-white">
        <Input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Type a message"
          maxLength={2000}
          className="flex-1"
        />
        <Button type="submit" size="icon" disabled={!draft.trim() || isSending} aria-label="Send message">
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};
