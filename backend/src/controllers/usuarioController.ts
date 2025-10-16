import { Request, Response } from 'express';
import { createUsuarioService } from '../services/usuarioService';
import { getAllUsuariosService } from '../services/usuarioService';
import { loginUsuarioService } from '../services/usuarioService';

export const createUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await createUsuarioService(req.body);
    res.status(201).json(usuario);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await getAllUsuariosService();
    res.status(200).json(usuarios);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export const loginUsuario = async (req: Request, res: Response) => {
  const { email, senha } = req.body;
  try {
    const usuario = await loginUsuarioService(email, senha);
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};