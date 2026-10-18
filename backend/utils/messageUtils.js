export const MAX_MESSAGE_LENGTH = 2000;

export function normalizeMessageBody(rawBody) {
  if (typeof rawBody !== 'string') {
    return { error: 'Message body is required' };
  }

  const body = rawBody.trim();

  if (!body) {
    return { error: 'Message cannot be empty' };
  }

  if (body.length > MAX_MESSAGE_LENGTH) {
    return { error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer` };
  }

  return { body };
}

export const READ_RECEIPTS_GLOBAL_KEY = 'readReceipts:global';

const readReceiptsCustomerKey = (customerId) => `readReceipts:customer:${customerId}`;

export async function getReadReceiptState(db, customerId) {
  const override = await db.getMessageSetting(readReceiptsCustomerKey(customerId));
  const globalValue = await db.getMessageSetting(READ_RECEIPTS_GLOBAL_KEY);

  if (override !== null) {
    return { enabled: override === 'on', override };
  }

  return { enabled: globalValue !== 'off', override: 'inherit' };
}

export function hideSeenStatusFromCustomer(messages) {
  return messages.map((message) =>
    message.senderRole === 'user' ? { ...message, seenAt: null } : message
  );
}

export async function setReadReceiptsCustomerOverride(db, customerId, override) {
  const value = override === 'inherit' ? null : override;
  await db.setMessageSetting(readReceiptsCustomerKey(customerId), value);
}

export async function setReadReceiptsGlobal(db, enabled) {
  await db.setMessageSetting(READ_RECEIPTS_GLOBAL_KEY, enabled ? 'on' : 'off');
}

export async function getReadReceiptsGlobal(db) {
  const value = await db.getMessageSetting(READ_RECEIPTS_GLOBAL_KEY);
  return value !== 'off';
}
