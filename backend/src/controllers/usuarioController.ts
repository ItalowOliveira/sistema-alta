import { Request, Response } from 'express';
import { createUsuarioService } from '../services/usuarioService';
import { getAllUsuariosService } from '../services/usuarioService';
import { loginUsuarioService } from '../services/usuarioService';
import { createSession, destroySession } from '../middleware/sessionStore';

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
    const tipo = req.query.tipo_usuario as string | undefined;
    const usuarios = await getAllUsuariosService(tipo);
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
      // create a session id and set as HttpOnly cookie
      const sid = createSession(usuario);
      res.cookie('sid', sid, { httpOnly: true, sameSite: 'lax' });
      console.log('Usuário logado tipo:', (usuario as any).tipo_usuario);
      res.status(200).json(usuario);
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const logoutUsuario = async (req: Request, res: Response) => {
  try {
    const sid = (req as any).sessionId;
    if (sid) destroySession(sid);
    res.clearCookie('sid');
    return res.status(200).json({ ok: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const meUsuario = async (req: Request, res: Response) => {
  const user = (req as any).sessionUser;
  if (!user) return res.status(401).json({ error: 'No session' });
  return res.status(200).json(user);
};