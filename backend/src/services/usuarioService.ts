import { createUsuarioRepository } from '../repositories/usuarioRepository';
import { getAllUsuariosRepository } from '../repositories/usuarioRepository';
import { loginUsuarioRepository } from '../repositories/usuarioRepository';

export const createUsuarioService = async (data: any) => {
  return await createUsuarioRepository(data);
};

export const getAllUsuariosService = async (tipo?: string) => {
  return await getAllUsuariosRepository(tipo);
};

export const loginUsuarioService = async (email: string, senha: string) => {
  return await loginUsuarioRepository(email, senha);
};
