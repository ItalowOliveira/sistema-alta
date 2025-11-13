import { pool } from '../db';

export const createUsuarioRepository = async (data: any) => {
  const { nome, email, senha, tipo_usuario, data_criacao } = data;
  const result = await pool.query(
    'INSERT INTO usuarios (nome, email, senha, tipo_usuario, data_criacao) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [nome, email, senha, tipo_usuario, data_criacao]
  );
  return result.rows[0];
};

export const getAllUsuariosRepository = async (tipo?: string) => {
  if (tipo) {
    const result = await pool.query('SELECT * FROM usuarios WHERE tipo_usuario = $1', [tipo]);
    return result.rows;
  }
  const result = await pool.query('SELECT * FROM usuarios');
  return result.rows;
}

export const getUsuarioByEmailRepository = async (email: string) => {
  const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  return result.rows[0];
};