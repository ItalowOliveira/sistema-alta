import { Router } from 'express';
import { createPtaPsicologia, getPtaPsicologiaById } from '../controllers/ptaPsicologiaController';

const router = Router();

router.post('/', createPtaPsicologia);
router.get('/:id', getPtaPsicologiaById);

export default router;
