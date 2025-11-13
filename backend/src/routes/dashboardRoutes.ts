import { Router } from 'express';
import { getPacientesQuantity, getDashboardMetrics } from '../controllers/dashboardController';

const router = Router();

router.get('/', getPacientesQuantity);
router.get('/metrics', getDashboardMetrics);

export default router;