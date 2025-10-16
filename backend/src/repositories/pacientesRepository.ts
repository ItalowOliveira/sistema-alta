import { pool } from '../db'; 

export const createPacienteRepository = async (data: any) => {
    const { nome_paciente, idade, portador_de, endereco, numero, cidade, setor, leito, data_internacao, data_alta, medico_responsavel } = data;
    const result = await pool.query(
        'INSERT INTO pacientes (nome_paciente, idade, portador_de, endereco, numero, cidade, setor, leito, data_internacao, data_alta, medico_responsavel) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
        [nome_paciente, idade, portador_de, endereco, numero, cidade, setor, leito, data_internacao, data_alta, medico_responsavel]
    );
    return result.rows[0];
};

export const getAllPacientesRepository = async () => {
    const result = await pool.query('SELECT * FROM pacientes');
    return result.rows;
}
