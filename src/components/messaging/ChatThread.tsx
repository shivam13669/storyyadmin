import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, CheckCheck, Send } from "lucide-react";
import { format, isSameDay, isToday, isYesterday } from "date-fns";
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

const STICK_TO_BOTTOM_PX = 120;

const formatMessageTime = (iso: string) => format(new Date(iso), "HH:mm");

const formatDayLabel = (date: Date) => {
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "dd MMM yyyy");
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
  const stickToBottomRef = useRef(true);
  const { toast } = useToast();

  useEffect(() => {
    const element = scrollRef.current;
    if (element && stickToBottomRef.current) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  const handleScroll = () => {
    const element = scrollRef.current;
    if (!element) return;

    stickToBottomRef.current =
      element.scrollHeight - element.scrollTop - element.clientHeight < STICK_TO_BOTTOM_PX;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const body = draft.trim();
    if (!body || isSending) return;

    stickToBottomRef.current = true;
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

  const renderItems = (): ReactNode[] =>
    messages.flatMap((message, index) => {
      const date = new Date(message.createdAt);
      const previous = messages[index - 1];
      const items: ReactNode[] = [];

      if (!previous || !isSameDay(new Date(previous.createdAt), date)) {
        items.push(
          <div key={`day-${message.id}`} className="flex justify-center my-3">
            <span className="px-3 py-1 rounded-md bg-white/90 text-[11px] font-medium text-gray-600 shadow-sm">
              {formatDayLabel(date)}
            </span>
          </div>
        );
      }

      const isOwn = message.senderRole === currentRole;
      items.push(
        <div key={message.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
          <div
            className={`max-w-[85%] sm:max-w-[70%] rounded-lg px-2.5 pt-1.5 pb-1 shadow-sm ${
              isOwn ? "bg-[#d9fdd3]" : "bg-white"
            }`}
          >
            <p className="text-sm text-gray-900 whitespace-pre-wrap break-words leading-relaxed">{message.body}</p>
            <div className="flex items-center justify-end gap-1 mt-0.5 text-[11px] text-gray-500">
              <span>{formatMessageTime(message.createdAt)}</span>
              {isOwn && <MessageStatusTicks message={message} />}
            </div>
          </div>
        </div>
      );

      return items;
    });

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#efeae2]">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 space-y-1.5"
      >
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            {!isLoading && (
              <p className="max-w-xs text-center text-sm text-gray-600 bg-white/80 rounded-lg px-4 py-3 shadow-sm">
                {emptyText}
              </p>
            )}
          </div>
        ) : (
          renderItems()
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 py-2.5 bg-[#f0f2f5] border-t">
        <Input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Type a message"
          maxLength={2000}
          autoComplete="off"
          className="flex-1 bg-white rounded-full px-4"
        />
        <Button
          type="submit"
          size="icon"
          className="rounded-full flex-shrink-0"
          disabled={!draft.trim() || isSending}
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};
