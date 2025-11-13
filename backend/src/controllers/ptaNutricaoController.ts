import { Request, Response } from 'express';
import { createPtaNutricaoService, getPtaNutricaoByIdService } from '../services/ptaNutricaoService';

export const createPtaNutricao = async (req: Request, res: Response) => {
  try {
    const pta = await createPtaNutricaoService(req.body);
    res.status(201).json(pta);
  } catch (error: any) {
    console.error('createPtaNutricao error:', error);
    if (error.message && (error.message.includes('Invalid') || error.message.includes('invalid'))) {
      return res.status(400).json({ error: error.message });
    }
    if (error.message && error.message.toLowerCase().includes('violates foreign key')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

export const getPtaNutricaoById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id || Number.isNaN(id) || id <= 0) {
      return res.status(400).json({ error: 'Invalid id parameter' });
    }

    const pta = await getPtaNutricaoByIdService(id);
    if (!pta) return res.status(404).json({ error: 'PTA Nutricao not found' });
    res.status(200).json(pta);
  } catch (error: any) {
    console.error('getPtaNutricaoById error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};
