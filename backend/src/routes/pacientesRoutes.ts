import { Router } from "express";
import { createPaciente } from "../controllers/pacientesController";
import { getAllPacientes } from "../controllers/pacientesController";
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

router.post("/", requireAuth, createPaciente);
router.get("/", requireAuth, getAllPacientes);

export default router;

