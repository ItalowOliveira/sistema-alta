import { Router } from 'express';
import { createUsuario} from '../controllers/usuarioController';
import { getAllUsuarios } from '../controllers/usuarioController';
import { loginUsuario } from '../controllers/usuarioController';

const router = Router();

router.post('/', createUsuario);
router.get('/', getAllUsuarios);
router.post('/login', loginUsuario);

export default router;