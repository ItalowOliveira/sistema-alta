import { Request, Response, NextFunction } from 'express';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).sessionUser;
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// allow list of roles e.g. ['Admin', 'Médico']
export const requireRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).sessionUser;
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    const role = (user as any).tipo_usuario;
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};
