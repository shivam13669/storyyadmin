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
