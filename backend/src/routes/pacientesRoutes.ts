import { Router } from "express";
import { createPaciente } from "../controllers/pacientesController";
import { getAllPacientes } from "../controllers/pacientesController";

const router = Router();

router.post("/", createPaciente);
router.get("/", getAllPacientes);

export default router;

