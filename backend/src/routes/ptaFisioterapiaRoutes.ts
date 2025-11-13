import { Router } from 'express';
import { createPtaFisioterapia, getPtaFisioterapiaById } from '../controllers/ptaFisioterapiaController';

const router = Router();

router.post('/', createPtaFisioterapia);
router.get('/:id', getPtaFisioterapiaById);

export default router;
