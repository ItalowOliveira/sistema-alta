import { Router } from 'express';
import { createPtaEnfermagem, getPtaEnfermagemById} from '../controllers/ptaEnfermagemController';

const router = Router();

router.post('/', createPtaEnfermagem);
router.get('/:id', getPtaEnfermagemById);

export default router;
