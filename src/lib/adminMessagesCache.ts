import {
  ChatMessage,
  MessageConversation,
  ReadReceiptState,
  getAdminThread,
  getMessageConversations,
} from "@/lib/api";

export const conversationsCache = new Map<number, MessageConversation[]>();

export const threadCache = new Map<string, { messages: ChatMessage[]; readReceipts: ReadReceiptState }>();

export const threadKey = (adminId: number, customerId: number) => `${adminId}:${customerId}`;

export const prefetchAdminConversations = (adminId: number) => {
  getMessageConversations(adminId)
    .then(({ conversations }) => conversationsCache.set(adminId, conversations))
    .catch(() => undefined);
};

export const prefetchAdminThread = (adminId: number, customerId: number) => {
  const key = threadKey(adminId, customerId);
  if (threadCache.has(key)) return;

  getAdminThread(adminId, customerId)
    .then(({ messages, readReceipts }) => {
      if (!threadCache.has(key)) threadCache.set(key, { messages, readReceipts });
    })
    .catch(() => undefined);
};
