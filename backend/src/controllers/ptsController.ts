import { Request, Response } from 'express';
import { createPtsService, getPtsByIdService } from '../services/ptsService';

export const createPts = async (req: Request, res: Response) => {
  try {
    const pts = await createPtsService(req.body);
    res.status(201).json(pts);
  } catch (error: any) {
    console.error('createPts error:', error);
    if (error.message && (error.message.includes('Invalid') || error.message.includes('invalid'))) {
      return res.status(400).json({ error: error.message });
    }
    if (error.message && error.message.toLowerCase().includes('violates foreign key')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

export const getPtsById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id || Number.isNaN(id) || id <= 0) {
      return res.status(400).json({ error: 'Invalid id parameter' });
    }

    const pts = await getPtsByIdService(id);
    if (!pts) return res.status(404).json({ error: 'PTS not found' });
    res.status(200).json(pts);
  } catch (error: any) {
    console.error('getPtsById error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};