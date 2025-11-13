import { createUsuarioRepository } from '../repositories/usuarioRepository';
import { getAllUsuariosRepository } from '../repositories/usuarioRepository';
import { getUsuarioByEmailRepository } from '../repositories/usuarioRepository';
import bcrypt from 'bcrypt';

export const createUsuarioService = async (data: any) => {
  const saltRounds = 10;
  const hashed = await bcrypt.hash(data.senha, saltRounds);
  const payload = { ...data, senha: hashed };
  return await createUsuarioRepository(payload);
};

export const getAllUsuariosService = async (tipo?: string) => {
  return await getAllUsuariosRepository(tipo);
};

export const loginUsuarioService = async (email: string, senha: string) => {
  const user = await getUsuarioByEmailRepository(email);
  if (!user) return null;
  const match = await bcrypt.compare(senha, user.senha);
  if (!match) return null;
  const { senha: _, ...rest } = user;
  return rest;
};
