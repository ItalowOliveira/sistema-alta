import { Request, Response } from 'express';
import { createAltaService } from '../services/altasService';
import { getAllAltaService } from '../services/altasService';

export const createAlta = async (req: Request, res: Response) => {
  try {
    const alta = await createAltaService(req.body);
    res.status(201).json(alta);
  } catch (error: any) {
  console.error('createAlta error:', error);
    res.status(500).json({ error: error.message });
  }
}

export const getAllAlta = async (req: Request, res: Response) => {
  try {
    const altas = await getAllAltaService();
    res.status(200).json(altas);
  } catch (error: any) {
  console.error('getAllAlta error:', error);
    res.status(500).json({ error: error.message });
  }
};
