import { Router } from 'express';
import { createPtaServicoSocial } from '../controllers/ptaServicoSocialController';
import { getPtaServicoSocialById } from '../controllers/ptaServicoSocialController';

const router = Router();

router.post('/', createPtaServicoSocial);
router.get('/:id', getPtaServicoSocialById);

export default router;
