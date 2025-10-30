import { Router } from "express";
import { createAlta } from "../controllers/altasController";
import { getAllAlta } from "../controllers/altasController";

const router = Router();

router.post("/", createAlta);
router.get("/", getAllAlta);

export default router;

