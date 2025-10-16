import { pool } from '../db';

export const createUsuarioRepository = async (data: any) => {
  const { nome, email, senha, tipo_usuario, data_criacao } = data;
  const result = await pool.query(
    'INSERT INTO usuarios (nome, email, senha, tipo_usuario, data_criacao) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [nome, email, senha, tipo_usuario, data_criacao]
  );
  return result.rows[0];
};
