import { pool } from '../db';

export const createAltaRepository = async (data: any) => {
    // aceita tanto medico_responsavel_id quanto medico_responsavel (compatibilidade)
    const { paciente_id, data_alta, medico_responsavel_id, medico_responsavel, observacoes } = data;
    const medicoId = medico_responsavel_id ?? medico_responsavel ?? null;

    const result = await pool.query(
        'INSERT INTO altas (paciente_id, data_alta, medico_responsavel_id, observacoes) VALUES ($1, $2, $3, $4) RETURNING *',
        [paciente_id, data_alta, medicoId, observacoes]
    );

    return result.rows[0];
};

export const getAllAltasRepository = async () => {
    // Retorna todas as altas da tabela única (sem joins)
    const result = await pool.query('SELECT * FROM altas');
    return result.rows;
};
