import { Router } from "express";
import { createAlta, getAllAlta, finalizeAlta } from "../controllers/altasController";
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

router.post("/", requireAuth, createAlta);
router.get("/", requireAuth, getAllAlta);
router.post("/:id/finalizar", requireAuth, finalizeAlta);

export default router;

