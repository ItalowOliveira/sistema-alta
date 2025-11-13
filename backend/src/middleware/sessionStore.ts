import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

type Session = { id: string; user: any };

// Very small in-memory session store for development/demo only
const sessions = new Map<string, Session>();

export const createSession = (user: any) => {
  const id = crypto.randomBytes(16).toString('hex');
  const session: Session = { id, user };
  sessions.set(id, session);
  return id;
};

export const getSession = (id?: string) => {
  if (!id) return null;
  const s = sessions.get(id);
  return s || null;
};

export const destroySession = (id?: string) => {
  if (!id) return;
  sessions.delete(id);
};

// middleware to parse a cookie named 'sid' and attach sessionUser to req
export const sessionMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const cookieHeader = req.headers.cookie as string | undefined;
  let sid: string | undefined;
  if (cookieHeader) {
    const match = cookieHeader.split(';').map(s => s.trim()).find(s => s.startsWith('sid='));
    if (match) sid = match.split('=')[1];
  }
  const session = getSession(sid);
  if (session) {
    (req as any).sessionUser = session.user;
    (req as any).sessionId = session.id;
  }
  next();
};
