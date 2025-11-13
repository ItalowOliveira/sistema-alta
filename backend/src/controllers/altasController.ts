import { Request, Response } from 'express';
import { createAltaService } from '../services/altasService';
import { getAllAltaService } from '../services/altasService';
import { finalizeAltaService } from '../services/altasService';

export const createAlta = async (req: Request, res: Response) => {
  try {
    const alta = await createAltaService(req.body);
    res.status(201).json(alta);
  } catch (error: any) {
  console.error('createAlta error:', error);
    // validation errors
    if (error.message && (error.message.includes('Invalid paciente id') || error.message.includes('Invalid medico_responsavel id'))) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
}

export const getAllAlta = async (req: Request, res: Response) => {
  try {
  const sessionUser = (req as any).sessionUser;
  const userId = sessionUser ? Number(sessionUser.id) : undefined;
  const pageRaw = req.query.page as string | undefined;
  const pageSizeRaw = req.query.pageSize as string | undefined;
  const qRaw = req.query.q as string | undefined;
  const page = pageRaw ? Number(pageRaw) : undefined;
  const pageSize = pageSizeRaw ? Number(pageSizeRaw) : undefined;
  const result = await getAllAltaService(userId, page, pageSize, qRaw);
  res.status(200).json(result);
  } catch (error: any) {
  console.error('getAllAlta error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const finalizeAlta = async (req: Request, res: Response) => {
  try {
    const idRaw = req.params.id;
    const altaId = Number(idRaw);
    if (!altaId) return res.status(400).json({ error: 'Invalid alta id' });
    const { data_alta } = req.body ?? {};
    const result = await finalizeAltaService(altaId, data_alta ?? null);
    res.status(200).json(result);
  } catch (error: any) {
    console.error('finalizeAlta error:', error);
    res.status(500).json({ error: error.message });
  }
};
