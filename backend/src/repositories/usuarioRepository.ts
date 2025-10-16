import { pool } from '../db';

export const createUsuarioRepository = async (data: any) => {
  const { nome, email, senha, tipo_usuario, data_criacao } = data;
  const result = await pool.query(
    'INSERT INTO usuarios (nome, email, senha, tipo_usuario, data_criacao) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [nome, email, senha, tipo_usuario, data_criacao]
  );
  return result.rows[0];
};

export const getAllUsuariosRepository = async () => {
  const result = await pool.query('SELECT * FROM usuarios');
  return result.rows;
}

export const loginUsuarioRepository = async (email: string, senha: string) => {
  const result = await pool.query(
    'SELECT * FROM usuarios WHERE email = $1 AND senha = $2',
    [email, senha]
  );
  return result.rows[0];
};