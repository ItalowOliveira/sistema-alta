import { Router } from 'express';
import { createPts, getPtsById } from '../controllers/ptsController';

const router = Router();

router.post('/', createPts);
router.get('/:id', getPtsById);

export default router;