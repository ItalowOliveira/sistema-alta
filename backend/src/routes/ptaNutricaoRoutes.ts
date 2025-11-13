import { Router } from 'express';
import { createPtaNutricao, getPtaNutricaoById } from '../controllers/ptaNutricaoController';

const router = Router();

router.post('/', createPtaNutricao);
router.get('/:id', getPtaNutricaoById);

export default router;
