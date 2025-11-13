import { create } from "domain";
import { createUsuario } from "../controllers/usuarioController";

export const ROLES = {
  ADMIN: 'admin',
  MEDICO: 'medico',
};


export const PERMISSIONS = {

    createUsuario: [ROLES.ADMIN],
};


