import { Router } from 'express';
import { createUsuario} from '../controllers/usuarioController';
import { getAllUsuarios } from '../controllers/usuarioController';
import { loginUsuario } from '../controllers/usuarioController';
import { logoutUsuario, meUsuario } from '../controllers/usuarioController';
import { requireAuth, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.post('/', createUsuario);
router.get('/', requireAuth, requireRole(['Admin','Médico']), getAllUsuarios);
router.post('/login', loginUsuario);
router.post('/logout', logoutUsuario);
router.get('/me', meUsuario);

export default router;