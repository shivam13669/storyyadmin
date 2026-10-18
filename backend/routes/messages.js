import express from 'express';
import { getDB } from '../db/index.js';
import {
  getReadReceiptState,
  hideSeenStatusFromCustomer,
  normalizeMessageBody,
} from '../utils/messageUtils.js';

const router = express.Router();

const THREAD_LIMIT = 500;

async function requireUser(req, res, next) {
  try {
    const userId = parseInt(req.headers.userid, 10);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized - User ID required' });
    }

    const user = await getDB().getUserById(userId);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Messages auth error:', error);
    res.status(500).json({ error: error.message });
  }
}

router.use(requireUser);

/**
 * GET /api/messages
 * Get the logged-in customer's conversation with the admin
 */
router.get('/', async (req, res) => {
  try {
    const db = getDB();
    const messages = await db.getMessagesByCustomerId(req.user.id, THREAD_LIMIT);
    const { enabled } = await getReadReceiptState(db, req.user.id);

    res.json({ messages: enabled ? messages : hideSeenStatusFromCustomer(messages) });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/messages
 * Send a message from the customer to the admin
 */
router.post('/', async (req, res) => {
  try {
    const { body, error } = normalizeMessageBody(req.body?.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const message = await getDB().createMessage({
      customerId: req.user.id,
      senderRole: 'user',
      senderId: req.user.id,
      body,
    });

    res.status(201).json({ message });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/messages/presence
 * Heartbeat from an open dashboard; marks admin messages as delivered
 */
router.post('/presence', async (req, res) => {
  try {
    await getDB().markMessagesDelivered(req.user.id, 'admin');
    res.json({ ok: true });
  } catch (error) {
    console.error('Message presence error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/messages/seen
 * Marks admin messages in the customer's thread as seen
 */
router.post('/seen', async (req, res) => {
  try {
    await getDB().markMessagesSeen(req.user.id, 'admin');
    res.json({ ok: true });
  } catch (error) {
    console.error('Mark messages seen error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
